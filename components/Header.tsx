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

export default function Header() {
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
      <div className="flex flex-row gap-4 md:gap-8 justify-start items-center text-white">
        <Link href="/">
          <Image src="/foggles-white.svg" width={80} height={30} alt="Green" />
        </Link>
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

        <Link href="https://nouns.build/" >
          <h6>DAO</h6>
        </Link>
        <Link href="/">
          <h6>Forum</h6>
        </Link>
        <Link href="https://docs.bluntdao.org/">
          <h6>Docs</h6>
        </Link>
      </div>

      <CustomConnectButton className="bg-skin-backdrop px-6 h-10 rounded-xl border border-skin-stroke text-skin-base transition ease-in-out hover:scale-110" />
    </div>
  );
}
