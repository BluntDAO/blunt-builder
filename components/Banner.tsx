import Image from "next/image";

export default function Banner() {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="px-4 pt-2 pb-1 text-white font-bold bg-dark w-full justify-center items-center text-center flex">
      Regular auctions start 4/20 at 4:20 PM EST
      </div>
      <div className="w-full h-[16px] relative mb-2 -translate-y-0.5">
        <Image src="/black-drip.png" fill={true} alt="" />
      </div>
    </div>
  );
}
