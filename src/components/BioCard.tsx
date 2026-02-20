const BIO_TEXT =
  "I'm a frontend engineer with 2+ years of experience building production web applications using React, Next.js, and TypeScript. I currently work in a startup environment where I own frontend features end-to-end, from UI architecture and state management to API integration, performance optimization, and deployment.";

type BioCardProps = {
  style?: React.CSSProperties;
};

export default function BioCard({ style }: BioCardProps) {
  return (
    <div
      className="bg-white rounded-2xl px-9 py-8 flex items-center cursor-pointer group"
      style={style}
    >
      <p className="text-md font-regular leading-relaxed text-neutral-500 whitespace-normal group-hover:text-black transition-colors duration-300">{BIO_TEXT}</p>
    </div>
  );
}
