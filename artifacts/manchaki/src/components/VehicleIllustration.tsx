const B = "#0B2447";   // dark navy body
const B2 = "#0d3060";  // slightly lighter panel
const B3 = "#162d5e";  // highlight stripe
const GL = "#b8d8f0";  // glass/window
const GL2 = "#d6eaf8"; // lighter glass
const TI = "#111111";  // tyre
const RI = "#777777";  // rim
const WH = "#FFFFFF";  // white text
const YL = "#F7B500";  // yellow accent
const RD = "#CC0000";  // learner red

function Wheel({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  const spokes = [0, 51, 102, 153, 204, 255, 306];
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={TI} />
      <circle cx={cx} cy={cy} r={r * 0.68} fill="#222" />
      <circle cx={cx} cy={cy} r={r * 0.44} fill={RI} />
      {spokes.map((a) => (
        <line
          key={a}
          x1={cx + r * 0.18 * Math.cos((a * Math.PI) / 180)}
          y1={cy + r * 0.18 * Math.sin((a * Math.PI) / 180)}
          x2={cx + r * 0.62 * Math.cos((a * Math.PI) / 180)}
          y2={cy + r * 0.62 * Math.sin((a * Math.PI) / 180)}
          stroke={RI}
          strokeWidth={2.2}
        />
      ))}
      <circle cx={cx} cy={cy} r={r * 0.13} fill="#555" />
    </g>
  );
}

function LSt({ x, y, s = 22 }: { x: number; y: number; s?: number }) {
  return (
    <g>
      <rect x={x} y={y} width={s} height={s} fill={RD} rx={3} />
      <rect x={x + 2} y={y + 2} width={s - 4} height={s - 4} fill="none" stroke={WH} strokeWidth={1.5} rx={2} />
      <text x={x + s / 2} y={y + s * 0.79} fill={WH} fontSize={s * 0.66} fontFamily="Arial Black, Arial" fontWeight="900" textAnchor="middle">L</text>
    </g>
  );
}

function BrandSide({ x, y, w }: { x: number; y: number; w: number }) {
  return (
    <>
      <text x={x + w / 2} y={y} fill={WH} fontSize={9} fontFamily="Arial, sans-serif" fontWeight="bold" textAnchor="middle" letterSpacing="0.4">MANCHAKI TECHNICAL TRAINING INSTITUTE</text>
      <text x={x + w / 2} y={y + 13} fill={YL} fontSize={8} fontFamily="Arial, sans-serif" fontWeight="bold" textAnchor="middle" letterSpacing="0.3">&amp; DRIVING SCHOOL</text>
    </>
  );
}

function BonnetText({ x, y, angle = 0 }: { x: number; y: number; angle?: number }) {
  return (
    <text
      x={x} y={y} fill={WH} fontSize={7.5} fontFamily="Arial, sans-serif" fontWeight="bold"
      textAnchor="middle" transform={`rotate(${angle},${x},${y})`}
    >
      MANCHAKI
    </text>
  );
}

