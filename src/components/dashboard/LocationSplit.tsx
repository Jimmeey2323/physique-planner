import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

interface LocationSplitProps {
  mumbaiTarget: number;
  bengaluruTarget: number;
}

const LocationSplit = ({ mumbaiTarget, bengaluruTarget }: LocationSplitProps) => {
  const total = mumbaiTarget + bengaluruTarget;
  const mumbaiPercentage = (mumbaiTarget / total) * 100;
  const bengaluruPercentage = (bengaluruTarget / total) * 100;

  const formatCurrency = (value: number) => {
    if (value >= 10000000) {
      return `₹${(value / 10000000).toFixed(2)}Cr`;
    }
    return `₹${(value / 100000).toFixed(1)}L`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="glass-card rounded-2xl p-6"
    >
      <div className="flex items-center gap-2 mb-4">
        <MapPin className="w-5 h-5 text-primary" />
        <h3 className="font-semibold text-foreground">Location Split</h3>
      </div>
      
      <div className="space-y-4">
        {/* Progress bar */}
        <div className="h-3 rounded-full bg-secondary overflow-hidden flex">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${mumbaiPercentage}%` }}
            transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
            className="bg-gradient-to-r from-primary to-primary/80 rounded-l-full"
          />
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${bengaluruPercentage}%` }}
            transition={{ delay: 0.7, duration: 0.8, ease: "easeOut" }}
            className="bg-gradient-to-r from-navy to-navy-light rounded-r-full"
          />
        </div>
        
        {/* Legend */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <div>
              <p className="text-sm font-medium text-foreground">Mumbai</p>
              <p className="text-xs text-muted-foreground">
                {formatCurrency(mumbaiTarget)} ({mumbaiPercentage.toFixed(0)}%)
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-navy" />
            <div>
              <p className="text-sm font-medium text-foreground">Bengaluru</p>
              <p className="text-xs text-muted-foreground">
                {formatCurrency(bengaluruTarget)} ({bengaluruPercentage.toFixed(0)}%)
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LocationSplit;
