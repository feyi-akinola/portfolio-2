const BIO_TEXT =
  "I'm a frontend engineer with 2+ years of experience building production web applications using React, Next.js, and TypeScript. I currently work in a startup environment where I own frontend features end-to-end, from UI architecture and state management to API integration, performance optimization, and deployment.";

type BioCardProps = {
  style?: React.CSSProperties;
};

export default function BioCard({ style }: BioCardProps) {
  return (
    <div
      className="bg-white rounded-2xl px-9 py-8 flex items-center transition-shadow duration-300 hover:shadow-2xl"
      style={style}
    >
      <p className="text-md font-regular leading-relaxed text-neutral-500 whitespace-normal">{BIO_TEXT}</p>
    </div>
  );
}