/* ───────────────── CAR (B1 / B2) ───────────────── */
export function CarSVG() {
  const fwx = 108; const rwx = 388; const wy = 162; const wr = 31;
  return (
    <svg viewBox="0 0 500 195" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect x={76} y={143} width={350} height={10} rx={3} fill="#071830" />
      {/* Body */}
      <path d="M 52,142 L 52,122 C 62,96 94,70 148,64 L 168,44 L 334,44 L 354,64 C 408,70 440,96 450,122 L 450,142 Z" fill={B} />
      {/* Roof */}
      <path d="M 148,64 L 168,44 L 334,44 L 354,64 Z" fill={B2} />
      {/* Window strip */}
      <rect x={168} y={45} width={166} height={17} rx={2} fill={GL} opacity={0.9} />
      {/* Front windshield */}
      <path d="M 148,64 L 168,44 L 168,62 Z" fill={GL} opacity={0.8} />
      {/* Rear windshield */}
      <path d="M 354,64 L 334,44 L 334,62 Z" fill={GL} opacity={0.8} />
      {/* Window dividers */}
      <line x1={248} y1={44} x2={248} y2={62} stroke={B} strokeWidth={2.5} />
      {/* Body crease line */}
      <path d="M 64,112 C 150,104 360,104 440,112" stroke={B3} strokeWidth={2} fill="none" opacity={0.7} />
      {/* Side branding */}
      <BrandSide x={155} y={118} w={196} />
      {/* Bonnet text */}
      <BonnetText x={96} y={98} angle={-8} />
      {/* Headlight */}
      <ellipse cx={58} cy={126} rx={9} ry={7} fill="#FFE98A" />
      <ellipse cx={58} cy={126} rx={6} ry={4} fill={WH} opacity={0.6} />
      {/* Tail light */}
      <rect x={440} y={118} width={10} height={16} rx={2} fill="#BB0000" />
      <rect x={441} y={119} width={4} height={14} rx={1} fill="#FF4444" opacity={0.7} />
      {/* Front bumper grill */}
      <rect x={50} y={132} width={14} height={9} rx={2} fill={B3} />
      {[134, 137, 140].map((y) => <line key={y} x1={51} y1={y} x2={63} y2={y} stroke="#1e4f8c" strokeWidth={1} />)}
      {/* Door line */}
      <line x1={248} y1={63} x2={248} y2={142} stroke={B2} strokeWidth={1.5} />
      {/* L sticker roof */}
      <LSt x={320} y={35} s={23} />
      {/* L sticker rear */}
      <LSt x={432} y={118} s={16} />
      {/* Wheels */}
      <Wheel cx={fwx} cy={wy} r={wr} />
      <Wheel cx={rwx} cy={wy} r={wr} />
      {/* Wheel arches */}
      <path d={`M ${fwx - wr - 8},143 A ${wr + 10} ${wr + 10} 0 0 1 ${fwx + wr + 8},143`} fill="none" stroke={B} strokeWidth={6} />
      <path d={`M ${rwx - wr - 8},143 A ${wr + 10} ${wr + 10} 0 0 1 ${rwx + wr + 8},143`} fill="none" stroke={B} strokeWidth={6} />
    </svg>
  );
}

/* ───────────────── TUK TUK (A3) ───────────────── */
export function TukTukSVG() {
  return (
    <svg viewBox="0 0 400 195" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect x={60} y={143} width={280} height={10} rx={3} fill="#071830" />
      {/* Body */}
      <path d="M 58,142 L 58,78 L 80,55 L 305,55 L 320,72 L 340,72 L 340,142 Z" fill={B} />
      {/* Roof */}
      <path d="M 80,55 L 305,55 L 305,72 L 80,72 Z" fill={B2} />
      {/* Side roof strut */}
      <line x1={80} y1={55} x2={58} y2={78} stroke={B3} strokeWidth={3} />
      {/* Windshield */}
      <path d="M 58,78 L 80,55 L 80,72 Z" fill={GL} opacity={0.8} />
      {/* Side windows */}
      <rect x={82} y={56} width={70} height={14} rx={2} fill={GL} opacity={0.9} />
      <rect x={156} y={56} width={70} height={14} rx={2} fill={GL} opacity={0.9} />
      {/* Cargo/passenger area back */}
      <rect x={230} y={74} width={75} height={66} rx={2} fill={B3} opacity={0.5} />
      {/* Side branding */}
      <text x={192} y={108} fill={WH} fontSize={8.5} fontFamily="Arial, sans-serif" fontWeight="bold" textAnchor="middle">MANCHAKI TECH TRAINING</text>
      <text x={192} y={121} fill={YL} fontSize={7.5} fontFamily="Arial, sans-serif" fontWeight="bold" textAnchor="middle">&amp; DRIVING SCHOOL</text>
      {/* Front panel / bonnet */}
      <BonnetText x={66} y={100} angle={-90} />
      {/* Headlight */}
      <ellipse cx={58} cy={90} rx={7} ry={5} fill="#FFE98A" />
      {/* Tail light */}
      <rect x={332} y={85} width={8} height={12} rx={2} fill="#BB0000" />
      {/* Front wheel (single) */}
      <Wheel cx={115} cy={162} r={27} />
      {/* Rear wheels */}
      <Wheel cx={295} cy={162} r={28} />
      {/* L sticker */}
      <LSt x={286} y={46} s={22} />
      <LSt x={324} y={84} s={15} />
      {/* Wheel arches */}
      <path d="M 88,143 A 35 35 0 0 1 142,143" fill="none" stroke={B} strokeWidth={6} />
      <path d="M 267,143 A 36 36 0 0 1 323,143" fill="none" stroke={B} strokeWidth={6} />
    </svg>
  );
}

