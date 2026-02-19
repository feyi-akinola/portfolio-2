type ContactCardProps = {
  onMouseEnter: () => void;
  style?: React.CSSProperties;
};

export default function ContactCard({ onMouseEnter, style }: ContactCardProps) {
  return (
    <div
      onMouseEnter={onMouseEnter}
      className="bg-stone-200 rounded-2xl px-9 py-8 flex flex-col justify-between cursor-pointer transition-shadow duration-300 hover:shadow-2xl"
      style={style}
    >
      <div className="flex justify-between items-start text-sm font-medium text-neutral-500">
        Have any questions?
        <a
          href="#"
          className="text-lg text-text no-underline inline-block transition-transform duration-200 hover:translate-x-0.5 hover:-translate-y-0.5"
        >
          ↗
        </a>
      </div>
      <div
        className="mt-auto font-semibold text-text"
        style={{ fontSize: "clamp(22px, 2.5vw, 32px)" }}
      >
        Contact me
      </div>
    </div>
  );
}
