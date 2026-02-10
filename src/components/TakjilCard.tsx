import {
  Flame,
  MapPin,
  Coins,
  Coffee,
  IceCream,
  Utensils,
  Crown,
  Circle,
  Pentagon,
  Star,
  Droplet,
  type LucideIcon,
} from 'lucide-react'
import { type CSSProperties, type ReactElement } from 'react'

// --- Types & Interfaces ---

export type TakjilTier = 'common' | 'rare' | 'epic' | 'legendary'

export interface TakjilStats {
  sweetness: number // 0-5
  salty: number // 0-5
  spicy: number // 0-5
  portion: number // 0-5
}

export interface TakjilData {
  title: string
  description: string
  category: 'Dessert' | 'Drink' | 'Appetizer' | 'Main Course' | string
  image: string
  origin: string
  price: string
  stats: TakjilStats
}

interface TakjilCardProps {
  rarity?: TakjilTier
  data?: TakjilData
  className?: string
}

interface TierConfig {
  label: string
  bgGradient: string
  borderColor: string
  textColor: string
  barColor: string
  barBg: string
  badgeBg: string
  patternType: 'dots' | 'grid' | 'checker' | 'noise'
  patternColor: string
  icon: ReactElement
}

// --- Configuration ---

const TIER_STYLES: Record<TakjilTier, TierConfig> = {
  common: {
    label: 'Common',
    bgGradient: 'from-emerald-50 to-emerald-100',
    borderColor: 'border-emerald-800',
    textColor: 'text-emerald-900',
    barColor: 'bg-emerald-600',
    barBg: 'bg-emerald-900/10',
    badgeBg: 'bg-emerald-800',
    patternType: 'dots',
    patternColor: '#065f46',
    icon: <Circle size={10} fill="currentColor" />,
  },
  rare: {
    label: 'Rare',
    bgGradient: 'from-blue-50 to-blue-100',
    borderColor: 'border-blue-800',
    textColor: 'text-blue-900',
    barColor: 'bg-blue-600',
    barBg: 'bg-blue-900/10',
    badgeBg: 'bg-blue-700',
    patternType: 'grid',
    patternColor: '#1e40af',
    icon: <Pentagon size={10} fill="currentColor" />,
  },
  epic: {
    label: 'Epic',
    bgGradient: 'from-fuchsia-50 to-pink-100',
    borderColor: 'border-purple-900',
    textColor: 'text-purple-950',
    barColor: 'bg-purple-600',
    barBg: 'bg-purple-900/10',
    badgeBg: 'bg-purple-900',
    patternType: 'checker',
    patternColor: '#581c87',
    icon: <Star size={10} fill="currentColor" />,
  },
  legendary: {
    label: 'Legendary',
    bgGradient: 'from-amber-100 via-yellow-200 to-amber-400',
    borderColor: 'border-amber-950',
    textColor: 'text-amber-950',
    barColor: 'bg-amber-700',
    barBg: 'bg-amber-900/10',
    badgeBg: 'bg-amber-800',
    patternType: 'noise',
    patternColor: '#451a03',
    icon: <Crown size={10} fill="currentColor" />,
  },
}

// --- Helper Components ---

/** Renders the low-opacity background pattern based on tier */
const TierPattern = ({
  type,
  color,
}: {
  type: TierConfig['patternType']
  color: string
}) => {
  const baseClass = 'absolute inset-0 pointer-events-none opacity-[0.05]'

  const patterns = {
    dots: {
      backgroundImage: `radial-gradient(${color} 2px, transparent 2px)`,
      backgroundSize: '16px 16px',
    },
    grid: {
      backgroundImage: `linear-gradient(${color} 1px, transparent 1px), linear-gradient(90deg, ${color} 1px, transparent 1px)`,
      backgroundSize: '24px 24px',
    },
    checker: {
      backgroundImage: `linear-gradient(45deg, ${color} 25%, transparent 25%), linear-gradient(-45deg, ${color} 25%, transparent 25%), linear-gradient(45deg, transparent 75%, ${color} 75%), linear-gradient(-45deg, transparent 75%, ${color} 75%)`,
      backgroundSize: '20px 20px',
      backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
    },
    noise: null, // Handled separately due to SVG filter
  }

  if (type === 'noise') {
    return (
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{ filter: 'contrast(120%) brightness(100%)' }}
      >
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <filter id="noiseFilter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.8"
              numOctaves="3"
              stitchTiles="stitch"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>
    )
  }

  return <div className={baseClass} style={patterns[type] as CSSProperties} />
}

