import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { MonthData } from '@/data/salesPlanData';

interface MonthNavigationProps {
  months: MonthData[];
  activeMonth: string;
  onMonthSelect: (month: string) => void;
}

const MonthNavigation = ({ months, activeMonth, onMonthSelect }: MonthNavigationProps) => {
  const formatCurrency = (value: number) => {
    if (value >= 10000000) {
      return `₹${(value / 10000000).toFixed(2)}Cr`;
    }
    return `₹${(value / 100000).toFixed(1)}L`;
  };

  return (
    <div className="w-full overflow-x-auto scrollbar-hide">
      <div className="flex gap-2 min-w-max p-1">
        {months.map((month, index) => (
          <motion.button
            key={month.month}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            onClick={() => onMonthSelect(month.month)}
            className={cn(
              "relative flex flex-col items-center gap-1 px-4 py-3 rounded-xl transition-all duration-300 min-w-[100px]",
              activeMonth === month.month
                ? "bg-navy text-white shadow-lg"
                : "bg-white/50 text-muted-foreground hover:bg-white hover:text-foreground hover:shadow-md"
            )}
          >
            <span className="text-xs font-medium uppercase tracking-wider opacity-70">
              {month.month.slice(0, 3)}
            </span>
            <span className="text-sm font-bold">
              {formatCurrency(month.target)}
            </span>
            {month.month === 'April' && (
              <span className="absolute -top-1 -right-1 px-1.5 py-0.5 bg-warning text-white text-[10px] font-bold rounded-full">
                🎂
              </span>
            )}
            {month.month === 'August' && (
              <span className="absolute -top-1 -right-1 px-1.5 py-0.5 bg-success text-white text-[10px] font-bold rounded-full">
                🏆
              </span>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default MonthNavigation;
