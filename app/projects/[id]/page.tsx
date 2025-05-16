import { getProjectById, getAllProjects } from "@/lib/projects";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import dynamic from "next/dynamic";

// Dynamically import the HorizontalCarousel component with client-side rendering
const HorizontalCarousel = dynamic(
  () => import("@/components/HorizontalCarousel"),
  { ssr: false }
);

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

  // Bobabike images for the carousel
  const bobaBikeImages = [
    "/images/Bobabike.jpg",
    "/images/Bobabike-3.jpg",
    "/images/Bobabike-4.jpg",
    "/images/Bobabike-2.jpg",
  ];

  // For Bobabike project, we'll inject the carousel at the "some pics" location
  type ProcessedContent = string | { beforeCarousel: string; afterCarousel: string };
  let processedContent: ProcessedContent = project.content;
  
  if (params.id === "bobabike") {
    // With the enhanced markdown processing, the marker might have different HTML
    // Check for different possible formats of the "some pics" marker
    const possibleMarkers = [
      '<p>some pics</p>',
      '<p class="mb-6">some pics</p>',
      '<p class="mb-6">some pics</p>\n',
      '<p>some pics</p>\n'
    ];
    
    // Split the content at the first matching marker
    let parts = null;
    for (const marker of possibleMarkers) {
      if (processedContent.includes(marker)) {
        parts = processedContent.split(marker);
        break;
      }
    }
    
    if (parts && parts.length === 2) {
      // We found the marker, so we'll render the content in parts with the carousel in between
      processedContent = {
        beforeCarousel: parts[0],
        afterCarousel: parts[1]
      };
    }
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

        {/* Project Content with carousel injection */}
        <div className="max-w-3xl mx-auto prose prose-lg dark:prose-invert prose-headings:text-foreground prose-a:text-primary hover:prose-a:text-primary/80 prose-p:mb-10 prose-p:leading-relaxed prose-li:my-2 prose-headings:mt-12 prose-headings:mb-6">
          {params.id === "bobabike" && typeof processedContent !== 'string' ? (
            <>
              {/* Render content before the carousel */}
              <div 
                dangerouslySetInnerHTML={{ __html: processedContent.beforeCarousel }} 
                className="mb-8"
              />
              
              {/* Insert the carousel */}
              <HorizontalCarousel images={bobaBikeImages} />
              
              {/* Render content after the carousel */}
              <div 
                dangerouslySetInnerHTML={{ __html: processedContent.afterCarousel }} 
                className="mt-8"
              />
            </>
          ) : (
            <div dangerouslySetInnerHTML={{ __html: typeof processedContent === 'string' ? processedContent : project.content }} />
          )}
        </div>
      </div>
    </article>
  );
}