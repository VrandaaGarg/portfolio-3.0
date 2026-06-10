import { RiTwitterXLine } from "react-icons/ri";
import { IconBrandLinkedin, IconBrandGithub } from "@tabler/icons-react";
import { Mail } from "lucide-react";
// import { SiPeerlist } from "react-icons/si";
// import { FaInstagram } from "react-icons/fa";
import type { IconType } from "react-icons";
import type { LucideIcon } from "lucide-react";

export interface SocialLink {
  title: string;
  icon: IconType | LucideIcon;
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
    icon: Mail,
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
