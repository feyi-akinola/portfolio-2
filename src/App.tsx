import { useState } from "react";
import NavBar from "./components/NavBar";
import HeroCard from "./components/HeroCard";
import PhotoCard from "./components/PhotoCard";
import ProjectsCard from "./components/ProjectsCard";
import BioCard from "./components/BioCard";
import ContactCard from "./components/ContactCard";

type HoverCard = "hero" | "photo" | "projects" | "bio" | "contact" | null;

function getGridColumns(hovered: HoverCard) {
  switch (hovered) {
    case "hero":     return "1fr 0.15fr 0.6fr 0.75fr";
    case "photo":    return "0.9fr 0.15fr 0.7fr 0.75fr";
    case "projects": return "0.9fr 0.15fr 0.6fr 0.82fr";
    case "bio":      return "1.1fr 0.15fr 0.6fr 0.75fr";
    case "contact":  return "0.9fr 0.15fr 0.7fr 0.75fr";
    default:         return "1fr 0.15fr 0.62fr 0.75fr";
  }
}

export default function Portfolio() {
  const [hovered, setHovered] = useState<HoverCard>(null);

  return (
    <div className="bg-black min-h-screen p-4 flex flex-col gap-4">
      <NavBar />

      {/* ── Mobile: single column stack ── */}
      <div className="flex flex-col gap-3 flex-1 md:hidden">
        <HeroCard />
        <PhotoCard style={{ backgroundImage: "" }} />
        <BioCard />
        <ContactCard />
        <ProjectsCard />
      </div>

      {/* ── Tablet: 2-column grid, projects pinned to bottom row spanning full width ── */}
      <div className="hidden md:grid xl:hidden gap-3 flex-1"
        style={{
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "auto auto auto",
        }}
      >
        {/* Row 1 */}
        <HeroCard style={{ gridColumn: "1 / 3", gridRow: 1 }} />
        {/* Row 2 */}
        <PhotoCard style={{ gridColumn: 1, gridRow: 2, backgroundImage: "" }} />
        <BioCard style={{ gridColumn: 2, gridRow: 2 }} />
        {/* Row 3 */}
        <ContactCard style={{ gridColumn: "1 / 3", gridRow: 3 }} />
        {/* Projects at bottom, spanning full width */}
        <ProjectsCard style={{ gridColumn: "1 / 3", gridRow: 4 }} />
      </div>

      {/* ── Desktop: original dynamic hover grid ── */}
      <div
        className="hidden xl:grid gap-3 flex-1"
        onMouseLeave={() => setHovered(null)}
        style={{
          gridTemplateColumns: getGridColumns(hovered),
          gridTemplateRows: "3fr 2fr",
          transition: "grid-template-columns 260ms cubic-bezier(.2,.8,.2,1)",
        }}
      >
        <HeroCard style={{ gridColumn: "1 / 3", gridRow: 1 }} />
        <PhotoCard style={{ gridColumn: 3, gridRow: 1, backgroundImage: "" }} />
        <ProjectsCard style={{ gridColumn: 4, gridRow: "1 / 3" }} />
        <BioCard style={{ gridColumn: 1, gridRow: 2 }} />
        <ContactCard style={{ gridColumn: "2 / 4", gridRow: 2 }} />
      </div>

      <p className="text-center text-white/25 text-xs py-3 tracking-wide">
        Made by Feyisayo with {"<3"}
      </p>
    </div>
  );
}