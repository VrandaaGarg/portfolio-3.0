import { 
  RiNextjsFill, 
  RiTailwindCssFill 
} from 'react-icons/ri';
import { 
  FaReact, 
  FaPython 
} from 'react-icons/fa';
import { 
  BiLogoTypescript 
} from 'react-icons/bi';
import { 
  SiJavascript, 
  SiFramer, 
  SiExpress, 
  SiMongodb, 
  SiFirebase, 
  SiAppwrite, 
  SiGithub, 
  SiVercel,
} from 'react-icons/si';
import { 
  DiNodejs 
} from 'react-icons/di';
import { 
  GrMysql 
} from 'react-icons/gr';
import { 
  TbBrandCpp 
} from 'react-icons/tb';
import { 
  GitBranch, 
  Hash,
} from 'lucide-react';
import type { IconType } from 'react-icons';
import type { LucideIcon } from 'lucide-react';
import type { ComponentType, SVGProps } from 'react';
import { CloudFlareIcon, PlanetScaleIcon, RedisIcon } from '@/Components/icons/CustomIcons';

export type SkillIcon = IconType | LucideIcon | ComponentType<SVGProps<SVGSVGElement>>;

export interface Skill {
  name: string;
  icon?: SkillIcon;
  image?: string;
  grayscale?: boolean;
}

export const skillsData: Record<string, Skill[]> = {
  "Frontend Development": [
    { name: "Next.js", icon: RiNextjsFill },
    { name: "React.js", icon: FaReact },
    { name: "TypeScript", icon: BiLogoTypescript },
    { name: "JavaScript", icon: SiJavascript },
    { name: "Tailwind CSS", icon: RiTailwindCssFill },
    { name: "Framer Motion", icon: SiFramer },
    { name: "Zustand", image: "https://res.cloudinary.com/dyetf2h9n/image/upload/v1765632165/zustand_tcnlhr.png" },
  ],
  "Backend & Database": [
    { name: "Node.js", icon: DiNodejs },
    { name: "Express.js", icon: SiExpress },
    { name: "MongoDB", icon: SiMongodb },
    { name: "PlanetScale", icon: PlanetScaleIcon },
    { name: "Firebase", icon: SiFirebase },
    { name: "Appwrite", icon: SiAppwrite },
    { name: "MySQL", icon: GrMysql },
    { name: "Redis", icon: RedisIcon, grayscale: true },
    { name: "Cloudflare", icon: CloudFlareIcon },
  ],
  "Programming Languages & Tools": [
    { name: "Vercel AI SDK", icon: SiVercel },
    { name: "Git", icon: GitBranch },
    { name: "GitHub", icon: SiGithub },
    { name: "C++", icon: TbBrandCpp },
    { name: "C", icon: Hash },
    { name: "Python", icon: FaPython }, 
  ],
};
