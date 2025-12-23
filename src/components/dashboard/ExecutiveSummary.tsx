import { motion } from 'framer-motion';
import { TrendingUp, Target, MapPin, Calendar, Zap } from 'lucide-react';
import StatCard from './StatCard';
import { executiveSummary } from '@/data/salesPlanData';

interface ExecutiveSummaryProps {
  activeHalf: 'H1' | 'H2';
}

const ExecutiveSummary = ({ activeHalf }: ExecutiveSummaryProps) => {
  const data = activeHalf === 'H1' ? executiveSummary.h1 : executiveSummary.h2;

  const formatCurrency = (value: number) => {
    if (value >= 10000000) {
      return `₹${(value / 10000000).toFixed(2)}M`;
    }
    return `₹${(value / 100000).toFixed(1)}L`;
  };

  return (
    <motion.div
      key={activeHalf}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Target"
          value={data.totalTargetFormatted}
          subtitle={`${activeHalf} 2026`}
          icon={Target}
          trend={{ value: data.growthPercentage, isPositive: true }}
          delay={0.1}
          variant="primary"
        />
        <StatCard
          title="Mumbai Target"
          value={formatCurrency(data.mumbaiTotal)}
          subtitle="KH + SHQ Combined"
          icon={MapPin}
          delay={0.2}
        />
        <StatCard
          title="Bengaluru Target"
          value={formatCurrency(data.bengaluruTotal)}
          subtitle="Kenkere House"
          icon={MapPin}
          delay={0.3}
        />
        <StatCard
          title="Historic Baseline"
          value={formatCurrency(data.historicTotal)}
          subtitle={`${activeHalf} 2025`}
          icon={Calendar}
          delay={0.4}
          variant="accent"
        />
      </div>

      {/* Core Strategy */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="glass-card-elevated rounded-2xl p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-xl bg-primary/10">
            <Zap className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">Core Strategy</h3>
        </div>
        <ul className="space-y-3">
          {data.coreStrategy.map((strategy, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.1, duration: 0.3 }}
              className="flex items-start gap-3"
            >
              <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-semibold flex items-center justify-center flex-shrink-0 mt-0.5">
                {index + 1}
              </span>
              <p className="text-muted-foreground leading-relaxed">{strategy}</p>
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* Location Split for H2 */}
      {activeHalf === 'H2' && executiveSummary.h2.locationSplit && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="glass-card rounded-2xl p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl bg-navy/10">
              <TrendingUp className="w-5 h-5 text-navy" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">Revenue Attribution</h3>
          </div>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span className="text-sm text-muted-foreground">
                Mumbai: {executiveSummary.h2.locationSplit.mumbai}%
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-navy" />
              <span className="text-sm text-muted-foreground">
                Bengaluru: {executiveSummary.h2.locationSplit.bengaluru}%
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-silver-dark" />
              <span className="text-sm text-muted-foreground">
                Pop-ups/Events: {executiveSummary.h2.locationSplit.popups}%
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ExecutiveSummary;
