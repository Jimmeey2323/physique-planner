import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/dashboard/Header';
import HalfYearToggle from '@/components/dashboard/HalfYearToggle';
import MonthNavigation from '@/components/dashboard/MonthNavigation';
import ExecutiveSummary from '@/components/dashboard/ExecutiveSummary';
import MonthDetail from '@/components/dashboard/MonthDetail';
import RiskAssessment from '@/components/dashboard/RiskAssessment';
import { h1MonthsData, h2MonthsData } from '@/data/salesPlanData';

const Index = () => {
  const [activeHalf, setActiveHalf] = useState<'H1' | 'H2'>('H1');
  const [activeMonth, setActiveMonth] = useState('January');

  const monthsData = activeHalf === 'H1' ? h1MonthsData : h2MonthsData;
  const currentMonthData = monthsData.find(m => m.month === activeMonth) || monthsData[0];

  const handleHalfToggle = (half: 'H1' | 'H2') => {
    setActiveHalf(half);
    setActiveMonth(half === 'H1' ? 'January' : 'July');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/30">
      {/* Background decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-navy/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="relative z-10">
        <Header />

        <main className="container mx-auto px-4 md:px-6 py-8 space-y-8">
          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
          >
            <HalfYearToggle activeHalf={activeHalf} onToggle={handleHalfToggle} />
            <MonthNavigation
              months={monthsData}
              activeMonth={activeMonth}
              onMonthSelect={setActiveMonth}
            />
          </motion.div>

          {/* Executive Summary */}
          <ExecutiveSummary activeHalf={activeHalf} />

          {/* Month Detail */}
          <MonthDetail monthData={currentMonthData} />

          {/* Risk Assessment */}
          <RiskAssessment />
        </main>

        {/* Footer */}
        <footer className="border-t border-border/50 mt-12">
          <div className="container mx-auto px-6 py-6">
            <p className="text-center text-sm text-muted-foreground">
              Physique 57 India — Sales Strategy Dashboard 2026
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
