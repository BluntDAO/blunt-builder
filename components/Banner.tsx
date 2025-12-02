"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./Dialog";
import Button from "./Button";
import Link from "next/link";

export default function Banner() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="w-full flex flex-col justify-center items-center">
          <button
          onClick={() => setOpen(true)}
          className="px-4 pt-2 pb-1 text-white font-bold bg-dark w-full justify-center items-center text-center flex hover:bg-dark/90 transition-colors cursor-pointer"
        >
          Ounces the global sesh fund is turning into $BLUNT on SOLANA - Migration starts in 2026 - Click
          for details
        </button>
        <div className="w-full h-[16px] relative mb-2 -translate-y-0.5">
          <Image src="/black-drip.png" fill={true} alt="" />
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader className="px-6 pt-6 pb-4">
            <DialogTitle>
              <div className="flex items-center gap-3">
                <span className="text-4xl">🚀</span>
                <h3>$BLUNT Migration on Solana</h3>
              </div>
            </DialogTitle>
          </DialogHeader>
          <DialogDescription className="px-6 pb-6">
            <div className="flex flex-col gap-6 text-primary">
              <div className="bg-accent/10 border-l-4 border-accent rounded-lg p-4">
                <p className="font-semibold text-lg mb-2">
                  🎉 The Global Sesh Fund is Migrating!
                </p>
                <p className="text-secondary">
                  We're transitioning from Ounces to <strong>$BLUNT</strong>{" "}
                  tokens on the Solana blockchain. Migration will start in 2026. This is a major milestone for
                  BluntDAO!
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="text-2xl shrink-0">💎</div>
                  <div>
                    <h5 className="font-bold mb-1">NFT Holders</h5>
                    <p className="text-secondary">
                      All bought NFTs will have migration facilitated through{" "}
                      <Link
                        href="https://bluntdao.org/discord"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent-blue hover:underline font-semibold"
                      >
                        bluntdao.org/discord
                      </Link>
                      . You will be airdropped $BLUNT tokens on Solana.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="text-2xl shrink-0">🌿</div>
                  <div>
                    <h5 className="font-bold mb-1">Proof of Sesh</h5>
                    <p className="text-secondary">
                      Past Proof of Sesh holders are eligible for migration.
                      Join our Discord to claim your $BLUNT tokens.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="text-2xl shrink-0">✨</div>
                  <div>
                    <h5 className="font-bold mb-1">How to Migrate</h5>
                    <ol className="text-secondary list-decimal list-inside space-y-1">
                      <li>Join the BluntDAO Discord server</li>
                      <li>Verify your NFT ownership</li>
                      <li>Provide your Solana wallet address</li>
                      <li>Receive your $BLUNT airdrop</li>
                    </ol>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-accent/20 to-accent-blue/20 border-2 border-accent rounded-xl p-4 text-center">
                <p className="font-bold text-lg mb-3">
                  🔥 Ready to Migrate?
                </p>
                <Link
                  href="https://bluntdao.org/discord"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="primary" className="w-full sm:w-auto">
                    Join Discord to Migrate
                  </Button>
                </Link>
              </div>

              <div className="text-center">
                <p className="text-sm text-secondary">
                  Questions? Reach out in our Discord community for support.
                </p>
              </div>
            </div>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </>
  );
}
