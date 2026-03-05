import { useEffect, useRef, useState } from "react";

type ContactCardProps = {
  style?: React.CSSProperties;
};

export default function ContactCard({ style }: ContactCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const tooltipRef = useRef<HTMLParagraphElement>(null);
  const [isToolTipShowing, setIsToolTipShowing] = useState(false);
  const [hasCopiedEmail, setHasCopiedEmail] = useState(false);

  // LERP state
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const raf = useRef<number | null>(null);

  // Animation loop
  useEffect(() => {
    const animate = () => {
      const tooltip = tooltipRef.current;
      if (!tooltip) return;

      const speed = 0.12;

      current.current.x += (target.current.x - current.current.x) * speed;
      current.current.y += (target.current.y - current.current.y) * speed;

      tooltip.style.transform
        = `translate(${current.current.x - 16}px, ${current.current.y - 10}px)`;

      raf.current = requestAnimationFrame(animate);
    };

    raf.current = requestAnimationFrame(animate);

    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  // Mouse move updates target
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const onMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      target.current.x = e.clientX - rect.left;
      target.current.y = e.clientY - rect.top;
    };

    card.addEventListener("mousemove", onMove);
    return () => card.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      ref={cardRef}
      className="relative w-full h-full bg-stone-200 rounded-2xl px-9 py-8
        flex flex-col justify-between cursor-pointer group"
      style={style}
      onClick={async () => {
        await navigator.clipboard.writeText("feyi.akinola.3005@gmail.com");
        setHasCopiedEmail(true);
      }}
      onMouseEnter={() => setIsToolTipShowing(true)}
      onMouseLeave={() => setIsToolTipShowing(false)}
    >
      <div className="flex justify-between items-start text-xl font-medium
        text-text">
        Have any questions?
        <span className="text-2xl text-text inline-block">↗</span>
      </div>

      <div className="mt-12 lg:mt-auto text-4xl font-regular text-text">
        Contact me
      </div>

      <p className="absolute -bottom-12 -right-4 text-black/5 text-[180px]
        group-hover:animate-pulse">
        @
      </p>

      <div
        ref={tooltipRef}
        style={{ opacity: isToolTipShowing ? 1 : 0 }}
        className={`absolute text-black/80 text-sm font-semibold rounded-xl
          rounded-tl-xs px-4 py-2 ring-2 pointer-events-none transition-opacity
          duration-150
          ${!hasCopiedEmail ? "ring-black bg-white" : "ring-green-700 bg-green-100 text-green-700"}`}
      >
        {!hasCopiedEmail ? "Click to copy email" : "Email copied to clipboard!"}
      </div>
    </section>
  );
}