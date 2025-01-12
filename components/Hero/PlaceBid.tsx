import { BigNumber, utils } from "ethers";
import Image from "next/image";
import { useState } from "react";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useAccount,
  Address,
} from "wagmi";
import { AuctionABI } from "@buildersdk/sdk";
import { useDebounce } from "@/hooks/useDebounce";
import Button from "../Button";
import clsx from "clsx";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { track } from "@vercel/analytics";
import ExternalLink from "../ExternalLink";

export const PlaceBid = ({
  highestBid,
  auction,
  tokenId,
  hidden,
  onNewBid,
}: {
  highestBid?: string;
  auction?: string;
  tokenId?: string;
  hidden: boolean;
  onNewBid: () => Promise<void>;
}) => {
  const { isConnected } = useAccount();
  const [bid, setBid] = useState("");
  const debouncedBid = useDebounce(bid, 500);

  const { openConnectModal } = useConnectModal();

  const highestBidBN = BigNumber.from(highestBid);
  const amountIncrease = highestBidBN.div("10");
  const nextBidAmount = highestBidBN.add(amountIncrease);

  // Add validation state
  const [validationError, setValidationError] = useState<string>("");

  const validateBid = (bidValue: string): string => {
    if (!bidValue) return "";
    
    try {
      const bidAmount = parseFloat(bidValue);
      const minBidAmount = parseFloat(utils.formatEther(nextBidAmount));
      const currentBidAmount = parseFloat(utils.formatEther(highestBid || "0"));

      if (isNaN(bidAmount) || bidAmount <= 0) {
        return "Please enter a valid amount";
      }

      // Must be higher than current bid
      if (bidAmount <= currentBidAmount) {
        return `Bid must be higher than current bid (${currentBidAmount} ETH)`;
      }

      // Must meet minimum increment
      if (bidAmount < minBidAmount) {
        return `Minimum bid increment is ${utils.formatEther(amountIncrease)} ETH`;
      }

      return "";
    } catch (err) {
      console.error("Validation error:", err);
      return "Invalid bid amount";
    }
  };

  // Update bid handler
  const handleBidChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newBid = e.target.value;
    setBid(newBid);
    setValidationError(validateBid(newBid));
  };

  const { config, error: prepareError } = usePrepareContractWrite({
    address: auction as Address,
    abi: AuctionABI,
    functionName: "createBid",
    args: [BigNumber.from(tokenId || "0")],
    overrides: {
      value: debouncedBid ? utils.parseEther(debouncedBid) : undefined,
    },
    enabled: Boolean(
      auction && 
      debouncedBid &&
      !validateBid(debouncedBid) // Only enable if validation passes
    ),
  });

  const { write, data, error: writeError } = useContractWrite(config);
  const { isLoading } = useWaitForTransaction({
    hash: data?.hash,
    onError: () => {
      track("placeBidError");
    },
    onSuccess: () => {
      setBid("");
      track("placeBidSuccess");
      onNewBid();
    },
  });

  const getError = () => {
    // Show validation error first
    if (validationError) return validationError;

    // Handle contract errors
    const error = prepareError || writeError;
    if (error) {
      const reason = (error as any)?.reason;
      const message = (error as any)?.data?.message || '';
      
      console.error("Contract error:", { error, reason, message });

      if (reason?.includes("insufficient funds") || message.includes("insufficient funds")) {
        return "Insufficient funds for bid";
      }

      if (reason?.includes("execution reverted")) {
        if (message.includes("INVALID_BID")) {
          return "Bid must be higher than current bid";
        }
        return "Bid may be too low - bid must be higher than 0.021 ETH";
      }

      return "Error placing bid. Please try again";
    }

    return "";
  };

  const isValidBid = Boolean(
    bid && 
    !validationError && 
    !getError() && 
    !isLoading
  );

  return (
    <div className={clsx("flex flex-col gap-6", hidden && "hidden")}>
      <ExternalLink href="https://bridge.base.org/deposit">
        <div className="flex flex-row gap-2">
          <Image src="/info-circle.svg" width={20} height={20} alt="" />
          <span className="font-bold text-white">Bridge to Base</span>
        </div>
      </ExternalLink>
      <div className={clsx("flex flex-row flex-wrap gap-4 items-start")}>
        <div className="shrink flex flex-col gap-1">
          <input
            value={bid}
            type="number"
            min={utils.formatEther(nextBidAmount)}
            step="0.01"
            onChange={handleBidChange}
            className={clsx(
              "bg-primary h-[59px] rounded-[18px] px-6 py-4 focus:border-accent border-2 outline-none",
              (validationError || getError()) && "border-negative"
            )}
            placeholder={`Ξ ${utils.formatEther(nextBidAmount)} or more`}
          />
          <div className="min-h-[20px]">
            {(validationError || getError()) && (
              <p className="caption text-negative animate-fadeIn">
                {validationError || getError()}
              </p>
            )}
          </div>
        </div>
        <Button
          disabled={!isValidBid && isConnected}
          onClick={(e) => {
            e.preventDefault();
            if (!isValidBid) {
              return; // Prevent submission if bid is invalid
            }
            if (isConnected && write) {
              track("placeBidTriggered");
              write();
            } else {
              openConnectModal?.();
            }
          }}
        >
          {isLoading ? (
            <Image src="/spinner.svg" height={24} width={24} alt="spinner" />
          ) : (
            "Place bid"
          )}
        </Button>
      </div>
    </div>
  );
};