/* ───────────────── LIGHT TRUCK (C1) ───────────────── */
export function LightTruckSVG() {
  const fwx = 108; const rwx = 388; const wy = 163; const wr = 32;
  return (
    <svg viewBox="0 0 510 195" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect x={76} y={145} width={360} height={10} rx={3} fill="#071830" />
      {/* Cab */}
      <path d="M 52,144 L 52,118 C 58,96 78,72 118,68 L 138,48 L 245,48 L 245,144 Z" fill={B} />
      {/* Cab roof */}
      <path d="M 118,68 L 138,48 L 245,48 L 245,68 Z" fill={B2} />
      {/* Windshield */}
      <path d="M 118,68 L 138,48 L 150,48 L 150,68 Z" fill={GL} opacity={0.85} />
      <rect x={151} y={49} width={93} height={18} rx={2} fill={GL} opacity={0.9} />
      {/* Cab window divider */}
      <line x1={200} y1={48} x2={200} y2={68} stroke={B} strokeWidth={2} />
      {/* Pickup bed */}
      <rect x={246} y={78} width={210} height={65} rx={3} fill={B2} />
      <rect x={248} y={80} width={206} height={61} rx={2} fill={B3} />
      {/* Bed rails */}
      <rect x={246} y={75} width={210} height={6} rx={2} fill={B} />
      <line x1={350} y1={81} x2={350} y2={141} stroke={B} strokeWidth={2} />
      {/* Bed floor */}
      <rect x={249} y={136} width={204} height={5} fill={B} />
      {/* Side branding on cab */}
      <text x={148} y={106} fill={WH} fontSize={8} fontFamily="Arial, sans-serif" fontWeight="bold" textAnchor="middle">MANCHAKI</text>
      <text x={148} y={118} fill={YL} fontSize={7} fontFamily="Arial, sans-serif" fontWeight="bold" textAnchor="middle">TECH TRAINING</text>
      {/* Bed side text */}
      <text x={351} y={112} fill={WH} fontSize={8.5} fontFamily="Arial, sans-serif" fontWeight="bold" textAnchor="middle">MANCHAKI TECHNICAL</text>
      <text x={351} y={124} fill={YL} fontSize={7.5} fontFamily="Arial, sans-serif" fontWeight="bold" textAnchor="middle">TRAINING INSTITUTE</text>
      {/* Bonnet text */}
      <BonnetText x={82} y={100} angle={-10} />
      {/* Headlight */}
      <ellipse cx={57} cy={124} rx={8} ry={6} fill="#FFE98A" />
      {/* Tail light */}
      <rect x={450} y={118} width={8} height={18} rx={2} fill="#BB0000" />
      {/* Front bumper */}
      <rect x={50} y={135} width={12} height={8} rx={2} fill={B3} />
      {/* L stickers */}
      <LSt x={232} y={39} s={22} />
      <LSt x={440} y={78} s={18} />
      {/* Wheels */}
      <Wheel cx={fwx} cy={wy} r={wr} />
      <Wheel cx={rwx} cy={wy} r={wr} />
      <path d={`M ${fwx - wr - 8},145 A ${wr + 10} ${wr + 10} 0 0 1 ${fwx + wr + 8},145`} fill="none" stroke={B} strokeWidth={6} />
      <path d={`M ${rwx - wr - 8},145 A ${wr + 10} ${wr + 10} 0 0 1 ${rwx + wr + 8},145`} fill="none" stroke={B} strokeWidth={6} />
    </svg>
  );
}

