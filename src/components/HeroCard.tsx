import { useEffect, useState } from "react";

const WORDS = ["Developer,", "Engineer,"];
const TYPE_SPEED = 70;
const DELETE_SPEED = 45;
const PAUSE_AFTER_TYPE = 2200;
const PAUSE_AFTER_DELETE = 400;

const StarIcon = () => (
  <>
    <style>{`
      @keyframes spin {
        from { transform: rotate(0deg); }
        to   { transform: rotate(360deg); }
      }
      .star-wrap {
        display: inline-block;
      }
      .hero-card:hover .star-wrap {
        animation: spin 600ms cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
      }
    `}</style>
    <div className="star-wrap">
      <svg width="64" height="64" viewBox="0 0 56 56" fill="none">
        <path d="M28 0 L30 26 L56 28 L30 30 L28 56 L26 30 L0 28 L26 26 Z" fill="#ccc" />
      </svg>
    </div>
  </>
);

function useTypewriter(words: string[]) {
  const [display, setDisplay] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex];

    if (!isDeleting && display === current) {
      const pause = setTimeout(() => setIsDeleting(true), PAUSE_AFTER_TYPE);
      return () => clearTimeout(pause);
    }

    if (isDeleting && display === "") {
      const pause = setTimeout(() => {
        setIsDeleting(false);
        setWordIndex((i) => (i + 1) % words.length);
      }, PAUSE_AFTER_DELETE);
      return () => clearTimeout(pause);
    }

    const timeout = setTimeout(() => {
      setDisplay(isDeleting
        ? current.slice(0, display.length - 1)
        : current.slice(0, display.length + 1)
      );
    }, isDeleting ? DELETE_SPEED : TYPE_SPEED);

    return () => clearTimeout(timeout);
  }, [display, isDeleting, wordIndex, words]);

  return display;
}

type HeroCardProps = {
  style?: React.CSSProperties;
};

type Skill = { name: string; icon: string };

const skills: Skill[] = [
  { name: "React", icon: "/icons/reactjs.svg"},
  { name: "Next.js", icon: "/icons/nextjs.svg"},
  { name: "TypeScript", icon: "/icons/typescript.svg"},
  { name: "TailwindCSS", icon: "/icons/tailwindcss.svg"},
  { name: "Flutter", icon: "/icons/flutter.svg"},
  { name: "Vite", icon: "/icons/vitejs.svg"},
  { name: "Python", icon: "/icons/python.svg"},
  { name: "Figma", icon: "/icons/figma.svg"}
];

const SkillItem = ({ item }: { item: Skill }) => (
  <div className="flex items-center gap-1.5 text-text whitespace-nowrap">
    <img src={item.icon} alt="" className="w-8 h-8" />
    <p className="text-sm font-semibold">{item.name}</p>
  </div>
);

export default function HeroCard({ style }: HeroCardProps) {
  const word = useTypewriter(WORDS);

  return (
    <div
      className="hero-card w-full h-full bg-white rounded-2xl px-8 py-6 flex flex-col justify-between relative overflow-hidden group"
      style={style}
    >
      <div className="hidden md:block absolute top-10 right-12 pointer-events-none select-none">
        <StarIcon />
      </div>
      <div className="flex-1" />
      <h1 className="text-2xl sm:text-3xl lg:text-5xl font-semibold leading-tight text-text">
        Frontend &
        <br />
        Mobile{" "}
        <em className="italic font-light">
          {word}
          <span
            className="inline-block w-0.5 h-[0.85em] bg-neutral-400 ml-0.5 align-middle"
            style={{ animation: "blink 1s step-end infinite" }}
          />
        </em>
        <br />
        and AI Enthusiast
      </h1>

      <div className="mt-6 w-full overflow-hidden">
        <div className="flex w-max animate-scroll">
          {/* First Skill Set */}
          <div className="flex gap-8 pr-8"> 
            {skills.map((item, i) => (
              <SkillItem key={`a-${i}`} item={item} />
            ))}
          </div>

          {/* Second Skill Set (Identical) */}
          <div className="flex gap-8 pr-8">
            {skills.map((item, i) => (
              <SkillItem key={`b-${i}`} item={item} />
            ))}
          </div>
          
        </div>
      </div>

      <style>
        {`
          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }

          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }

          .animate-scroll {
            animation: scroll 25s linear infinite;
          }
        `}
      </style>
    </div>
  );
}