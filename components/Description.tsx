import Image from "next/image";
import ExternalLink from "./ExternalLink";

export default function Description() {
  return (
    <>
      <div className="w-full flex flex-col justify-center items-center gap-0">
        <div className="bg-white w-full flex justify-center pt-8 pb-12">
          <div className="max-w-[1200px] px-4 md:px-6 lg:px-8 w-full flex flex-col gap-8">
            
            {/* Hero Section */}
            <div className="text-center max-w-[900px] mx-auto">
              <h2 className="mb-6">🌍 The Global Treasury for Seshes</h2>
              <p className="text-secondary text-lg md:text-xl leading-relaxed">
                BluntDAO is the biggest IRL onboarding movement to Web3 via Proof
                of Sesh through local IRL OGs. We are now introducing the
                unlimited sesh fund, a regular re-up mechanism where anyone can
                request ETH to host a sesh from contributors. Onboarding the next
                million, 1 blunt/sesh at a time.
              </p>
            </div>

            {/* Feature Image */}
            {/* <div className="w-full max-w-[800px] mx-auto">
              <Image
                src="/blunts-1.jpg"
                width={800}
                height={800}
                className="rounded-3xl border-[4px] border-secondary shadow-xl w-full h-auto"
                alt="BluntDAO Community"
              />
            </div> */}

            {/* Objectives Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-8">
              <div className="bg-accent/10 border-[3px] border-accent rounded-2xl p-6 flex flex-col items-center text-center gap-3 hover:shadow-lg transition-shadow">
                <div className="text-5xl">🌿</div>
                <h5 className="font-bold">Proof of Sesh</h5>
                <p className="text-secondary text-sm">
                  Onboarding Web3 through IRL experiences, one sesh at a time
                </p>
              </div>
              
              <div className="bg-accent/10 border-[3px] border-accent rounded-2xl p-6 flex flex-col items-center text-center gap-3 hover:shadow-lg transition-shadow">
                <div className="text-5xl">💰</div>
                <h5 className="font-bold">Community Treasury</h5>
                <p className="text-secondary text-sm">
                  Holders vote on global requests for sesh funding
                </p>
              </div>
              
              <div className="bg-accent/10 border-[3px] border-accent rounded-2xl p-6 flex flex-col items-center text-center gap-3 hover:shadow-lg transition-shadow">
                <div className="text-5xl">🌐</div>
                <h5 className="font-bold">Global Network</h5>
                <p className="text-secondary text-sm">
                  Local OG validators creating connections worldwide
                </p>
              </div>
            </div>

            {/* Mission Card */}
            <div className="bg-secondary/50 rounded-3xl p-6 md:p-10 mt-8 border-[3px] border-secondary shadow-lg">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="order-2 lg:order-1">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-4xl">🎯</span>
                    <h3>Mission</h3>
                  </div>
                  <p className="text-secondary text-lg leading-relaxed">
                    We make sure blunts get smoked. Ask yourself? What does a Blunt
                    want you to do to it? --- Smoke it. And in this essence this is
                    what BluntDAO is living up to. The mission to make sure blunts get
                    smoked. And we use blockchain for stuff.
                  </p>
                  <div className="mt-6 bg-accent/20 rounded-xl p-4 border-l-4 border-accent">
                    <p className="text-sm font-semibold">
                      ✨ For 3+ years we've been doing BluntDAO (also JointsDAO & SpliffDAO) for free. 
                      Now in year 3: we are on the path to scale with unlimited sesh.
                    </p>
                  </div>
                </div>
                <div className="order-1 lg:order-2">
                  <Image
                    src="/blunts-2.jpg"
                    width={500}
                    height={500}
                    className="rounded-2xl border-[4px] border-white shadow-xl w-full h-auto"
                    alt="BluntDAO Mission"
                  />
                </div>
              </div>
            </div>

            {/* Background Card */}
            <div className="bg-gradient-to-br from-secondary/30 to-secondary/50 rounded-3xl p-6 md:p-10 border-[3px] border-secondary shadow-lg">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <Image
                    src="/blunts-3.jpg"
                    width={500}
                    height={500}
                    className="rounded-2xl border-[4px] border-white shadow-xl w-full h-auto"
                    alt="BluntDAO Background"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-4xl">📖</span>
                    <h3>Background</h3>
                  </div>
                  <p className="text-secondary text-lg leading-relaxed mb-6">
                    Over 3 years ago, we started on Solana with a simple
                    mission: let's give an NFT to everyone we smoke with IRL and call it
                    Proof of Sesh. We did it for free and went on multiple world tours
                    out of pocket. We smoked thousands of people out with our OG
                    validators, creating more OG validators.
                  </p>
                  <p className="text-secondary text-lg leading-relaxed">
                    We expanded to more than
                    just Blunts, and became SpliffDAO and JointsDAO, and even expanded
                    to other chains. We built account abstracted mechanisms, met the
                    dopest people in Web3, and built community. Although we lived up
                    to the job of making sure Blunts got smoked, the problem is,
                    coordinating a bunch of stoners globally with no incentives and
                    having them do on-chain actions at events is hard, especially when
                    everyone is high.
                  </p>
                </div>
              </div>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <div className="bg-white border-[3px] border-secondary rounded-xl p-6 text-center hover:border-accent transition-colors">
                <div className="text-3xl md:text-4xl font-bold text-accent mb-2">3+</div>
                <div className="text-sm text-secondary font-semibold">Years Active</div>
              </div>
              <div className="bg-white border-[3px] border-secondary rounded-xl p-6 text-center hover:border-accent transition-colors">
                <div className="text-3xl md:text-4xl font-bold text-accent mb-2">1000s</div>
                <div className="text-sm text-secondary font-semibold">People Onboarded</div>
              </div>
              <div className="bg-white border-[3px] border-secondary rounded-xl p-6 text-center hover:border-accent transition-colors">
                <div className="text-3xl md:text-4xl font-bold text-accent mb-2">∞</div>
                <div className="text-sm text-secondary font-semibold">Unlimited Sesh</div>
              </div>
              <div className="bg-white border-[3px] border-secondary rounded-xl p-6 text-center hover:border-accent transition-colors">
                <div className="text-3xl md:text-4xl font-bold text-accent mb-2">🌍</div>
                <div className="text-sm text-secondary font-semibold">Global Network</div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="bg-accent rounded-3xl p-8 md:p-12 text-center border-[4px] border-accent-blue shadow-2xl mt-8">
              <h3 className="mb-4 text-dark">Join the Movement</h3>
              <p className="text-dark text-lg max-w-[700px] mx-auto leading-relaxed">
                A replenishing treasury for holders to vote on global requests for sesh. 
                Making sure blunts get smoked, powered by blockchain.
              </p>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
