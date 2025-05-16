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
      title: "Sales consultant",
      company: "Obstans AS - Oslo, Norway",
      period: "Jan 2025 - Present",
      description: "Cold and warm sales consultant for Norway's largest power company Fjordkraft. Broke the office's daily sales record on my second day. Utilized my multilingual background to reach a wider audience",
    },
    {
      title: "Developer and Consultant",
      company: "Ut Av Boksen AS - Fredrikstad, Norway",
      period: "Jun 2023 - Dec 2024",
      description: "👨🏽‍💻 \n\nSole developer in the company. Set up infrastructure, selected and implemented the tech stack, designed databases, designed UI and developed the frontend. All while meeting with product owners to ensure user needs are met. Developed web applications in Next.js for clients, including a 'Debt collections calculator'.",
    },
    {
      title: "CEO, Foodtruck Operator",
      company: "Bobabike, by MFM Digital - Oslo, Norway",
      period: "Jan 2022 - Aug 2022",
      description: "At 19, started a bubble tea food truck on a bike called Bobabike. Imported an electric cargo bike from China to Norway, built a kitchen inside it, and cycled it around Oslo.\n\nHandled business strategy, sales, hiring, staff, logistics, accounting and marketing. Using only guerilla social media marketing and influencers for free.\n\nSold out every day. Ate and left no crumbs😌",
    },
    {
      title: "CEO, Photo, Video, & Digital Marketing",
      company: "MFM Digital - Oslo, Norway",
      period: "May 2019 - Nov 2023",
      description: "Established this business at 17 with special permission from the governor to register a business under 18. Handled daily operations including hiring freelancers, accounting, taxes, sales, and marketing of my own services, in addition to my clients'\n\nWorked with clients such as ✨Kendrick Lamar, Billie Eilish, Baby Keem, Jessie Reyes✨, Lillehammer Live, Eastern Norway Film Commission, SF Studios, Private Driver, TikTok influencer Levi Schmitz(137k followers), Adrian Sellevoll and more.",
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
            <p className="text-lg text-gray-300">
            👋 Hey, I’m Monzer Faisal! 
            </p>
            <p className="text-lg text-gray-300">
            I have a background in software engineering and business, which allows me to bridge the gap between technology and real-world impact. 
            My journey started with a deep curiosity for how things work—whether it was breaking down code, tinkering with hardware, or figuring out how to scale a business.
            </p>
            <p className="text-lg text-gray-300">
              some ppl just call it autistic but idk lol
            </p>          
          </div>
          <div className="lg:flex-1">
            <div className="relative aspect-square max-w-md mx-auto">
              <img
                src="/images/Obstans-50-small.jpg"
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
                    <li key={skill} className="text-gray-300">
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
              <Card key={exp.title} className="p-6 w-full lg:w-[70%]">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">{exp.title}</h3>
                    <p className="text-gray-300">{exp.company}</p>
                  </div>
                  <p className="text-gray-300">{exp.period}</p>
                </div>
                <div className="text-gray-300">
                  {exp.description.split('\n\n').map((paragraph, index) => (
                    <p key={index} className={index > 0 ? "mt-4" : ""}>
                      {paragraph}
                    </p>
                  ))}

                  {/* Add Bobabike photos gallery */}
                  {exp.title.includes("Foodtruck Operator") && (
                    <div className="mt-6">
                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <img 
                            src="/images/Bobabike-3.jpg" 
                            alt="Bobabike" 
                            className="rounded-md w-full h-auto object-cover"
                          />
                        </div>
                        <div>
                          <img 
                            src="/images/Bobabike.jpg" 
                            alt="Bobabike" 
                            className="rounded-md w-full h-auto object-cover"
                          />
                        </div>
                        <div>
                          <img 
                            src="/images/Bobabike-4.jpg" 
                            alt="Bobabike" 
                            className="rounded-md w-full h-auto object-cover"
                          />
                        </div>
                        <div className="col-span-3">
                          <img 
                            src="/images/Bobabike-2.jpg" 
                            alt="Bobabike" 
                            className="rounded-md w-full h-auto object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}