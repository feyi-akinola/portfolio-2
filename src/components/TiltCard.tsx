import React, { useRef, useState } from 'react';

type TiltLevel = "medium" | "high";

export default function TiltCard(
  { style, tiltLevel = "high", children } : { style: React.CSSProperties, tiltLevel?: TiltLevel,  children: React.ReactNode }
) {
  const [transformStyle, setTransformStyle] = useState<string>(`
    perspective(700px)
    rotateX(0deg)
    rotateY(0deg)
    scale3d(1, 1, 1)
  `);

  const ref: any = useRef(undefined);

  const handleMouseMove = (e: any) => {
    if (!ref.current) return;

    const { left, top, width, height } = ref?.current?.getBoundingClientRect();

    const relativeX = (e.clientX - left) / width;
    const relativeY = (e.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * (tiltLevel === "high" ? 10 : 4);
    const tiltY = (relativeX - 0.5) * (tiltLevel === "high" ? -10 : -4);

    const newTransform = `perspective(700px)
      rotateX(${tiltX}deg)
      rotateY(${tiltY}deg)
      scale3d(0.965, 0.965, 0.965)`;

    setTransformStyle(newTransform);
  }

  const handleMouseLeave = () => {
    setTransformStyle(`
      perspective(700px)
      rotateX(0deg)
      rotateY(0deg)
      scale3d(1, 1, 1)
    `);
  }

  return (
    <div
      style={{
        transform: transformStyle,
        transition: "transform 1000ms cubic-bezier(0.22, 1, 0.36, 1)",
        ...style,
      }}
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  )
};