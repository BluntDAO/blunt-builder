import FaqElement from "@/components/FaqElement";
import Image from "next/image";
import ExternalLink from "./ExternalLink";

interface FaqItem {
  title: string;
  content: React.ReactNode;
}

const faqItems: FaqItem[] = [
  {
    title: "Can I use the art?",
    content: (
      <>
        <p>
          In the spirit of nouns.wtf, all our assets and tooling is open source and our traits are
          under{" "}
          <ExternalLink
            href="https://creativecommons.org/public-domain/cc0/"
          >CCO</ExternalLink>


        </p>
        <p>
          BluntsDAO, JointsDAO, SpliffDAO in public domain for people to proliferate brand,
          (hoggles)
        </p>
      </>
    ),
  },
  {
    title: "What We Are Doing",
    content: (
      <>
        <p>
          This is why we are building the unlimited sesh fund. A regular auction where the mint
          depends on it hitting our “ounce” price of 0.042 ETH on base. All the money goes to
          treasury, and NFT holders of the “OUNCES” NFT vote on incoming proposals (that come
          from anyone) to fund their future sesh.

        </p>
        <h5>Why Throw Down?</h5>
        <ul className="list-disc list-inside pl-4">
          <li>
          Forever reup our treasury with ounce for sesh
          </li>
          <li>
          Ownership gets you to decide the future of expansion in future seshes
          </li>
        </ul>
        <h5>Objectives</h5>
        <ul className="list-disc list-inside pl-4">
          <li>
          Create a self sustaining treasury for unlimited joints, blunts, other stick based items based on NFT ownership
          </li>
          <li>
          Build staple for culture and be a safety net and schelling points for stoners globally
          </li>
          <li>
          Build brand, gain revenue with other partnerships
          </li>
        </ul>
      </>
    ),
  },
];

export default function Faq() {
  return (
    <div className="flex flex-col w-full">
      <div className="bg-white w-full flex justify-center py-8 flex-col items-center">
        <div className="max-w-[754px] px-6 w-full flex flex-col gap-8 [&>p]:text-secondary bg-white">
          <h2 className="md:px-4 pt-8">More Info:</h2>
          <div className="flex flex-col gap-8 md:gap-4 w-full">
            {faqItems.map((item, i) => (
              <FaqElement title={item.title} key={i}>
                {item.content}
              </FaqElement>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full h-[68px] relative -translate-y-1">
        <Image src="/white-drip-2.png" fill={true} alt="" />
      </div>
    </div>
  );
}
