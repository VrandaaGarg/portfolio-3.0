import { createFileRoute, notFound } from "@tanstack/react-router";
import ProjectDetailsView from "@/Components/sections/ProjectDetailsView";
import { projectsData } from "@/data/projects";

const siteUrl = "https://vrandagarg.in";

export const Route = createFileRoute("/projects_/$name")({
  loader: ({ params }) => {
    const project = projectsData.find(
      (p) => p.name.toLowerCase().replace(/\s+/g, "-") === params.name
    );

    if (!project) {
      throw notFound();
    }

    return { project };
  },
  head: ({ loaderData }) => {
    const project = loaderData?.project;

    if (!project) {
      return {
        meta: [{ title: "Project Not Found | Vranda Garg - Full Stack Developer" }],
      };
    }

    const projectUrl = `${siteUrl}/projects/${project.name.toLowerCase().replace(/\s+/g, "-")}`;
    const description = project.description
      .replace(/\*\*/g, "")
      .replace(/\n/g, " ")
      .substring(0, 160);

    return {
      meta: [
        { title: `${project.name} | Vranda Garg - Full Stack Developer` },
        { name: "description", content: description },
        {
          name: "keywords",
          content: [
            project.name,
            ...project.techStack,
            "Web Development",
            "Portfolio Project",
            "Vranda Garg",
          ].join(", "),
        },
        { property: "og:title", content: `${project.name} - Vranda Garg` },
        { property: "og:description", content: description },
        { property: "og:url", content: projectUrl },
        { property: "og:site_name", content: "Vranda Garg - Portfolio" },
        { property: "og:image", content: project.image },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        { property: "og:image:alt", content: `${project.name} - Project by Vranda Garg` },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: `${project.name} - Vranda Garg` },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: project.image },
        { name: "twitter:creator", content: "@vrandaagarg" },
      ],
      links: [{ rel: "canonical", href: projectUrl }],
    };
  },
  component: ProjectPage,
});

function ProjectPage() {
  const { project } = Route.useLoaderData();

  return <ProjectDetailsView project={project} />;
}
