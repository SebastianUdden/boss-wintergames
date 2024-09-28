export const Pistol = ({ facing = "left" }: { facing?: "left" | "right" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 500 200"
    width="100"
    height="100"
    style={{
      transform: facing === "right" ? "scaleX(-1)" : "scaleX(1)", // Flip for right-facing
    }}
  >
    {/* Barrel */}
    <rect x="200" y="80" width="250" height="30" fill="grey" />
    {/* Cylinder */}
    <circle cx="200" cy="95" r="25" fill="lightgrey" />
    {/* Trigger guard */}
    <path d="M180 120 Q175 135 185 135 Q195 135 190 120 Z" fill="grey" />
    {/* Trigger */}
    <path d="M180 120 Q185 130 190 120" fill="black" />
    {/* Grip */}
    <path
      d="M150 80 Q140 100 140 140 Q140 170 160 170 Q180 170 180 140 Q180 100 170 80 Z"
      fill="brown"
    />
    {/* Hammer */}
    <rect x="165" y="60" width="10" height="20" fill="grey" />
  </svg>
);
