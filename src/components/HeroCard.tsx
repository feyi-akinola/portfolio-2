const StarIcon = () => (
  <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
    <path d="M28 0 L30 26 L56 28 L30 30 L28 56 L26 30 L0 28 L26 26 Z" fill="#ccc" />
  </svg>
);

type HeroCardProps = {
  onMouseEnter: () => void;
  style?: React.CSSProperties;
};

export default function HeroCard({ onMouseEnter, style }: HeroCardProps) {
  return (
    <div
      onMouseEnter={onMouseEnter}
      className="bg-white rounded-2xl p-10 flex flex-col justify-between relative overflow-hidden transition-shadow duration-300 hover:shadow-2xl"
      style={style}
    >
      <div className="absolute top-10 right-12 pointer-events-none select-none">
        <StarIcon />
      </div>
      <div className="flex-1" />
      <h1
        className="font-bold leading-tight text-text"
        style={{ fontSize: "clamp(28px, 3.2vw, 42px)", lineHeight: 1.12 }}
      >
        Frontend and
        <br />
        Mobile <em className="italic font-normal">Developer,</em>
        <br />
        and AI Enthusiast
      </h1>
    </div>
  );
}
