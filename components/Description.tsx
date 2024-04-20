import Image from "next/image";
import ExternalLink from "./ExternalLink";

export default function Description() {
  return (
    <>
      <div className="w-full flex flex-col justify-center items-center gap-0">
        <div className="w-full h-[60px] relative translate-y-1">
          <Image src="/white-drip.png" fill={true} alt="" />
        </div>
        <div className="bg-white w-full flex justify-center pt-8">
          <div className="max-w-[720px] px-6 w-full flex flex-col gap-4 [&>p]:text-secondary">
            <h2>
              The Global Treasury for Seshes
            </h2>
            <p>
              BluntDAO is the biggest IRL onboarding movement to Web3 via Proof of Sesh through local IRL OGs.
              We are now introducing the unlimited sesh fund, a regular re-up mechanism where anyone can request ETH to host a sesh from contributors.
              Onboarding the next million, 1 blunt/sesh at a time.
              For 2+ years we have been doing BluntDAO (also JointsDAO & SpliffDAO) for free.
              Nowin year 3: we are on the path to scale: unlimited sesh. A replenishing treasury for holders to vote on global requests for sesh.
            </p>

            <Image src="/blunts-1.jpg" width={"500"} height={"500"} className="rounded-3xl border-[4px] border-secondary" fill={false} alt="" />

            <h2 className="pt-4">
              Mission
            </h2>
            <p>
              We make sure blunts get smoked.

              Ask yourself? What does a Blunt want you to do to it? --- Smoke it. And in this essence this is what BluntDAO is living up to. The mission to make sure blunts get smoked. And we use blockchain for stuff.
              <Image src="/blunts-2.jpg" width={"500"} height={"500"} className="rounded-3xl border-[4px] border-secondary" fill={false} alt="" />
            </p>
            <h2 className="pt-4">
              Background
            </h2>
            <p>
              Over 2 years ago, we started started on Solana, with a  simple mission, lets give a NFT to everyone we smoke with IRL and call it Proof of Sesh. We did it for free and went on multiple world tours out of pocket. We smoked thousands of people out with our OG validators, creating more OG validators. We expanded to more than just Blunts, and became SpliffDAO and JointsDAO, and even expanded to other chains. We built account abstracted mechanisms, met the dopest people in Web3, and built community. Although we lived up to the job of making sure Blunts got smoked, the problem is, coordinating a bunch of stoners globally with no incentives and having them do on-chain actions at events is hard, especially when everyone is high. This is why in year 3, we are on the path to scale: unlimited sesh. A replenishing treasury for holders to vote on global requests for sesh.is essence this is what BluntDAO is living up to. The mission to make sure blunts get smoked. And we use blockchain for stuff.

            </p>
            <Image src="/blunts-3.jpg" width={"500"} height={"500"} className="rounded-3xl border-[4px] border-secondary" fill={false} alt="" />
          </div>
        </div>
      </div>
    </>
  );
}