/* ───────────────── MEDIUM TRUCK (C) ───────────────── */
export function MedTruckSVG() {
  return (
    <svg viewBox="0 0 560 195" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect x={55} y={147} width={458} height={10} rx={3} fill="#071830" />
      {/* Cab */}
      <path d="M 52,146 L 52,90 L 68,62 L 88,50 L 185,50 L 185,146 Z" fill={B} />
      {/* Cab roof */}
      <rect x={68} y={50} width={117} height={14} rx={2} fill={B2} />
      {/* Air deflector on top */}
      <path d="M 68,50 L 68,38 C 100,30 160,30 185,38 L 185,50 Z" fill={B2} />
      {/* Windshield */}
      <path d="M 52,90 L 68,62 L 68,50 L 88,50 L 105,62 L 105,88 Z" fill={GL} opacity={0.85} />
      {/* Side window */}
      <rect x={106} y={52} width={78} height={30} rx={2} fill={GL} opacity={0.9} />
      {/* Cargo box */}
      <rect x={186} y={42} width={328} height={104} rx={3} fill={B} />
      <rect x={188} y={44} width={324} height={100} rx={2} fill={B3} />
      {/* Cargo box panels */}
      {[280, 370].map((x) => <line key={x} x1={x} y1={44} x2={x} y2={144} stroke={B} strokeWidth={2} />)}
      <line x1={188} y1={94} x2={512} y2={94} stroke={B} strokeWidth={1.5} />
      {/* Rear door */}
      <rect x={494} y={44} width={18} height={100} rx={2} fill={B2} />
      <line x1={503} y1={44} x2={503} y2={144} stroke={B} strokeWidth={1.5} />
      {/* Side branding */}
      <text x={348} y={86} fill={WH} fontSize={10} fontFamily="Arial, sans-serif" fontWeight="bold" textAnchor="middle" letterSpacing="0.5">MANCHAKI TECHNICAL TRAINING INSTITUTE</text>
      <text x={348} y={102} fill={YL} fontSize={9} fontFamily="Arial, sans-serif" fontWeight="bold" textAnchor="middle">&amp; DRIVING SCHOOL</text>
      {/* Cab side label */}
      <text x={140} y={98} fill={WH} fontSize={7.5} fontFamily="Arial, sans-serif" fontWeight="bold" textAnchor="middle">MANCHAKI</text>
      {/* Bonnet/hood */}
      <BonnetText x={62} y={80} angle={-85} />
      {/* Headlights */}
      <rect x={52} y={92} width={10} height={8} rx={2} fill="#FFE98A" />
      <rect x={52} y={102} width={10} height={8} rx={2} fill="#FFCCAA" opacity={0.7} />
      {/* Tail lights */}
      <rect x={509} y={110} width={8} height={22} rx={2} fill="#BB0000" />
      {/* Exhaust */}
      <rect x={73} y={30} width={6} height={12} rx={2} fill="#333" />
      {/* Front bumper / grille */}
      <rect x={50} y={122} width={14} height={22} rx={2} fill={B2} />
      {[124, 128, 132, 136, 140].map((y) => <line key={y} x1={51} y1={y} x2={63} y2={y} stroke={B3} strokeWidth={1} />)}
      {/* L stickers */}
      <LSt x={488} y={35} s={24} />
      <LSt x={492} y={108} s={18} />
      {/* Wheels - front single, rear dual */}
      <Wheel cx={110} cy={164} r={33} />
      <Wheel cx={415} cy={164} r={33} />
      <Wheel cx={445} cy={164} r={33} />
      <path d="M 77,147 A 41 41 0 0 1 143,147" fill="none" stroke={B} strokeWidth={6} />
      <path d="M 382,147 A 41 41 0 0 1 448,147" fill="none" stroke={B} strokeWidth={6} />
      <path d="M 412,147 A 41 41 0 0 1 478,147" fill="none" stroke={B} strokeWidth={6} />
    </svg>
  );
}

/* ───────────────── VAN (D1) ───────────────── */
export function VanSVG() {
  const fwx = 112; const rwx = 400; const wy = 162; const wr = 31;
  return (
    <svg viewBox="0 0 520 195" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect x={80} y={144} width={360} height={10} rx={3} fill="#071830" />
      {/* Body */}
      <path d="M 55,143 L 55,62 L 72,50 L 430,50 L 450,65 L 460,95 L 460,143 Z" fill={B} />
      {/* Roof */}
      <rect x={72} y={46} width={358} height={8} rx={3} fill={B2} />
      {/* Windshield */}
      <path d="M 55,88 L 72,50 L 140,50 L 140,88 Z" fill={GL} opacity={0.85} />
      {/* Side windows row */}
      <rect x={145} y={52} width={55} height={22} rx={2} fill={GL} opacity={0.9} />
      <rect x={204} y={52} width={55} height={22} rx={2} fill={GL} opacity={0.9} />
      <rect x={263} y={52} width={55} height={22} rx={2} fill={GL} opacity={0.9} />
      <rect x={322} y={52} width={55} height={22} rx={2} fill={GL} opacity={0.9} />
      {/* Sliding door line */}
      <line x1={244} y1={50} x2={244} y2={143} stroke={B2} strokeWidth={2} />
      {/* Side crease */}
      <path d="M 60,110 C 200,105 380,105 455,110" stroke={B3} strokeWidth={2} fill="none" opacity={0.6} />
      {/* Side branding */}
      <BrandSide x={148} y={118} w={198} />
      {/* Bonnet / front text */}
      <BonnetText x={93} y={78} angle={-88} />
      {/* Headlights */}
      <rect x={55} y={56} width={10} height={14} rx={3} fill="#FFE98A" />
      <rect x={55} y={72} width={10} height={10} rx={2} fill="#FFCCAA" opacity={0.8} />
      {/* Tail lights */}
      <rect x={450} y={60} width={10} height={24} rx={3} fill="#BB0000" />
      <rect x={450} y={86} width={10} height={14} rx={2} fill="#FF4444" opacity={0.6} />
      {/* Front grille */}
      <rect x={54} y={98} width={10} height={40} rx={2} fill={B2} />
      {[100, 105, 110, 115, 120, 125, 130].map((y) => <line key={y} x1={55} y1={y} x2={63} y2={y} stroke={B3} strokeWidth={1} />)}
      {/* L stickers */}
      <LSt x={415} y={42} s={24} />
      <LSt x={440} y={60} s={18} />
      {/* Wheels */}
      <Wheel cx={fwx} cy={wy} r={wr} />
      <Wheel cx={rwx} cy={wy} r={wr} />
      <path d={`M ${fwx - wr - 8},144 A ${wr + 10} ${wr + 10} 0 0 1 ${fwx + wr + 8},144`} fill="none" stroke={B} strokeWidth={6} />
      <path d={`M ${rwx - wr - 8},144 A ${wr + 10} ${wr + 10} 0 0 1 ${rwx + wr + 8},144`} fill="none" stroke={B} strokeWidth={6} />
    </svg>
  );
}

