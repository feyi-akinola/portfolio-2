import { useState } from "react";
import NavBar from "./components/NavBar";
import HeroCard from "./components/HeroCard";
import PhotoCard from "./components/PhotoCard";
import ProjectsCard from "./components/ProjectsCard";
import BioCard from "./components/BioCard";
import ContactCard from "./components/ContactCard";
import TiltCard from "./components/TiltCard";

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
    <div className="bg-black min-h-screen flex items-center">
      <div className="max-w-[1400px] max-h-[840px] mx-auto p-4 flex flex-col gap-4">
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
        <div className="hidden sm:grid lg:hidden gap-2 flex-1"
          style={{
            gridTemplateColumns: "1fr 1fr",
            gridTemplateRows: "auto auto auto",
          }}
        >
          {/* Row 1 */}
          <TiltCard style={{ gridColumn: "1 / 2", gridRow: 1 }}>
            <HeroCard />
          </TiltCard>
          
          <TiltCard style={{ gridColumn: 1, gridRow: 2, backgroundImage: "" }}>
            <BioCard />
          </TiltCard>

          {/* Row 2 */}
          <TiltCard style={{ gridColumn: "2 / 3", gridRow: 1 }}>
            <ContactCard />
          </TiltCard>

          <TiltCard style={{ gridColumn: 2, gridRow: 2, backgroundImage: "" }}>
            <PhotoCard />
          </TiltCard>

          {/* Projects at bottom, spanning full width */}
          <TiltCard style={{ gridColumn: "1 / 3", gridRow: 4 }} tiltLevel="medium">
            <ProjectsCard />
          </TiltCard>
        </div>

        {/* ── Desktop: original dynamic hover grid ── */}
        <div
          className="hidden lg:grid gap-2  flex-1"
          onMouseLeave={() => setHovered(null)}
          style={{
            gridTemplateColumns: getGridColumns(hovered),
            gridTemplateRows: "5fr 3fr",
            transition: "grid-template-columns 260ms cubic-bezier(.2,.8,.2,1)",
          }}
        >
          <TiltCard style={{ gridColumn: "1 / 3", gridRow: 1 }}>
            <HeroCard />
          </TiltCard>

          <TiltCard style={{ gridColumn: 3, gridRow: 1, backgroundImage: "" }}>
            <PhotoCard  />
          </TiltCard>

          <TiltCard style={{ gridColumn: 1, gridRow: 2 }}>
            <BioCard />
          </TiltCard>

          <TiltCard style={{ gridColumn: "2 / 4", gridRow: 2 }}>
            <ContactCard />
          </TiltCard>

          <TiltCard
            style={{ gridColumn: 4, gridRow: "1 / 3" }}
            tiltLevel="medium"
          >
            <ProjectsCard />
          </TiltCard>
        </div>

        <p className="text-center text-white/25 text-xs py-1 tracking-wide">
          Made by Feyisayo with {"<3"}
        </p>
      </div>
    </div>
  );
}