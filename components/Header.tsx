import Image from "next/image";
import { useDAOAddresses, useTreasuryBalance } from "hooks";
import Link from "next/link";
import { ETHERSCAN_BASEURL } from "constants/urls";
import CustomConnectButton from "./CustomConnectButton";
import { BASED_AND_YELLOW_MULTISIG, TOKEN_CONTRACT } from "constants/addresses";
import Button from "./Button";
import { useBalance } from "wagmi";
import { formatNumber } from "@/utils/formatNumber";
import { BigNumber, ethers } from "ethers";
import { useState } from "react";

export default function Header() {
  const [openMobileModal, setOpenMobileModal] = useState<boolean>(false);
  const { data: addresses } = useDAOAddresses({
    tokenContract: TOKEN_CONTRACT,
  });
  const { data: treasury } = useTreasuryBalance({
    treasuryContract: addresses?.treasury,
  });

  const { data: multisigBalanceData } = useBalance({
    address: BASED_AND_YELLOW_MULTISIG,
  });

  return (
    <div className="flex items-center justify-between w-full px-4 md:px-10 py-2 h-[80px] gap-2">
      <div className="flex gap-4 items-center text-white">
        <Link href="/">
          <Image src="/foggles-white.svg" width={80} height={30} alt="Green" />
        </Link>
        <div className="gap-4 relative hidden md:flex justify-start items-center text-center">
          <Button variant="outline" size="tight" className="text-white">
            <Link
              href={`${ETHERSCAN_BASEURL}/tokenholdings?a=${addresses?.treasury}`}
              rel="noreferer noopener noreferrer"
              target="_blank"
            >
              <h6 className="text-white">
                Ξ{" "}
                {treasury
                  ? formatNumber(ethers.utils.formatEther(treasury), 2)
                  : "0"}
                {(multisigBalanceData?.value ?? BigNumber.from(0)) >
                  BigNumber.from(1000) &&
                  " + " + formatNumber(multisigBalanceData?.formatted, 2)}
              </h6>
            </Link>
          </Button>

          <Link target="_blank" rel="noreferrer" href="https://nouns.build/">
            <h6>DAO</h6>
          </Link>
          <Link
            target="_blank"
            rel="noreferrer"
            href="https://forum.bluntdao.org/"
          >
            <h6>Forum</h6>
          </Link>
          <Link
            target="_blank"
            rel="noreferrer"
            href="https://docs.bluntdao.org/"
          >
            <h6>Docs</h6>
          </Link>
        </div>
      </div>
      <button
        data-collapse-toggle="navbar-default"
        type="button"
        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        aria-controls="navbar-default"
        onClick={() => setOpenMobileModal((prev) => !prev)}
        aria-expanded={openMobileModal ? "true" : "false"}
      >
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 17 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 1h15M1 7h15M1 13h15"
          />
        </svg>
      </button>
      <div
        className={`md:hidden absolute top-[170px] pt-5 pb-8 left-0 right-0 bg-gray-500 bg-opacity-90 shadow-md rounded-t-lg rounded-b-lg transition-all duration-500 z-10 ease-in-out ${openMobileModal ? "block" : "hidden"}`}
      >
        <div className="flex flex-col gap-4 justify-start items-center text-center w-full text-white">
          <Button variant="outline" size="tight" className="text-white">
            <Link
              href={`${ETHERSCAN_BASEURL}/tokenholdings?a=${addresses?.treasury}`}
              rel="noreferer noopener noreferrer"
              target="_blank"
            >
              <h6 className="text-white">
                Ξ{" "}
                {treasury
                  ? formatNumber(ethers.utils.formatEther(treasury), 2)
                  : "0"}
                {(multisigBalanceData?.value ?? BigNumber.from(0)) >
                  BigNumber.from(1000) &&
                  " + " + formatNumber(multisigBalanceData?.formatted, 2)}
              </h6>
            </Link>
          </Button>

          <Link target="_blank" rel="noreferrer" href="https://nouns.build/">
            <h6>DAO</h6>
          </Link>
          <Link
            target="_blank"
            rel="noreferrer"
            href="https://forum.bluntdao.org/"
          >
            <h6>Forum</h6>
          </Link>
          <Link
            target="_blank"
            rel="noreferrer"
            href="https://docs.bluntdao.org/"
          >
            <h6>Docs</h6>
          </Link>
          <CustomConnectButton className="bg-skin-backdrop px-6 h-10 rounded-xl border border-skin-stroke text-skin-base transition ease-in-out hover:scale-110" />
        </div>
      </div>
      <div className="hidden md:block">
        <CustomConnectButton className="bg-skin-backdrop px-6 h-10 rounded-xl border border-skin-stroke text-skin-base transition ease-in-out hover:scale-110" />
      </div>
    </div>
  );
}
