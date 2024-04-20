import { useTheme } from "@/hooks/useTheme";
import NavigationItemComponent from "./NavigationItem";
import Button from "./Button";
import Image from "next/image";
import Link from "next/link";
import ExternalLink from "./ExternalLink";

const navItems = [
  {
    href: "https://www.instagram.com/thenounsquare",
    src: "/instagram.svg",
  },
  {
    href: "https://x.com/bluntdao ",
    src: "/x.svg",
  },
  {
    href: "https://warpcast.com/blunts ",
    src: "/farcaster.svg",
  },
];

export default function Footer() {
  return (
    <div className="flex  pb-16 pt-4 flex-col justify-center items-center gap-16">
      <div className="flex flex-wrap items-center gap-4">
        {navItems.map((item, i) => (
          <Button variant="secondary" size="rounded" key={i}>
            <Link
              href={item.href}
              target="_blank"
              rel="noreferer noopener noreferrer"
            >
              <Image src={item.src} width={24} height={24} alt="" />
            </Link>
          </Button>
        ))}
      </div>
      <div className="caption text-secondary">
        Made with ❤️ by{" "}
        <ExternalLink href="https://paperclip.xyz/">
          Paperclip Labs
        </ExternalLink>
      </div>
    </div>
  );
}
