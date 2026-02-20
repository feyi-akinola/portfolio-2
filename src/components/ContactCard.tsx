type ContactCardProps = {
  style?: React.CSSProperties;
};

export default function ContactCard({ style }: ContactCardProps) {
  return (
    <div
      className="bg-stone-200 rounded-2xl px-9 py-8 flex flex-col justify-between cursor-pointer group"
      style={style}
    >
      <div className="flex justify-between items-start text-xl font-medium text-text">
        Have any questions?
        <a
          href="#"
          className="text-2xl text-text no-underline inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        >
          ↗
        </a>
      </div>
      <div
        className="mt-auto text-4xl font-regular text-text"
      >
        Contact me
      </div>
    </div>
  );
}
