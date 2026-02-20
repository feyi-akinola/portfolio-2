type PhotoCardProps = {
  style?: React.CSSProperties;
};

export default function PhotoCard({ style }: PhotoCardProps) {
  return (
    <div
      className="bg-neutral-500 rounded-2xl hover:shadow-2xl"
      style={style}
    >
      <img
        src="/images/me.png"
        alt="Feyisayo Akinola"
        className="w-full h-full object-cover rounded-2xl"
        style={{
          filter: "grayscale(100%)",
          transition: "filter 300ms ease",
        }}
        onMouseEnter={e => (e.currentTarget.style.filter = "grayscale(0%)")}
        onMouseLeave={e => (e.currentTarget.style.filter = "grayscale(100%)")}
      />
    </div>
  );
}
