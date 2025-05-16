import { Card } from "@/components/ui/card";

export default function AboutPage() {
  const skills = [
    {
      category: "Software Development",
      items: ["Full-stack apps", "TypeScript", "React", "Node.js", "Next.js", "CI/CD", "Python", "SQL", "MongoDB"],
    },
    {
      category: "Electronics & Embedded Systems",
      items: ["Arduino", "ESP32 projects", "Raspberry Pi", "PCB Design", "IoT Development"],
    },
    {
      category: "Creative",
      items: ["Photography", "Video Production", "Digital Marketing","Adobe Creative Suite", "Drone Photography", "Social Media Management", "TikTok Content"],
    },
    {
      category: "Business",
      items: ["Digital Marketing", "Project Management", "Business Strategy", "Sales"],
    },
  ];

  const experience = [
    {
      title: "Software Engineer",
      company: "Tech Innovations Inc.",
      period: "2022 - Present",
      description: "Leading development of web applications and IoT solutions.",
    },
    {
      title: "Freelance Developer",
      company: "Self-employed",
      period: "2020 - 2022",
      description: "Delivered custom software solutions for various clients.",
    },
  ];

  return (
    <div className="min-h-screen py-12 bg-background">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Hero Section */}
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12 mb-16">
          <div className="flex-1 space-y-6">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-800">
              Who is Monzer?
            </h1>
            <p className="text-lg text-muted-foreground">
            👋 Hey, I’m Monzer Faisal! 
            </p>
            <p className="text-lg text-muted-foreground">
            I have a background in software engineering and business, which allows me to bridge the gap between technology and real-world impact. 
            My journey started with a deep curiosity for how things work—whether it was breaking down code, tinkering with hardware, or figuring out how to scale a business.
            </p>
            <p className="text-lg text-muted-foreground">
              insert more text
            </p>
          </div>
          <div className="lg:flex-1">
            <div className="relative aspect-square max-w-md mx-auto">
              <img
                src="/images/Monzer-Yellow-Field-Simple-sq.jpg"
                alt="Portrait"
                className="rounded-2xl object-cover shadow-xl"
              />
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">💡 What I do best</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skillGroup) => (
              <Card key={skillGroup.category} className="p-6">
                <h3 className="font-semibold text-lg mb-4">{skillGroup.category}</h3>
                <ul className="space-y-2">
                  {skillGroup.items.map((skill) => (
                    <li key={skill} className="text-muted-foreground">
                      {skill}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <section>
          <h2 className="text-3xl font-bold mb-8">Professional Experience</h2>
          <div className="space-y-6">
            {experience.map((exp) => (
              <Card key={exp.title} className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">{exp.title}</h3>
                    <p className="text-muted-foreground">{exp.company}</p>
                  </div>
                  <p className="text-muted-foreground">{exp.period}</p>
                </div>
                <p className="text-muted-foreground">{exp.description}</p>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}