import { RiTwitterXLine, RiMailLine } from "react-icons/ri";
import { IconBrandLinkedin, IconBrandGithub } from "@tabler/icons-react";
// import { SiPeerlist } from "react-icons/si";
// import { FaInstagram } from "react-icons/fa";
import type { IconType } from "react-icons";

export interface SocialLink {
  title: string;
  icon: IconType;
  href: string;
}

export const socialLinks: SocialLink[] = [
  {
    title: "Twitter",
    icon: RiTwitterXLine,
    href: "https://x.com/vrandaagarg",
  },
  {
    title: "LinkedIn",
    icon: IconBrandLinkedin,
    href: "https://www.linkedin.com/in/vrandagarg/",
  },
  {
    title: "GitHub",
    icon: IconBrandGithub,
    href: "https://github.com/VrandaaGarg",
  },
  {
    title: "Email",
    icon: RiMailLine,
    href: "mailto:hi@vrandagarg.in",
  },
  // {
  //   title: "Peerlist",
  //   icon: SiPeerlist,
  //   href: "https://peerlist.io/vrandagarg",
  // },
  // {
  //   title: "Instagram",
  //   icon: FaInstagram,
  //   href: "https://instagram.com/vranda_garg",
  // },
];
