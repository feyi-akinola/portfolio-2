const GmailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
    <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
  </svg>
);

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

const InteriorSVG = () => (
  <svg width="100%" height="100%" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="200" fill="#d8d5d0" />
    <rect x="0" y="120" width="400" height="80" fill="#e8e5e0" />
    <rect x="30" y="30" width="120" height="100" fill="#b0aca6" rx="2" />
    <rect x="35" y="35" width="110" height="90" fill="#989490" rx="1" />
    <ellipse cx="200" cy="165" rx="60" ry="12" fill="#c8c5c0" />
    <rect x="155" y="100" width="90" height="65" rx="8" fill="#2a2a2a" />
    <rect x="165" y="108" width="70" height="50" rx="5" fill="#1a1a1a" />
    <rect x="160" y="148" width="80" height="8" rx="3" fill="#3a3a3a" />
    <ellipse cx="290" cy="140" rx="30" ry="60" fill="#7a9a6a" opacity="0.7" />
    <ellipse cx="280" cy="120" rx="20" ry="40" fill="#8ab07a" opacity="0.6" />
    <rect x="275" y="155" width="8" height="45" fill="#5a4a3a" />
    <ellipse cx="340" cy="158" rx="28" ry="10" fill="#ccc" opacity="0.5" />
    <ellipse cx="340" cy="150" rx="24" ry="8" fill="#fff" opacity="0.7" />
  </svg>
);

const PROJECTS = ["APP WAREHOUSE", "DESIGN STUDIO", "MISCELLANOUS"] as const;
const SOCIALS = [
  { href: "mailto:hello@feyisayo.com", icon: <GmailIcon />, label: "Email", color: "bg-red-500" },
  { href: "https://github.com", icon: <GithubIcon />, label: "GitHub", color: "bg-neutral-900" },
  { href: "https://linkedin.com", icon: <LinkedinIcon />, label: "LinkedIn", color: "bg-blue-600" },
] as const;

type ProjectsCardProps = {
  onMouseEnter: () => void;
  activeProject: string;
  setActiveProject: (p: string) => void;
};

export default function ProjectsCard({
  onMouseEnter,
  activeProject,
  setActiveProject,
}: ProjectsCardProps) {
  return (
    <div
      onMouseEnter={onMouseEnter}
      className="bg-white rounded-2xl p-7 flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-2xl"
      style={{ gridRow: "span 2" }}
    >
      <div className="flex justify-between items-center mb-5">
        <span className="text-sm font-medium text-text">Projects</span>
        <a
          href="#"
          className="text-lg text-text no-underline inline-block transition-transform duration-200 hover:translate-x-0.5 hover:-translate-y-0.5"
        >
          ↗
        </a>
      </div>

      <div
        className="w-full h-48 rounded-xl mb-4 overflow-hidden flex items-center justify-center"
        style={{ background: "linear-gradient(135deg, #d6d3ce 0%, #b8b5b0 100%)" }}
      >
        <InteriorSVG />
      </div>

      <div className="flex flex-col">
        {PROJECTS.map((p, i, arr) => (
          <div
            key={p}
            onClick={() => setActiveProject(p)}
            className={[
              "py-3.5 text-xs font-bold tracking-widest uppercase cursor-pointer transition-colors duration-200",
              activeProject === p
                ? "border-b-2 border-text text-text"
                : "text-text hover:text-neutral-500",
              i !== arr.length - 1 && activeProject !== p ? "border-b border-neutral-100" : "",
            ].join(" ")}
          >
            {p}
          </div>
        ))}
      </div>

      <div className="mt-auto pt-4">
        <div className="bg-stone-100 rounded-2xl px-6 py-5 flex items-center justify-around gap-2">
          {SOCIALS.map(({ href, icon, label, color }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-xs font-semibold text-text no-underline transition-opacity duration-200 hover:opacity-60"
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${color}`}>
                {icon}
              </div>
              {label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
