import { useState, useEffect, useCallback } from 'react';
import { Offer } from '@/data/salesPlanData';

interface OfferNote {
  offerId: string;
  note: string;
  updatedAt: string;
}

interface OfferModification {
  offerId: string;
  modifications: Partial<Offer>;
  updatedAt: string;
}

const NOTES_STORAGE_KEY = 'physique57-offer-notes';
const MODIFICATIONS_STORAGE_KEY = 'physique57-offer-modifications';
const DELETED_OFFERS_KEY = 'physique57-deleted-offers';
const CUSTOM_OFFERS_KEY = 'physique57-custom-offers';

export const useOfferNotes = () => {
  const [notes, setNotes] = useState<Record<string, OfferNote>>({});
  const [modifications, setModifications] = useState<Record<string, OfferModification>>({});
  const [deletedOffers, setDeletedOffers] = useState<Set<string>>(new Set());
  const [customOffers, setCustomOffers] = useState<Record<string, Offer[]>>({});

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedNotes = localStorage.getItem(NOTES_STORAGE_KEY);
      if (savedNotes) {
        setNotes(JSON.parse(savedNotes));
      }

      const savedModifications = localStorage.getItem(MODIFICATIONS_STORAGE_KEY);
      if (savedModifications) {
        setModifications(JSON.parse(savedModifications));
      }

      const savedDeleted = localStorage.getItem(DELETED_OFFERS_KEY);
      if (savedDeleted) {
        setDeletedOffers(new Set(JSON.parse(savedDeleted)));
      }

      const savedCustom = localStorage.getItem(CUSTOM_OFFERS_KEY);
      if (savedCustom) {
        setCustomOffers(JSON.parse(savedCustom));
      }
    } catch (error) {
      console.error('Error loading from localStorage:', error);
    }
  }, []);

  // Save notes to localStorage
  const saveNote = useCallback((offerId: string, note: string) => {
    const newNote: OfferNote = {
      offerId,
      note,
      updatedAt: new Date().toISOString()
    };
    
    setNotes(prev => {
      const updated = { ...prev, [offerId]: newNote };
      localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Get note for an offer
  const getNote = useCallback((offerId: string): string => {
    return notes[offerId]?.note || '';
  }, [notes]);

  // Delete note
  const deleteNote = useCallback((offerId: string) => {
    setNotes(prev => {
      const updated = { ...prev };
      delete updated[offerId];
      localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Save offer modifications
  const saveModification = useCallback((offerId: string, changes: Partial<Offer>) => {
    const modification: OfferModification = {
      offerId,
      modifications: changes,
      updatedAt: new Date().toISOString()
    };
    
    setModifications(prev => {
      const updated = { ...prev, [offerId]: modification };
      localStorage.setItem(MODIFICATIONS_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Get modifications for an offer
  const getModification = useCallback((offerId: string): Partial<Offer> | null => {
    return modifications[offerId]?.modifications || null;
  }, [modifications]);

  // Delete an offer (soft delete)
  const deleteOffer = useCallback((offerId: string) => {
    setDeletedOffers(prev => {
      const updated = new Set(prev);
      updated.add(offerId);
      localStorage.setItem(DELETED_OFFERS_KEY, JSON.stringify([...updated]));
      return updated;
    });
  }, []);

  // Restore a deleted offer
  const restoreOffer = useCallback((offerId: string) => {
    setDeletedOffers(prev => {
      const updated = new Set(prev);
      updated.delete(offerId);
      localStorage.setItem(DELETED_OFFERS_KEY, JSON.stringify([...updated]));
      return updated;
    });
  }, []);

  // Check if offer is deleted
  const isOfferDeleted = useCallback((offerId: string): boolean => {
    return deletedOffers.has(offerId);
  }, [deletedOffers]);

  // Add custom offer to a month
  const addCustomOffer = useCallback((monthKey: string, offer: Offer) => {
    setCustomOffers(prev => {
      const monthOffers = prev[monthKey] || [];
      const updated = { ...prev, [monthKey]: [...monthOffers, offer] };
      localStorage.setItem(CUSTOM_OFFERS_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Get custom offers for a month
  const getCustomOffers = useCallback((monthKey: string): Offer[] => {
    return customOffers[monthKey] || [];
  }, [customOffers]);

  // Delete custom offer
  const deleteCustomOffer = useCallback((monthKey: string, offerId: string) => {
    setCustomOffers(prev => {
      const monthOffers = prev[monthKey] || [];
      const updated = { ...prev, [monthKey]: monthOffers.filter(o => o.id !== offerId) };
      localStorage.setItem(CUSTOM_OFFERS_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  return {
    saveNote,
    getNote,
    deleteNote,
    saveModification,
    getModification,
    deleteOffer,
    restoreOffer,
    isOfferDeleted,
    addCustomOffer,
    getCustomOffers,
    deleteCustomOffer,
    deletedOffers
  };
};
