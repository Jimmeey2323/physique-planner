import { motion } from 'framer-motion';

const Header = () => {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy-light to-navy opacity-95" />
      
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-primary/10 rounded-full blur-2xl" />
      </div>
      
      <div className="relative container mx-auto px-6 py-8">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex items-center gap-3"
            >
              <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                <span className="text-2xl font-bold text-white">57</span>
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                  Physique 57 India
                </h1>
                <p className="text-white/60 text-sm font-medium">
                  Sales Strategy Dashboard
                </p>
              </div>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="hidden md:flex items-center gap-4"
          >
            <div className="glass-card px-4 py-2 rounded-full">
              <span className="text-sm font-medium text-foreground">FY 2026</span>
            </div>
            <div className="text-right">
              <p className="text-white/60 text-xs uppercase tracking-wider">Annual Target</p>
              <p className="text-white text-xl font-bold">₹75.49M</p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