/** Renders a small progress bar for a single stat (0-5) */
const MiniStatBar = ({
  icon: Icon,
  label,
  value,
  theme,
}: {
  icon: LucideIcon
  label: string
  value: number
  theme: TierConfig
}) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between items-end">
        <span
          className={`text-[9px] font-bold uppercase flex items-center gap-1 opacity-70 ${theme.textColor}`}
        >
          <Icon size={12} /> {label}
        </span>
      </div>
      <div
        className={`h-1.5 w-full flex gap-px ${theme.barBg} rounded overflow-hidden`}
      >
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`flex-1 transition-all ${
              i < value ? theme.barColor : 'bg-transparent'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

const getCategoryIcon = (cat: string) => {
  switch (cat?.toLowerCase()) {
    case 'drink':
      return <Coffee size={10} />
    case 'appetizer':
      return <IceCream size={10} />
    default:
      return <Utensils size={10} />
  }
}

// --- Main Component ---

export default function TakjilCard({
  rarity = 'common',
  data = {
    title: 'Kolak Pisang',
    description: 'Kuah santan gurih dengan pisang kepok kuning pilihan.',
    category: 'Dessert',
    image: '/kolak-pisang.jpg',
    origin: 'Jawa',
    price: '15.000',
    stats: {
      sweetness: 4,
      salty: 2,
      spicy: 0,
      portion: 3,
    },
  },
  className = '',
}: TakjilCardProps) {
  const theme = TIER_STYLES[rarity] || TIER_STYLES.common
  const isPremium = rarity === 'epic' || rarity === 'legendary'

  return (
    <div
      className={`
        relative w-72 p-4 rounded-xl 
        bg-linear-to-br ${theme.bgGradient}
        border-[3px] ${theme.borderColor}
        shadow-[6px_6px_0px_0px_rgba(0,0,0,0.8)] 
        hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,0.8)] 
        hover:translate-x-1 hover:translate-y-1
        transition-all duration-200 group
        overflow-hidden ${className}
      `}
    >
      {/* Dynamic Styles for Shine Animation */}
      <style>{`
         @keyframes glint {
            0% { transform: translateX(-150%) skewX(-20deg); }
            100% { transform: translateX(200%) skewX(-20deg); }
         }
       `}</style>

      {/* Layer 1: Background Pattern */}
      <TierPattern type={theme.patternType} color={theme.patternColor} />

      {/* Layer 2: Shine Effect (Epic/Legendary only) */}
      {isPremium && (
        <div className="absolute inset-0 pointer-events-none z-20">
          <div className="absolute top-0 left-0 w-1/2 h-full bg-linear-to-r from-transparent via-white/30 to-transparent animate-[glint_3s_infinite]" />
        </div>
      )}

      {/* Layer 3: Main Content */}
      <div className="relative z-10 flex flex-col gap-3">
        {/* Image & Badges */}
        <div className="relative">
          {/* Badge: Category */}
          <div
            className={`
              absolute top-2 left-2 z-20
              flex items-center gap-1 px-2 py-1 rounded
              bg-white border-2 ${theme.borderColor}
              text-[10px] font-black uppercase tracking-wider text-black
              shadow-sm
            `}
          >
            {getCategoryIcon(data.category)}
            {data.category}
          </div>

          {/* Badge: Rarity (with Icon) */}
          <div
            className={`
              absolute top-2 right-2 z-20
              flex items-center gap-1 px-2 py-1 rounded
              ${theme.badgeBg} text-white 
              text-[10px] font-black uppercase tracking-widest
              border-2 border-white/20 shadow-sm
            `}
          >
            {theme.icon}
            {theme.label}
          </div>

          {/* Image Container */}
          <div
            className={`bg-white p-1 rounded-lg border-2 ${theme.borderColor}`}
          >
            <img
              src={data.image}
              alt={data.title}
              className="w-full h-40 object-cover rounded border border-black/10"
            />
          </div>
        </div>

        {/* Text Info */}
        <div>
          <h3
            className={`text-xl font-black leading-none mb-2 ${theme.textColor}`}
          >
            {data.title}
          </h3>

          {/* Inline Meta: Origin & Price */}
          <div
            className={`flex items-center justify-between p-2 rounded-lg border-2 ${theme.borderColor} bg-white/50 backdrop-blur-sm mb-2`}
          >
            <div className="flex items-center gap-1.5">
              <MapPin size={12} className={theme.textColor} />
              <span
                className={`text-xs font-bold uppercase ${theme.textColor}`}
              >
                {data.origin}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Coins size={12} className={theme.textColor} />
              <span className={`text-xs font-bold ${theme.textColor}`}>
                {data.price}
              </span>
            </div>
          </div>

          <p
            className={`text-xs font-medium leading-relaxed ${theme.textColor} opacity-90 line-clamp-2 min-h-[2.5em]`}
          >
            {data.description}
          </p>
        </div>

        {/* Stats Grid (4 items) */}
        <div
          className={`grid grid-cols-2 gap-x-4 gap-y-2 p-2 rounded-lg border-2 ${theme.borderColor} bg-white/50 backdrop-blur-sm`}
        >
          <MiniStatBar
            icon={Droplet}
            label="Sweetness"
            value={data.stats.sweetness}
            theme={theme}
          />
          <MiniStatBar
            icon={Flame}
            label="Savory"
            value={data.stats.salty}
            theme={theme}
          />
          <MiniStatBar
            icon={Flame}
            label="Spiciness"
            value={data.stats.spicy}
            theme={theme}
          />
          <MiniStatBar
            icon={Utensils}
            label="Portion"
            value={data.stats.portion}
            theme={theme}
          />
        </div>
      </div>
    </div>
  )
}