/* ───────────────── MINIBUS (D2) ───────────────── */
export function MinibusSVG() {
  return (
    <svg viewBox="0 0 560 195" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect x={58} y={146} width={450} height={10} rx={3} fill="#071830" />
      {/* Body */}
      <path d="M 55,145 L 55,56 L 74,44 L 466,44 L 490,60 L 502,90 L 502,145 Z" fill={B} />
      {/* Roof stripe */}
      <rect x={74} y={40} width={392} height={8} rx={3} fill={YL} />
      {/* Windshield */}
      <path d="M 55,92 L 74,44 L 148,44 L 148,92 Z" fill={GL} opacity={0.85} />
      {/* Side windows */}
      {[152, 208, 264, 320, 376].map((x) => (
        <rect key={x} x={x} y={46} width={52} height={26} rx={3} fill={GL} opacity={0.9} />
      ))}
      {/* Rear window */}
      <rect x={473} y={60} width={28} height={45} rx={2} fill={GL} opacity={0.8} />
      {/* Door */}
      <line x1={290} y1={44} x2={290} y2={145} stroke={B2} strokeWidth={2.5} />
      {/* Body crease */}
      <path d="M 60,112 C 220,106 400,106 500,112" stroke={B3} strokeWidth={2} fill="none" opacity={0.7} />
      {/* Side branding */}
      <BrandSide x={152} y={122} w={226} />
      {/* Bonnet text */}
      <BonnetText x={93} y={72} angle={-88} />
      {/* Headlights */}
      <rect x={55} y={58} width={10} height={18} rx={3} fill="#FFE98A" />
      <rect x={55} y={78} width={10} height={12} rx={2} fill="#FFCCAA" opacity={0.7} />
      {/* Tail lights */}
      <rect x={492} y={64} width={10} height={26} rx={3} fill="#BB0000" />
      {/* Entry step */}
      <rect x={56} y={138} width={18} height={6} rx={2} fill={B2} />
      {/* Front bumper / grille */}
      <rect x={54} y={106} width={10} height={36} rx={2} fill={B2} />
      {[108, 113, 118, 123, 128, 133, 138].map((y) => <line key={y} x1={55} y1={y} x2={63} y2={y} stroke={B3} strokeWidth={1} />)}
      {/* L stickers */}
      <LSt x={447} y={32} s={26} />
      <LSt x={484} y={63} s={18} />
      {/* Wheels front */}
      <Wheel cx={118} cy={163} r={33} />
      {/* Wheels rear dual */}
      <Wheel cx={418} cy={163} r={33} />
      <Wheel cx={450} cy={163} r={33} />
      {/* Arches */}
      <path d="M 85,146 A 41 41 0 0 1 151,146" fill="none" stroke={B} strokeWidth={6} />
      <path d="M 385,146 A 41 41 0 0 1 451,146" fill="none" stroke={B} strokeWidth={6} />
      <path d="M 417,146 A 41 41 0 0 1 483,146" fill="none" stroke={B} strokeWidth={6} />
    </svg>
  );
}

