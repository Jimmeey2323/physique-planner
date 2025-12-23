import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pencil, Trash2, MessageSquare, Save, X, RotateCcw, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Offer } from '@/data/salesPlanData';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';

interface OfferCardProps {
  offer: Offer;
  index: number;
  note?: string;
  modification?: Partial<Offer> | null;
  isDeleted?: boolean;
  onSaveNote: (offerId: string, note: string) => void;
  onSaveModification: (offerId: string, changes: Partial<Offer>) => void;
  onDelete: (offerId: string) => void;
  onRestore: (offerId: string) => void;
}

const offerTypeColors: Record<string, string> = {
  'New Member': 'bg-success/10 text-success border-success/20',
  'Lapsed': 'bg-warning/10 text-warning border-warning/20',
  'Upsell': 'bg-primary/10 text-primary border-primary/20',
  'Innovative': 'bg-purple-500/10 text-purple-600 border-purple-500/20',
  'HERO OFFER': 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-600 border-amber-500/30',
};

const OfferCard = ({ 
  offer, 
  index, 
  note, 
  modification,
  isDeleted,
  onSaveNote, 
  onSaveModification,
  onDelete,
  onRestore
}: OfferCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [noteText, setNoteText] = useState(note || '');
  const [editForm, setEditForm] = useState({
    name: modification?.name || offer.name,
    audience: modification?.audience || offer.audience,
    package: modification?.package || offer.package,
    pricing: modification?.pricing || offer.pricing,
    whyItWorks: modification?.whyItWorks || offer.whyItWorks,
  });

  const displayData = {
    ...offer,
    ...modification,
  };

  const handleSaveNote = () => {
    onSaveNote(offer.id, noteText);
    setIsAddingNote(false);
  };

  const handleSaveEdit = () => {
    onSaveModification(offer.id, editForm);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditForm({
      name: modification?.name || offer.name,
      audience: modification?.audience || offer.audience,
      package: modification?.package || offer.package,
      pricing: modification?.pricing || offer.pricing,
      whyItWorks: modification?.whyItWorks || offer.whyItWorks,
    });
    setIsEditing(false);
  };

  if (isDeleted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 0.5, scale: 1 }}
        className="glass-card rounded-xl p-4 border-dashed border-2 border-muted-foreground/20"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Trash2 className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground line-through">{offer.name}</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onRestore(offer.id)}
            className="text-primary hover:text-primary"
          >
            <RotateCcw className="w-4 h-4 mr-1" />
            Restore
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className={cn(
        "glass-card-elevated rounded-xl overflow-hidden transition-all duration-300",
        isExpanded && "ring-2 ring-primary/20"
      )}
    >
      {/* Header */}
      <div 
        className="p-4 cursor-pointer hover:bg-secondary/30 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className={cn(
                "px-2.5 py-1 rounded-full text-xs font-semibold border",
                offerTypeColors[offer.type] || 'bg-secondary text-secondary-foreground border-border'
              )}>
                {offer.type}
              </span>
              <span className="text-xs text-muted-foreground">
                {displayData.audience}
              </span>
              {note && (
                <span className="flex items-center gap-1 text-xs text-primary">
                  <MessageSquare className="w-3 h-3" />
                  Has note
                </span>
              )}
              {modification && (
                <span className="text-xs text-warning font-medium">Modified</span>
              )}
            </div>
            <h4 className="font-semibold text-foreground truncate">
              {displayData.name}
            </h4>
          </div>
          <button className="p-1 rounded-lg hover:bg-secondary transition-colors">
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-muted-foreground" />
            ) : (
              <ChevronDown className="w-5 h-5 text-muted-foreground" />
            )}
          </button>
        </div>
      </div>

      {/* Expanded Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 border-t border-border/50">
              {isEditing ? (
                <div className="pt-4 space-y-4">
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1 block">Offer Name</label>
                    <Input
                      value={editForm.name}
                      onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                      className="bg-secondary/50"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1 block">Audience</label>
                    <Input
                      value={editForm.audience}
                      onChange={(e) => setEditForm(prev => ({ ...prev, audience: e.target.value }))}
                      className="bg-secondary/50"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1 block">Package</label>
                    <Textarea
                      value={editForm.package}
                      onChange={(e) => setEditForm(prev => ({ ...prev, package: e.target.value }))}
                      className="bg-secondary/50 min-h-[60px]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1 block">Pricing</label>
                    <Textarea
                      value={editForm.pricing}
                      onChange={(e) => setEditForm(prev => ({ ...prev, pricing: e.target.value }))}
                      className="bg-secondary/50 min-h-[60px]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1 block">Why It Works</label>
                    <Textarea
                      value={editForm.whyItWorks}
                      onChange={(e) => setEditForm(prev => ({ ...prev, whyItWorks: e.target.value }))}
                      className="bg-secondary/50 min-h-[60px]"
                    />
                  </div>
                  <div className="flex gap-2 justify-end">
                    <Button variant="ghost" size="sm" onClick={handleCancelEdit}>
                      <X className="w-4 h-4 mr-1" />
                      Cancel
                    </Button>
                    <Button variant="navy" size="sm" onClick={handleSaveEdit}>
                      <Save className="w-4 h-4 mr-1" />
                      Save Changes
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="pt-4 space-y-4">
                  <div className="grid gap-3">
                    <div>
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Package</p>
                      <p className="text-sm text-foreground">{displayData.package}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Pricing</p>
                      <p className="text-sm text-foreground font-mono">{displayData.pricing}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Why It Works</p>
                      <p className="text-sm text-foreground">{displayData.whyItWorks}</p>
                    </div>
                  </div>

                  {/* Note Section */}
                  {isAddingNote ? (
                    <div className="pt-3 border-t border-border/50">
                      <label className="text-xs font-medium text-muted-foreground mb-2 block">Add Note</label>
                      <Textarea
                        value={noteText}
                        onChange={(e) => setNoteText(e.target.value)}
                        placeholder="Add your notes here..."
                        className="bg-secondary/50 min-h-[80px] mb-2"
                      />
                      <div className="flex gap-2 justify-end">
                        <Button variant="ghost" size="sm" onClick={() => setIsAddingNote(false)}>
                          Cancel
                        </Button>
                        <Button variant="navy" size="sm" onClick={handleSaveNote}>
                          <Save className="w-4 h-4 mr-1" />
                          Save Note
                        </Button>
                      </div>
                    </div>
                  ) : note ? (
                    <div className="pt-3 border-t border-border/50">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Your Note</p>
                        <Button variant="ghost" size="sm" onClick={() => setIsAddingNote(true)}>
                          <Pencil className="w-3 h-3 mr-1" />
                          Edit
                        </Button>
                      </div>
                      <div className="p-3 bg-primary/5 rounded-lg border border-primary/10">
                        <p className="text-sm text-foreground">{note}</p>
                      </div>
                    </div>
                  ) : null}

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-3 border-t border-border/50">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(offer.id)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </Button>
                    <div className="flex gap-2">
                      {!isAddingNote && !note && (
                        <Button variant="outline" size="sm" onClick={() => setIsAddingNote(true)}>
                          <MessageSquare className="w-4 h-4 mr-1" />
                          Add Note
                        </Button>
                      )}
                      <Button variant="glass" size="sm" onClick={() => setIsEditing(true)}>
                        <Pencil className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default OfferCard;
