import { motion } from 'framer-motion';
import { AlertTriangle, Shield } from 'lucide-react';
import { riskAssessment } from '@/data/salesPlanData';
import { cn } from '@/lib/utils';

const probabilityColors: Record<string, string> = {
  'High': 'bg-destructive/10 text-destructive border-destructive/20',
  'Medium': 'bg-warning/10 text-warning border-warning/20',
  'Low': 'bg-success/10 text-success border-success/20',
};

const impactColors: Record<string, string> = {
  'High': 'bg-destructive/10 text-destructive',
  'Medium': 'bg-warning/10 text-warning',
  'Low': 'bg-success/10 text-success',
};

const RiskAssessment = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-card-elevated rounded-2xl p-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-destructive/10">
          <AlertTriangle className="w-5 h-5 text-destructive" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">Risk Assessment & Mitigation</h3>
      </div>

      <div className="space-y-4">
        {riskAssessment.map((risk, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            className="p-4 bg-secondary/30 rounded-xl hover:bg-secondary/50 transition-colors"
          >
            <div className="flex flex-col md:flex-row md:items-center gap-3 mb-3">
              <h4 className="font-semibold text-foreground flex-1">{risk.risk}</h4>
              <div className="flex items-center gap-2">
                <span className={cn(
                  "px-2 py-1 rounded-full text-xs font-medium border",
                  probabilityColors[risk.probability]
                )}>
                  Prob: {risk.probability}
                </span>
                <span className={cn(
                  "px-2 py-1 rounded-full text-xs font-medium",
                  impactColors[risk.impact]
                )}>
                  Impact: {risk.impact}
                </span>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Shield className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
              <p className="text-sm text-muted-foreground">{risk.mitigation}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default RiskAssessment;