/* ───────────────── BUS (D3) ───────────────── */
export function BusSVG() {
  return (
    <svg viewBox="0 0 620 195" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect x={48} y={147} width={530} height={10} rx={3} fill="#071830" />
      {/* Main body */}
      <rect x={48} y={46} width={528} height={100} rx={6} fill={B} />
      {/* Roof accent stripe */}
      <rect x={48} y={42} width={528} height={8} rx={4} fill={YL} />
      {/* Lower accent stripe */}
      <rect x={48} y={128} width={528} height={8} fill={B3} />
      {/* Destination board at front */}
      <rect x={52} y={48} width={80} height={18} rx={2} fill="#1a1a2e" />
      <text x={92} y={61} fill={YL} fontSize={7} fontFamily="Arial, sans-serif" fontWeight="bold" textAnchor="middle">MANCHAKI</text>
      {/* Front windshield */}
      <rect x={52} y={68} width={55} height={42} rx={2} fill={GL} opacity={0.85} />
      {/* Side windows row 1 (upper deck style) */}
      {[115, 172, 229, 286, 343, 400, 457, 514].map((x) => (
        <rect key={x} x={x} y={50} width={52} height={28} rx={3} fill={GL} opacity={0.88} />
      ))}
      {/* Rear windshield */}
      <rect x={566} y={48} width={8} height={100} rx={2} fill={GL} opacity={0.7} />
      {/* Horizontal belt lines */}
      <line x1={48} y1={80} x2={576} y2={80} stroke={B3} strokeWidth={1.5} />
      {/* Side branding (centre panel) */}
      <text x={310} y={103} fill={WH} fontSize={11.5} fontFamily="Arial, sans-serif" fontWeight="bold" textAnchor="middle" letterSpacing="0.6">MANCHAKI TECHNICAL TRAINING INSTITUTE</text>
      <text x={310} y={119} fill={YL} fontSize={10} fontFamily="Arial, sans-serif" fontWeight="bold" textAnchor="middle" letterSpacing="0.4">&amp; DRIVING SCHOOL — Awaken Your Brilliance</text>
      {/* Door 1 */}
      <rect x={113} y={82} width={52} height={45} rx={2} fill={B2} />
      <line x1={139} y1={82} x2={139} y2={127} stroke={B} strokeWidth={2} />
      {/* Door 2 */}
      <rect x={343} y={82} width={52} height={45} rx={2} fill={B2} />
      <line x1={369} y1={82} x2={369} y2={127} stroke={B} strokeWidth={2} />
      {/* Headlights */}
      <rect x={49} y={96} width={12} height={16} rx={3} fill="#FFE98A" />
      <rect x={49} y={114} width={12} height={12} rx={2} fill="white" opacity={0.5} />
      {/* Tail lights */}
      <rect x={565} y={90} width={10} height={28} rx={3} fill="#BB0000" />
      {/* Front bumper */}
      <rect x={47} y={136} width={18} height={10} rx={2} fill={B2} />
      {/* Rear bumper */}
      <rect x={559} y={136} width={18} height={10} rx={2} fill={B2} />
      {/* Front grille */}
      <rect x={49} y={116} width={14} height={18} rx={2} fill={B3} />
      {[118, 122, 126, 130].map((y) => <line key={y} x1={50} y1={y} x2={62} y2={y} stroke="#1e4f8c" strokeWidth={1} />)}
      {/* L stickers */}
      <LSt x={548} y={34} s={26} />
      <LSt x={551} y={90} s={20} />
      <LSt x={50} y={34} s={20} />
      {/* Wheels front */}
      <Wheel cx={115} cy={163} r={33} />
      <Wheel cx={148} cy={163} r={33} />
      {/* Wheels rear */}
      <Wheel cx={472} cy={163} r={33} />
      <Wheel cx={505} cy={163} r={33} />
      {/* Arches */}
      <path d="M 82,147 A 41 41 0 0 1 148,147" fill="none" stroke={B} strokeWidth={6} />
      <path d="M 115,147 A 41 41 0 0 1 181,147" fill="none" stroke={B} strokeWidth={6} />
      <path d="M 439,147 A 41 41 0 0 1 505,147" fill="none" stroke={B} strokeWidth={6} />
      <path d="M 472,147 A 41 41 0 0 1 538,147" fill="none" stroke={B} strokeWidth={6} />
    </svg>
  );
}
