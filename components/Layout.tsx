import React from "react";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[url('/bg-layout.png')] text-skin-base min-h-screen flex items-center justify-around">
      <div className="max-w-[1400px] relative flex-col min-h-screen items-center justify-between">
        <div className="sticky top-0 z-10">
          <Header />
        </div>
        <div className="min-h-screen">
          <div
            className="p-6 mt-12 items-center bg-gradient-to-br from-gray-500 via-transparent to-transparent bg-opacity-60  rounded-lg shadow-lg border border-gray-300"
            style={{
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
            }}
          >
            {children}
          </div>
        </div>
        <div className="flex flex-col items-center w-full sticky bottom-0">
          <Footer />
        </div>
      </div>
    </div>
  );
}
