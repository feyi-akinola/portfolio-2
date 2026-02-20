import { useState } from "react";
import NavBar from "./components/NavBar";
import HeroCard from "./components/HeroCard";
import PhotoCard from "./components/PhotoCard";
import ProjectsCard from "./components/ProjectsCard";
import BioCard from "./components/BioCard";
import ContactCard from "./components/ContactCard";

type HoverCard = "hero" | "photo" | "projects" | "bio" | "contact" | null;

function getGridColumns(hovered: HoverCard) {
  // 4 cols: [hero-main | hero-secondary | photo/contact | projects]
  // hero spans cols 1-2, bio spans col 1 only (~80% of hero width)
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

      <div
        className="grid gap-3 flex-1"
        onMouseLeave={() => setHovered(null)}
        style={{
          gridTemplateColumns: getGridColumns(hovered),
          gridTemplateRows: "3fr 2fr",
          transition: "grid-template-columns 260ms cubic-bezier(.2,.8,.2,1)",
        }}
      >
        {/* Hero spans cols 1-2 */}
        <HeroCard
          style={{ gridColumn: "1 / 3", gridRow: 1 }}
        />

        {/* Photo sits in col 3, row 1 */}
        <PhotoCard
          style={{ gridColumn: 3, gridRow: 1, backgroundImage: "" }}
        />

        {/* Projects spans both rows in col 4 */}
        <ProjectsCard
          style={{ gridColumn: 4, gridRow: "1 / 3" }}
        />

        {/* Bio spans col 1 only — naturally ~80% of hero's width */}
        <BioCard
          style={{ gridColumn: 1, gridRow: 2 }}
        />

        {/* Contact spans cols 2-3 — fills the remaining bottom space */}
        <ContactCard
          style={{ gridColumn: "2 / 4", gridRow: 2 }}
        />
      </div>

      <p className="text-center text-white/25 text-xs py-3 tracking-wide">
        Made by Feyisayo with {"<3"}
      </p>
    </div>
  );
}