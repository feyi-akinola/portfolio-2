import { useEffect, useRef, useState } from "react";

type ProjectType = "Application" | "Design";

type Project = {
  name: string;
  type: ProjectType;
  url: string;
};

type Link = {
  name: string;
  icon: string;
  url: string;
};

const SOCIAL_LINKS: Link[] = [
  { url: "https://codepen.io/andre4loner", icon: "/icons/codepen.svg", name: "CodePen" },
  { url: "https://github.com/feyi-akinola/", icon: "/icons/github.svg", name: "GitHub" },
  { url: "https://linkedin.com/in/feyisayo-akinola/", icon: "/icons/linkedin.svg", name: "LinkedIn" },
] as const;

const PROJECTS: Project[] = [
  { name: "Tech Store Demo", type: "Application", url: "https://github.com/feyi-akinola/tech-store-demo#readme" },
  { name: "Mantar News", type: "Application", url: "https://github.com/feyi-akinola/mantar-news#readme" },
  { name: "Dessert Scape", type: "Design", url: "https://www.figma.com/design/hvh6D9SNud2Qe1iu7OSwij/Mocha-Social?node-id=0-1&t=5aCmrwOdH7zZEFS9-1" },
  { name: "Mocha Social", type: "Design", url: "https://www.figma.com/design/hvh6D9SNud2Qe1iu7OSwij/Mocha-Social?node-id=0-1&t=5aCmrwOdH7zZEFS9-1" },
];

type ProjectRowProps = {
  project: Project;
};

const PROJECT_IMAGES: Record<string, string> = {
  "Tech Store Demo": "/images/tech-store-demo-banner.png",
  "Mantar News": "/images/mantar-banner.png",
  "Dessert Scape": "/images/dessert-scape-banner.png",
  "Mocha Social": "/images/Mocha_Social_Banner.png",
};

function ProjectRow({ project }: ProjectRowProps) {
  const rowRef = useRef<HTMLAnchorElement>(null);
  const hoverCardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const raf = useRef<number | null>(null);

  // Animation loop
  useEffect(() => {
    const animate = () => {
      const card = hoverCardRef.current;
      const row = rowRef.current;
      if (!card || !row) return;
    
      const speed = 0.12;
      current.current.x += (target.current.x - current.current.x) * speed;
      current.current.y += (target.current.y - current.current.y) * speed;
    
      const cardW = card.offsetWidth;
      const rowRect = row.getBoundingClientRect();
    
      // Horizontal Clamping
      let leftPos = current.current.x - cardW;
      if (rowRect.left + leftPos < 0) {
        leftPos = -rowRect.left;
      }
      
      const topPos = current.current.y - card.offsetHeight - 10;
    
      card.style.transform = `translate(${leftPos}px, ${topPos}px)`;
    
      raf.current = requestAnimationFrame(animate);
    };

    raf.current = requestAnimationFrame(animate);

    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  // Mouse move updates target
  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
  
    const onMove = (e: MouseEvent) => {
      const rect = row.getBoundingClientRect();
    
      target.current.x = e.clientX - rect.left;
      target.current.y = e.clientY - rect.top;
    };
  
    row.addEventListener("mousemove", onMove);
  
    return () => {
      row.removeEventListener("mousemove", onMove);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <a
      ref={rowRef}
      target="_blank"
      href={project.url}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="flex justify-center items-center py-2 text-base lg:text-lg
        font-regular uppercase cursor-pointer text-text hover:text-text/60
        relative transition-all duration-300"
      style={{ overflow: "visible" }}
    >
      {/* Cursor-tracking hover card — positioned relative to the row */}
      <div
        ref={hoverCardRef}
        className="pointer-events-none absolute top-0 left-0 w-144 h-60 rounded-xl
          overflow-hidden will-change-transfor shadow-2xl"
        style={{
          opacity: isHovered ? 1 : 0,
          transition: "opacity 0.15s ease",
          zIndex: 50,
        }}
      >
        <img
          src={PROJECT_IMAGES[project.name]}
          className="w-full h-full object-cover rounded-xl"
        />
      </div>

      <p className="text-[0.85em]">{project.name} ↗</p>
    </a>
  );
}

type ProjectsCardProps = {
  style?: React.CSSProperties;
};

const ProjectSection = ({ title, projects } : { title: string, projects: Project[] }) => {
  return (
    <div className="flex flex-col gap-8 items-center justify-center w-full">
      <h3 className="text-text font-semibold text-xl text-center uppercase">
        {title}
      </h3>
        
      <div className="w-full sm:w-[50%] lg:w-full flex flex-col gap-4">
        {projects.map((p) => (
          <ProjectRow key={p.name} project={p} />
        ))}
      </div>
    </div>
  );
}

export default function ProjectsCard({ style }: ProjectsCardProps) {
  return (
    <div
      className="relative flex flex-col h-full w-full gap-2"
      style={{ gridRow: "span 2", ...style }}
    >
      <div className="flex-1 bg-white rounded-2xl p-7 flex transition-shadow
        duration-300 hover:shadow-2xl justify-center"
      >
        <h3
          className="absolute left-4 top-1/2 -translate-y-1/2 -rotate-90 origin-center
            text-md font-semibold uppercase text-text/20
            whitespace-nowrap pointer-events-none"
          style={{ width: '0', height: '0' }} 
        >
          Projects
        </h3>
        
        <div className="flex flex-col sm:flex-row lg:flex-col h-full justify-around
          sm:justify-evenly lg:justify-around w-full gap-8 lg:gap-0 py-6"
        >
          <ProjectSection
            title="Applications"
            projects={PROJECTS.filter((project) => project.type == "Application")}
          />
          
          <ProjectSection
            title="Designs"
            projects={PROJECTS.filter((project) => project.type == "Design")}
          />
        </div>
      </div>

      <div className="bg-stone-100 rounded-2xl px-2 py-5 flex items-center
        justify-around gap-2">
        {SOCIAL_LINKS.map(({ url, icon, name }) => (
          <a
            key={name}
            href={url}
            target="_blank"
            rel="noreferrer"
            className="flex flex-col items-center gap-1.5 text-xs font-semibold text-text
              no-underline transition-opacity duration-200 hover:opacity-60"
          >
            <img src={icon} alt={name} className="w-8 h-8" />
            {name}
          </a>
        ))}
      </div>
    </div>
  );
}