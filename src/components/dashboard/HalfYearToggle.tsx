import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface HalfYearToggleProps {
  activeHalf: 'H1' | 'H2';
  onToggle: (half: 'H1' | 'H2') => void;
}

const HalfYearToggle = ({ activeHalf, onToggle }: HalfYearToggleProps) => {
  return (
    <div className="inline-flex items-center gap-1 p-1 rounded-full bg-secondary/50 backdrop-blur-sm border border-border/50">
      {(['H1', 'H2'] as const).map((half) => (
        <button
          key={half}
          onClick={() => onToggle(half)}
          className={cn(
            "relative px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300",
            activeHalf === half
              ? "text-white"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {activeHalf === half && (
            <motion.div
              layoutId="activeHalf"
              className="absolute inset-0 bg-gradient-to-r from-navy to-navy-light rounded-full shadow-lg"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-10">
            {half} 2026
          </span>
        </button>
      ))}
    </div>
  );
};

export default HalfYearToggle;
