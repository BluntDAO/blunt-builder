import Layout from "@/components/Layout";
import { Proposal } from "@/services/nouns-builder/governor";
import { TOKEN_CONTRACT } from "constants/addresses";
import Link from "next/link";
import { useDAOAddresses, useGetAllProposals, useTreasuryBalance } from "hooks";
import { getProposalName } from "@/utils/getProposalName";
import ProposalStatus from "@/components/ProposalStatus";
import { promises as fs } from "fs";
import path from "path";
import { GetStaticPropsResult, InferGetStaticPropsType } from "next";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { formatTreasuryBalance } from "@/utils/formatTreasuryBalance";
import { Fragment } from "react";
import { useUserVotes } from "@/hooks/fetch/useUserVotes";
import { useCurrentThreshold } from "@/hooks/fetch/useCurrentThreshold";

export const getStaticProps = async (): Promise<
  GetStaticPropsResult<{
    descriptionSource: MDXRemoteSerializeResult<Record<string, unknown>>;
  }>
> => {
  // Get description markdown
  const templateDirectory = path.join(process.cwd(), "templates");
  const descFile = await fs.readFile(
    templateDirectory + "/vote/description.md",
    "utf8"
  );
  const descMD = await serialize(descFile);

  return {
    props: {
      descriptionSource: descMD,
    },
    revalidate: 60,
  };
};

export default function Vote({
  descriptionSource,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { data: addresses } = useDAOAddresses({
    tokenContract: TOKEN_CONTRACT,
  });
  const { data: proposals } = useGetAllProposals({
    governorContract: addresses?.governor,
  });
  const { data: treasuryBalance } = useTreasuryBalance({
    treasuryContract: addresses?.treasury,
  });
  const { data: userVotes } = useUserVotes();
  const { data: currentThreshold } = useCurrentThreshold({
    governorContract: addresses?.governor,
  });

  const getProposalNumber = (i: number) => {
    if (!proposals) return 0;
    return proposals.length - i;
  };

  return (
    <Layout>
      <div className="text-2xl text-white relative font-heading">
        Governance
      </div>

      <div className="">
        <h1 className="text-white mb-6">My OUNCE Governance</h1>
        <p className="text-white">
          Hold 1 OUNCE NFT to submit a transfer proposal to fund a sesh,
          advanced the development or assist with operating{" "}
          <a
            className="mt-[6] text-blue-900"
            target="_blank"
            href="http://blunts.wtf/"
            style={{ textDecoration: "none" }}
          >
            Blunts.wtf
          </a>
        </p>
      </div>

      <div className="border border-skin-stroke rounded-2xl py-6 sm:py-0 px-6 mt-6 flex flex-col sm:flex-row sm:items-center justify-between sm:h-32">
        <div className="sm:py-6 h-full">
          <div className="font-heading text-2xl text-white">Treasury</div>
          <div className="text-4xl font-bold font-heading mt-2 text-white">
            Ξ {treasuryBalance ? formatTreasuryBalance(treasuryBalance) : "0"}
          </div>
        </div>
        <div className="sm:w-1/3 mt-4 sm:mt-0 sm:border-l border-skin-stroke sm:pl-6 h-full flex items-center text-white">
          This treasury exists for DAO participants to allocate resources for
          the long-term growth and prosperity of the project.
        </div>
      </div>

      <div className="mt-12">
        <div className="flex items-center justify-between">
          <div className="text-4xl font-heading text-white">Proposals</div>
          {userVotes && userVotes >= (currentThreshold || 0) ? (
            <Link
              href={"/create-proposal"}
              className="text-sm bg-skin-muted hover:bg-skin-button-accent-hover hover:text-skin-inverted text-skin-muted w-36 h-8 rounded-lg flex items-center justify-around"
            >
              Submit proposal
            </Link>
          ) : (
            <Fragment />
          )}
        </div>
        <div>
          {proposals?.map((x, i) => (
            <ProposalPlacard
              key={i}
              proposal={x}
              proposalNumber={getProposalNumber(i)}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}

const ProposalPlacard = ({
  proposal,
  proposalNumber,
}: {
  proposal: Proposal;
  proposalNumber: number;
}) => {
  return (
    <Link
      href={`/vote/${proposal.proposalId}`}
      className="flex items-center justify-between w-full bg-skin-muted hover:bg-green-500 border border-skin-stroke p-4 my-6 rounded-2xl"
    >
      <div className="flex items-center pr-4">
        <div className="text-xl font-semibold text-skin-base">
          <span className="text-skin-muted mr-3 sm:mr-4 sm:ml-2">
            {proposalNumber}
          </span>
          {getProposalName(proposal.description)}
        </div>
      </div>
      <ProposalStatus proposal={proposal} />
    </Link>
  );
};
