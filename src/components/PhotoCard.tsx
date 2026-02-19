type PhotoCardProps = {
  onMouseEnter: () => void;
  style?: React.CSSProperties;
};

export default function PhotoCard({ onMouseEnter, style }: PhotoCardProps) {
  return (
    <div
      onMouseEnter={onMouseEnter}
      className="bg-neutral-500 rounded-2xl flex items-center justify-center text-xs text-white/40 tracking-widest uppercase transition-shadow duration-300 hover:shadow-2xl"
      style={style}
    >
      Your Photo
    </div>
  );
}
