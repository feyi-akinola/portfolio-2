import { useEffect, useRef, useState } from "react";

type ContactCardProps = {
  style?: React.CSSProperties;
};

export default function ContactCard({ style }: ContactCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const tooltipRef = useRef<HTMLParagraphElement>(null);
  const [isToolTipShowing, setIsToolTipShowing] = useState(false);
  const [hasCopiedEmail, setHasCopiedEmail] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    const tooltip = tooltipRef.current;

    if (!card || !tooltip) return;

    const move = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // tooltip.style.transform = `translate(${x}px, ${y}px)`;
      tooltip.style.transform = `translate(${x - 16}px, ${y - 10}px)`;
    };

    card.addEventListener("mousemove", move);

    return () => card.removeEventListener("mousemove", move);
  }, []);

  return (
    <section
      ref={cardRef}
      className="relative w-full h-full bg-stone-200 rounded-2xl px-9
        py-8 flex flex-col justify-between cursor-pointer group
        overflow-hidden"
      style={style}
      // href="mailto:email.com"
      onClick={async () => {
        await navigator.clipboard.writeText("feyi.akinola.3005@gmail.com");
        setHasCopiedEmail(true);
      }}
      onMouseEnter={(_) => setIsToolTipShowing(true)}
      onMouseLeave={(_) => setIsToolTipShowing(false)}
    >
      <div className="flex justify-between items-start text-xl font-medium text-text">
        Have any questions?
        <span
          className="text-2xl text-text inline-block"
        >
          ↗
        </span>
      </div>

      <div className="mt-12 lg:mt-auto text-4xl font-regular text-text">
        Contact me
      </div>

      <p className="absolute -bottom-12 -right-4 text-black/5 text-[180px] group-hover:animate-pulse">
        @
      </p>

      <div
        ref={tooltipRef}
        className={`${!isToolTipShowing ? "hidden" : "absolute"} text-black/80 text-sm
        font-semibold rounded-xl rounded-tl-xs px-4 py-2 ring-2 pointer-events-none z-3
        ${ !hasCopiedEmail ? "ring-black bg-white" : "ring-green-700 bg-green-100 text-green-700" }`}
      >
        { 
          !hasCopiedEmail
            ? "Click to copy email"
            : "Email copied to clipboard!"
        }
      </div>
    </section>
  );
}