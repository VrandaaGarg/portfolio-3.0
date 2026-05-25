import { experienceData } from "@/data/experience";
import { projectsData } from "@/data/projects";
import { skillsData } from "@/data/skills";

// Schema.org type interfaces
interface Organization {
  "@type": "Organization";
  name: string;
  jobTitle?: string;
}

interface PersonSchema {
  "@context": "https://schema.org";
  "@type": "Person";
  name: string;
  jobTitle: string;
  description: string;
  url: string;
  image: string;
  sameAs: string[];
  knowsAbout: string[];
  worksFor?: Organization;
}

interface ProfilePageSchema {
  "@context": "https://schema.org";
  "@type": "ProfilePage";
  mainEntity: {
    "@type": "Person";
    name: string;
    jobTitle: string;
    description: string;
  };
}

interface SoftwareApplicationSchema {
  "@context": "https://schema.org";
  "@type": "SoftwareApplication";
  name: string;
  description: string;
  applicationCategory: string;
  operatingSystem: string;
  offers: {
    "@type": "Offer";
    price: string;
    priceCurrency: string;
  };
  url?: string;
  codeRepository?: string;
  image?: string;
  datePublished: string;
  creator: {
    "@type": "Person";
    name: string;
  };
  programmingLanguage: string[];
}

interface ProfessionalServiceSchema {
  "@context": "https://schema.org";
  "@type": "ProfessionalService";
  name: string;
  provider: {
    "@type": "Person";
    name: string;
  };
  description: string;
  areaServed: string;
  serviceType: string[];
}

interface OccupationSchema {
  "@context": "https://schema.org";
  "@type": "Occupation";
  name: string;
  occupationalCategory: string;
  description: string;
  skills: string[];
  occupationLocation: {
    "@type": "Place";
    name: string;
  };
}

type SchemaType =
  | PersonSchema
  | ProfilePageSchema
  | SoftwareApplicationSchema
  | ProfessionalServiceSchema
  | OccupationSchema;

// Social profile URLs (hardcoded to avoid importing React icons in server component)
const socialProfiles = [
  "https://x.com/vrandaagarg",
  "https://www.linkedin.com/in/vrandagarg/",
  "https://github.com/VrandaaGarg",
  "mailto:hi@vrandagarg.in",
];

export function StructuredData() {
  const siteUrl = "https://vrandagarg.in";

  // Get top 4 featured projects (first 4 in the array are always featured)
  const featuredProjects = projectsData.slice(0, 4);

  // Get all skills
  const allSkills = Object.values(skillsData)
    .flat()
    .map((skill) => skill.name);

  // Person Schema
  const personSchema: PersonSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Vranda Garg",
    jobTitle: "Full Stack Developer",
    description:
      "Full Stack Developer who ships AI-powered products end-to-end with strong UI/UX. Builds production AI apps, real-time systems, and internal tools that lift team productivity. Creator of MemContext, MUJ General, CappyChat, CappyUI, Bashio, ResuMate, and Quoridor Online.",
    url: siteUrl,
    image: "https://res.cloudinary.com/dyetf2h9n/image/upload/v1765637887/banner_hfyoau.png",
    sameAs: socialProfiles,
    knowsAbout: allSkills,
  };

  if (experienceData.length > 0 && experienceData[0].isCurrent) {
    personSchema.worksFor = {
      "@type": "Organization",
      name: experienceData[0].name,
      jobTitle: experienceData[0].role,
    };
  }

  // Professional Profile Schema
  const profileSchema: ProfilePageSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: "Vranda Garg",
      jobTitle: "Full Stack Developer",
      description:
        "Full Stack Developer at Kakiyo OÜ who ships AI-powered products end-to-end. Built MemContext, MUJ General, CappyChat, CappyUI, Bashio, ResuMate, and Quoridor Online. Specializes in Next.js, React, TypeScript, AI integration, and real-time systems.",
    },
  };

  // Software Application Schema for featured projects (without fake ratings)
  const projectsSchema: SoftwareApplicationSchema[] = featuredProjects.map(
    (project) => ({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: project.name,
      description: project.description
        .replace(/\*\*/g, "")
        .replace(/\n/g, " ")
        .substring(0, 500),
      applicationCategory: "WebApplication",
      operatingSystem: "Web",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      ...(project.liveDemoUrl && { url: project.liveDemoUrl }),
      ...(project.githubUrl && { codeRepository: project.githubUrl }),
      ...(project.image && { image: project.image }),
      datePublished: project.dateCreated,
      creator: {
        "@type": "Person",
        name: "Vranda Garg",
      },
      programmingLanguage: project.techStack,
    })
  );

  // Professional Service Schema
  const serviceSchema: ProfessionalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Full Stack and AI Product Engineering Services",
    provider: {
      "@type": "Person",
      name: "Vranda Garg",
    },
    description:
      "Ships AI-powered products end-to-end with strong UI/UX. Specializes in Next.js, React, TypeScript, AI integration, real-time systems, and internal tools that lift team productivity.",
    areaServed: "Worldwide",
    serviceType: [
      "AI Product Development",
      "Frontend Development",
      "Backend Development",
      "Full Stack Development",
      "UI/UX Design",
      "Web Application Development",
      "Real-time Systems",
      "Internal Tools Development",
    ],
  };

  // Occupation Schema (for experience)
  const occupationSchema: OccupationSchema | null =
    experienceData.length > 0 && experienceData[0].isCurrent
      ? {
          "@context": "https://schema.org",
          "@type": "Occupation",
          name: experienceData[0].role,
          occupationalCategory: "15-1132.00",
          description: experienceData[0].description.join(" "),
          skills: experienceData[0].technologies,
          occupationLocation: {
            "@type": "Place",
            name: experienceData[0].name,
          },
        }
      : null;

  // Collection of all schemas
  const allSchemas: SchemaType[] = [
    personSchema,
    profileSchema,
    serviceSchema,
    ...projectsSchema,
    ...(occupationSchema ? [occupationSchema] : []),
  ];

  return (
    <>
      {allSchemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  )
}
