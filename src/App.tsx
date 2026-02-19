import { useState, useRef, useEffect } from "react";
import NavBar from "./components/NavBar";
import HeroCard from "./components/HeroCard";
import PhotoCard from "./components/PhotoCard";
import ProjectsCard from "./components/ProjectsCard";
import BioCard from "./components/BioCard";
import ContactCard from "./components/ContactCard";

type TopHoverCard = "hero" | "photo" | "projects" | null;
type BottomHoverCard = "bio" | "contact" | null;

function getTopGridColumns(hovered: TopHoverCard) {
  switch (hovered) {
    case "hero":
      return "1.04fr 0.63fr 0.74fr";
    case "photo":
      return "0.96fr 0.68fr 0.74fr";
    case "projects":
      return "0.96fr 0.63fr 0.78fr";
    default:
      return "1fr 0.65fr 0.75fr";
  }
}

function getBottomGridColumns(hovered: BottomHoverCard) {
  switch (hovered) {
    case "bio":
      return "1.05fr 0.95fr";
    case "contact":
      return "0.95fr 1.05fr";
    default:
      return "1fr 1fr";
  }
}

export default function Portfolio() {
  const [activeProject, setActiveProject] = useState("APP WAREHOUSE");
  const [hoveredTop, setHoveredTop] = useState<TopHoverCard>(null);
  const [hoveredBottom, setHoveredBottom] = useState<BottomHoverCard>(null);
  const bioCardRef = useRef<HTMLDivElement>(null);
  const [bioCardHeight, setBioCardHeight] = useState<number | null>(null);

  useEffect(() => {
    if (bioCardRef.current && bioCardHeight === null) {
      setBioCardHeight(bioCardRef.current.offsetHeight);
    }
  }, [bioCardHeight]);

  return (
    <div className="bg-neutral-900 min-h-screen p-4 flex flex-col gap-4">
      <NavBar />

      <div
        className="grid gap-3 flex-1"
        onMouseLeave={() => setHoveredTop(null)}
        style={{
          gridTemplateColumns: getTopGridColumns(hoveredTop),
          gridTemplateRows: "auto 1fr",
          transition: "grid-template-columns 260ms cubic-bezier(.2,.8,.2,1)",
        }}
      >
        <HeroCard
          onMouseEnter={() => setHoveredTop("hero")}
          style={bioCardHeight ? { height: `${bioCardHeight}px` } : undefined}
        />
        <PhotoCard
          onMouseEnter={() => setHoveredTop("photo")}
          style={bioCardHeight ? { height: `${bioCardHeight}px` } : undefined}
        />
        <ProjectsCard
          onMouseEnter={() => setHoveredTop("projects")}
          activeProject={activeProject}
          setActiveProject={setActiveProject}
        />

        <div
          className="grid gap-3 items-stretch"
          onMouseLeave={() => setHoveredBottom(null)}
          style={{
            gridColumn: "1 / 3",
            gridTemplateColumns: getBottomGridColumns(hoveredBottom),
            transition: "grid-template-columns 260ms cubic-bezier(.2,.8,.2,1)",
            ...(bioCardHeight != null && { height: "384px" }),
          }}
        >
          <BioCard
            onMouseEnter={() => setHoveredBottom("bio")}
            cardRef={bioCardRef}
            style={bioCardHeight != null ? { height: "384px" } : undefined}
          />
          <ContactCard
            onMouseEnter={() => setHoveredBottom("contact")}
            style={bioCardHeight != null ? { height: "384px" } : undefined}
          />
        </div>
      </div>

      <p className="text-center text-white/25 text-xs py-3 tracking-wide">
        Lorem Ipsum © 2023 All Rights Reserved.
      </p>
    </div>
  );
}
