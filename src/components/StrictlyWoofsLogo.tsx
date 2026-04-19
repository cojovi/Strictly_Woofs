import React from "react";

const SHORT_LOGO_SRC = "/strictly_logo_short1.png";

interface StrictlyWoofsLogoProps {
  width?: number;
  height?: number;
  size?: string;
  className?: string;
}

const StrictlyWoofsLogo: React.FC<StrictlyWoofsLogoProps> = ({
  width = 150,
  height = 40,
  size,
  className = "",
}) => {
  const sizeClass = size || "";

  return (
    <div
      className={`flex items-center justify-center ${sizeClass} ${className}`}
    >
      <img
        src={SHORT_LOGO_SRC}
        alt="Strictly Woofs"
        width={width}
        height={height}
        decoding="async"
        className={
          sizeClass
            ? "h-full w-auto max-w-full object-contain object-center"
            : "object-contain"
        }
        style={sizeClass ? undefined : { width, height }}
      />
    </div>
  );
};

export default StrictlyWoofsLogo;
