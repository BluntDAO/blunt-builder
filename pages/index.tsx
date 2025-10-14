import Header from "../components/Header";
import { useIsMounted } from "hooks/useIsMounted";
import { Fragment, useState } from "react";
import Hero from "../components/Hero/Hero";
import { GetStaticPropsResult, InferGetStaticPropsType } from "next";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { SWRConfig } from "swr";
import {
  ContractInfo,
  getContractInfo,
  getTokenInfo,
  TokenInfo,
} from "data/nouns-builder/token";
import { AuctionInfo, getCurrentAuction } from "data/nouns-builder/auction";
import { promises as fs } from "fs";
import path from "path";
import Footer from "@/components/Footer";
import FaqElement from "@/components/FaqElement";
import { getAddresses } from "@/services/nouns-builder/manager";
import Image from "next/image";
import Banner from "@/components/Banner";
import Faq from "@/components/Faq";
import Description from "@/components/Description";
import React from "react";

type MarkdownSource = MDXRemoteSerializeResult<Record<string, unknown>>;

export const getStaticProps = async (): Promise<
  GetStaticPropsResult<{
    tokenContract: string;
    tokenId: string;
    contract: ContractInfo;
    token: TokenInfo;
    auction: AuctionInfo;
    descriptionSource: MarkdownSource;
    faqSources: MarkdownSource[];
  }>
> => {
  // Add error handling for missing environment variable
  const tokenContract = process.env.NEXT_PUBLIC_TOKEN_CONTRACT;
  if (!tokenContract) {
    throw new Error('NEXT_PUBLIC_TOKEN_CONTRACT environment variable is not set');
  }

  const addresses = await getAddresses({ tokenAddress: tokenContract as `0x${string}` });

  const [contract, auction] = await Promise.all([
    getContractInfo({ address: tokenContract }),
    getCurrentAuction({ address: addresses.auction }),
  ]);

  const tokenId = auction.tokenId;
  const token = await getTokenInfo({
    address: tokenContract,
    tokenid: tokenId,
  });

  // Get description and faq markdown

  const templateDirectory = path.join(process.cwd(), "templates");
  const descFile = await fs.readFile(
    templateDirectory + "/home/description.md",
    "utf8"
  );
  const descMD = await serialize(descFile);

  let faqSources: MarkdownSource[] = [];
  try {
    const faqFiles = await fs.readdir(templateDirectory + "/home/faq", {
      withFileTypes: true,
    });

    faqSources = await Promise.all(
      faqFiles
        .filter((dirent) => dirent.isFile())
        .map(async (file) => {
          const faqFile = await fs.readFile(
            templateDirectory + "/home/faq/" + file.name,
            "utf8"
          );

          return serialize(faqFile, { parseFrontmatter: true });
        })
    ).then((x) =>
      x.sort(
        (a, b) =>
          Number(a.frontmatter?.order || 0) - Number(b.frontmatter?.order || 0)
      )
    );
  } catch {
    //Do Nothing (no FAQ directory)
  }

  if (!contract.image) contract.image = "";

  return {
    props: {
      tokenContract,
      tokenId,
      contract,
      token,
      auction,
      descriptionSource: descMD,
      faqSources,
    },
    revalidate: 60,
  };
};

function WarningMessage() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-yellow-200 text-yellow-800 p-4 rounded-md shadow-md w-full max-w-screen-md mx-auto mt-4">
      <div className="flex justify-between items-center">
        <span>
          If this auction page is not working, go to the{" "}
          <a
            href="https://nouns.build/dao/base/0x8a613cb90ab3b318d4e46d09f260a84b788e206b/131"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-600"
          >
            Nouns.Builder
          </a>{" "}
          page to make a bid.
        </span>
        <button
          onClick={() => setIsVisible(false)}
          className="text-red-600 font-bold"
        >
          X
        </button>
      </div>
    </div>
  );
}

export default function SiteComponent({
  tokenContract,
  tokenId,
  contract,
  token,
  auction,
  descriptionSource,
  faqSources,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const isMounted = useIsMounted();

  if (!isMounted) return <Fragment />;

  return (
    <SWRConfig
      value={{
        fallback: {
          [`/api/token/${tokenContract}`]: contract,
          [`/api/token/${tokenContract}/${tokenId}`]: token,
          [`/api/auction/${contract.auction}`]: auction,
        },
      }}
    >
      <div className="bg-green-500 min-h-screen flex flex-col items-center justify-start w-screen">
        <div className="bg-opacity-90 shadow-md flex flex-col items-center justify-start w-screen bg-cover bg-[url('/bg-blunt.png')]">
          <Banner />
          <Header />
          <Hero />
          <WarningMessage />
          <div className="w-full h-[60px] relative translate-y-1">
            <Image src="/white-drip.png" fill={true} alt="" />
          </div>
        </div>
        <Description />
        <Faq />
        <div className="bg-opacity-90 shadow-md flex flex-col items-center justify-start w-screen bg-cover bg-[url('/bg-blunt.png')]">
          <div className="w-full h-[68px] relative -translate-y-1">
            <Image src="/white-drip-2.png" fill={true} alt="" />
          </div>
          <Footer />
        </div>
      </div>
    </SWRConfig>
  );
}
