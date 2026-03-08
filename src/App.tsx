import NavBar from "./components/NavBar";
import HeroCard from "./components/HeroCard";
import PhotoCard from "./components/PhotoCard";
import ProjectsCard from "./components/ProjectsCard";
import BioCard from "./components/BioCard";
import ContactCard from "./components/ContactCard";
import TiltCard from "./components/TiltCard";

export default function Portfolio() {
  return (
    <div className="bg-black min-h-screen flex items-center">
      <div className="max-w-[1380px] mx-auto p-4 flex flex-col gap-4">
        <NavBar />

        {/* ── Mobile: single column stack ── */}
        <div className="flex flex-col gap-3 flex-1 sm:hidden">
          <HeroCard />
          <PhotoCard style={{ backgroundImage: "" }} />
          <BioCard />
          <ContactCard />
          <ProjectsCard />
        </div>

        {/* ── Tablet: 2-column grid, projects pinned to bottom row spanning full width ── */}
        <div
          className="hidden sm:grid lg:hidden gap-2 flex-1"
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
          className="hidden lg:grid gap-2 flex-1"
          style={{
            gridTemplateColumns: "1fr 0.15fr 0.72fr 0.7fr",
            gridTemplateRows: "6.3fr 3.7fr",
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