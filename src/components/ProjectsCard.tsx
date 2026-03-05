import { useEffect, useRef, useState } from "react";

const GithubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

type ProjectType = "Application" | "Design";

type Project = {
  name: string;
  type: ProjectType;
};

const SOCIALS = [
  { href: "https://feyisayo-resume.tiiny.site/", icon: undefined, label: "Resume" },
  { href: "https://github.com/feyi-akinola/", icon: <GithubIcon />, label: "GitHub" },
  { href: "https://linkedin.com/in/feyisayo-akinola/", icon: <LinkedinIcon />, label: "LinkedIn" },
] as const;

const PROJECTS: Project[] = [
  { name: "Mantar News", type: "Application" },
  { name: "Crime Visualizer", type: "Application" },
  { name: "Sela App", type: "Design" },
  { name: "Mocha Social", type: "Design" },
];

type ProjectRowProps = {
  project: Project;
};

const PROJECT_IMAGES: Record<string, string> = {
  "Mantar News": "https://picsum.photos/400/300?random=1",
  "Crime Visualizer": "https://picsum.photos/400/300?random=2",
  "Sela App": "https://picsum.photos/400/300?random=3",
  "Mocha Social": "https://picsum.photos/400/300?random=4",
};

function ProjectRow({ project }: ProjectRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const hoverCardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  const raf = useRef<number | null>(null);

  // Animation loop
  useEffect(() => {
    const animate = () => {
      const card = hoverCardRef.current;
      if (!card) return;

      const speed = 0.12;

      current.current.x += (target.current.x - current.current.x) * speed;
      current.current.y += (target.current.y - current.current.y) * speed;

      const w = card.offsetWidth;

      card.style.transform =
        `translate(${current.current.x - w}px, ${current.current.y - card.offsetHeight}px)`;

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
    const card = hoverCardRef.current;
    if (!row || !card) return;
  
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
    <div
      ref={rowRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="mb-4 flex justify-center items-center py-3.5 text-base lg:text-lg
        font-medium uppercase cursor-pointer text-text relative"
      style={{ overflow: "visible" }}
    >
      {/* Cursor-tracking hover card — positioned relative to the row */}
      <div
        ref={hoverCardRef}
        className="pointer-events-none absolute top-0 left-0 w-128 h-72 rounded-xl
          overflow-hidden shadow-2xl will-change-transform"
        style={{
          opacity: isHovered ? 1 : 0,
          transition: "opacity 0.15s ease",
          zIndex: 50,
        }}
      >
        <img
          src={PROJECT_IMAGES[project.name]}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex relative">
        <p className="button-text_ text-[0.85em]">{project.name}</p>

        {project.type === "Design" && (
          <span className="absolute -top-2 -right-12 flex items-center text-[0.5rem]
            px-2 py-1 bg-text rounded-full text-white">
            {project.type}
          </span>
        )}
      </div>
    </div>
  );
}

type ProjectsCardProps = {
  style?: React.CSSProperties;
};

export default function ProjectsCard({ style }: ProjectsCardProps) {
  return (
    <div
      className="flex flex-col h-full w-full gap-2"
      style={{ gridRow: "span 2", ...style }}>
      <div className="flex-1 bg-white rounded-2xl p-7 flex flex-col transition-shadow
        duration-300 hover:shadow-2xl">
        <div className="flex justify-between items-center mb-5">
          <span className="text-xl font-medium text-text">Projects</span>
          <a
            href="#"
            className="text-3xl text-text no-underline inline-block transition-transform
              duration-200 hover:translate-x-0.5 hover:-translate-y-0.5"
          >
            ↗
          </a>
        </div>

        <div className="flex flex-col sm:flex-row lg:flex-col gap-8 lg:gap-0">
          <div className="w-full sm:w-[50%] lg:w-full h-full min-h-40 rounded-xl mb-4
            overflow-hidden flex items-center justify-center bg-black/70" />

          <div className="w-full sm:w-[50%] lg:w-full mt-12 flex flex-col">
            {PROJECTS.map((p) => (
              <ProjectRow key={p.name} project={p} />
            ))}
          </div>
        </div>
      </div>

      <div className="pt-4 bg-stone-100 rounded-2xl px-6 py-5 flex items-center
        justify-around gap-2">
        {SOCIALS.map(({ href, icon, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-xs font-semibold text-text
              no-underline transition-opacity duration-200 hover:opacity-60"
          >
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-black
              text-base">
              {icon ?? "📄"}
            </div>
            {label}
          </a>
        ))}
      </div>
    </div>
  );
}