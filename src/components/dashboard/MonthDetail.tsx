import { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, TrendingUp, Calendar, AlertTriangle, Plus, Sparkles } from 'lucide-react';
import { MonthData, Offer } from '@/data/salesPlanData';
import { useOfferNotes } from '@/hooks/useOfferNotes';
import OfferCard from './OfferCard';
import LocationSplit from './LocationSplit';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface MonthDetailProps {
  monthData: MonthData;
}

const MonthDetail = ({ monthData }: MonthDetailProps) => {
  const {
    saveNote,
    getNote,
    saveModification,
    getModification,
    deleteOffer,
    restoreOffer,
    isOfferDeleted,
    addCustomOffer,
    getCustomOffers,
    deleteCustomOffer,
  } = useOfferNotes();

  const [isAddingOffer, setIsAddingOffer] = useState(false);
  const [newOffer, setNewOffer] = useState({
    type: 'New Member',
    name: '',
    audience: '',
    package: '',
    pricing: '',
    whyItWorks: '',
  });

  const monthKey = `${monthData.month}-${monthData.year}`;
  const customOffers = getCustomOffers(monthKey);
  const allOffers = [...monthData.offers, ...customOffers];

  const formatCurrency = (value: number) => {
    if (value >= 10000000) {
      return `₹${(value / 10000000).toFixed(2)} Crore`;
    }
    return `₹${(value / 100000).toFixed(1)} Lakhs`;
  };

  const growthPercentage = ((monthData.target - monthData.historicBaseline) / monthData.historicBaseline * 100).toFixed(0);

  const handleAddOffer = () => {
    const offer: Offer = {
      id: `custom-${Date.now()}`,
      ...newOffer,
    };
    addCustomOffer(monthKey, offer);
    setNewOffer({
      type: 'New Member',
      name: '',
      audience: '',
      package: '',
      pricing: '',
      whyItWorks: '',
    });
    setIsAddingOffer(false);
  };

  const handleDeleteOffer = (offerId: string) => {
    if (offerId.startsWith('custom-')) {
      deleteCustomOffer(monthKey, offerId);
    } else {
      deleteOffer(offerId);
    }
  };

  return (
    <div className="space-y-6">
      {/* Month Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card-elevated rounded-2xl p-6 md:p-8"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="w-5 h-5 text-primary" />
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                {monthData.month} {monthData.year}
              </h2>
              {monthData.month === 'April' && (
                <span className="px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-full animate-pulse">
                  8th Anniversary
                </span>
              )}
            </div>
            <p className="text-muted-foreground">{monthData.theme}</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Target</p>
              <p className="text-2xl font-bold text-foreground">{formatCurrency(monthData.target)}</p>
            </div>
            <div className="px-3 py-1.5 bg-success/10 text-success rounded-full text-sm font-semibold">
              +{growthPercentage}%
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="p-4 bg-secondary/50 rounded-xl">
            <div className="flex items-center gap-2 mb-1">
              <Target className="w-4 h-4 text-primary" />
              <span className="text-xs text-muted-foreground">Focus</span>
            </div>
            <p className="text-sm font-medium text-foreground line-clamp-2">{monthData.focus}</p>
          </div>
          <div className="p-4 bg-secondary/50 rounded-xl">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-warning" />
              <span className="text-xs text-muted-foreground">Hero Offer</span>
            </div>
            <p className="text-sm font-medium text-foreground line-clamp-2">{monthData.heroOffer}</p>
          </div>
          <div className="p-4 bg-secondary/50 rounded-xl">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-4 h-4 text-success" />
              <span className="text-xs text-muted-foreground">Historic Baseline</span>
            </div>
            <p className="text-sm font-medium text-foreground">{formatCurrency(monthData.historicBaseline)}</p>
          </div>
          <div className="p-4 bg-secondary/50 rounded-xl">
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle className="w-4 h-4 text-destructive" />
              <span className="text-xs text-muted-foreground">Watch Out</span>
            </div>
            <p className="text-sm font-medium text-foreground line-clamp-2">{monthData.floorPriceTrap || 'N/A'}</p>
          </div>
        </div>

        {/* Context */}
        {monthData.context && (
          <div className="p-4 bg-primary/5 rounded-xl border border-primary/10 mb-6">
            <p className="text-sm text-foreground">{monthData.context}</p>
          </div>
        )}

        {/* Location Split */}
        <LocationSplit
          mumbaiTarget={monthData.mumbaiTarget}
          bengaluruTarget={monthData.bengaluruTarget}
        />

        {/* Execution Plan */}
        {monthData.executionPlan && monthData.executionPlan.length > 0 && (
          <div className="mt-6 p-4 bg-navy/5 rounded-xl border border-navy/10">
            <h4 className="font-semibold text-foreground mb-3">Execution Plan</h4>
            <ul className="space-y-2">
              {monthData.executionPlan.map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </motion.div>

      {/* Offers Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Strategic Offers</h3>
          <Dialog open={isAddingOffer} onOpenChange={setIsAddingOffer}>
            <DialogTrigger asChild>
              <Button variant="navy" size="sm">
                <Plus className="w-4 h-4 mr-1" />
                Add Offer
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Add New Offer</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Offer Type</label>
                  <Select
                    value={newOffer.type}
                    onValueChange={(value) => setNewOffer(prev => ({ ...prev, type: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="New Member">New Member</SelectItem>
                      <SelectItem value="Lapsed">Lapsed</SelectItem>
                      <SelectItem value="Upsell">Upsell</SelectItem>
                      <SelectItem value="Innovative">Innovative</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Offer Name</label>
                  <Input
                    value={newOffer.name}
                    onChange={(e) => setNewOffer(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., Summer Special"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Target Audience</label>
                  <Input
                    value={newOffer.audience}
                    onChange={(e) => setNewOffer(prev => ({ ...prev, audience: e.target.value }))}
                    placeholder="e.g., New Leads"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Package Details</label>
                  <Textarea
                    value={newOffer.package}
                    onChange={(e) => setNewOffer(prev => ({ ...prev, package: e.target.value }))}
                    placeholder="Describe the package..."
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Pricing</label>
                  <Textarea
                    value={newOffer.pricing}
                    onChange={(e) => setNewOffer(prev => ({ ...prev, pricing: e.target.value }))}
                    placeholder="Rack: X | VAT: X | Disc: X% | Final: ₹X"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Why It Works</label>
                  <Textarea
                    value={newOffer.whyItWorks}
                    onChange={(e) => setNewOffer(prev => ({ ...prev, whyItWorks: e.target.value }))}
                    placeholder="Explain the value proposition..."
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <Button variant="ghost" onClick={() => setIsAddingOffer(false)}>
                    Cancel
                  </Button>
                  <Button variant="navy" onClick={handleAddOffer} disabled={!newOffer.name}>
                    Add Offer
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-3">
          {allOffers.map((offer, index) => (
            <OfferCard
              key={offer.id}
              offer={offer}
              index={index}
              note={getNote(offer.id)}
              modification={getModification(offer.id)}
              isDeleted={isOfferDeleted(offer.id)}
              onSaveNote={saveNote}
              onSaveModification={saveModification}
              onDelete={handleDeleteOffer}
              onRestore={restoreOffer}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MonthDetail;
