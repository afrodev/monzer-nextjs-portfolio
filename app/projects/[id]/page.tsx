import { getProjectById, getAllProjects } from "@/lib/projects";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((project) => ({
    id: project.id,
  }));
}

export default async function ProjectPage({ params }: { params: { id: string } }) {
  const project = await getProjectById(params.id);

  if (!project) {
    notFound();
  }

  return (
    <article className="min-h-screen py-12 bg-background">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Back Button */}
        <div className="mb-8">
          <Button variant="ghost" asChild>
            <Link href="/projects" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Projects
            </Link>
          </Button>
        </div>

        {/* Project Hero */}
        <div className="relative aspect-[21/9] mb-12 rounded-xl overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="object-cover w-full h-full"
          />
        </div>

        {/* Project Header */}
        <header className="max-w-3xl mx-auto text-center mb-12">
          <div className="flex items-center justify-center gap-x-4 text-sm mb-4">
            <time dateTime={project.date} className="text-muted-foreground">
              {project.date}
            </time>
            <span className="relative z-10 rounded-full bg-secondary px-3 py-1.5 font-medium">
              {project.category}
            </span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
            {project.title}
          </h1>
          <p className="text-xl text-muted-foreground">
            {project.description}
          </p>
        </header>

        {/* Project Content */}
        <div className="max-w-3xl mx-auto prose prose-lg dark:prose-invert prose-headings:text-foreground prose-a:text-primary hover:prose-a:text-primary/80">
          <div dangerouslySetInnerHTML={{ __html: project.content }} />
        </div>
      </div>
    </article>
  );
}