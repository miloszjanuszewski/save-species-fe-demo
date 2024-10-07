
import {create} from 'zustand';

interface Donation {
  name: string;
  value: number;
}

interface DonationState {
  donations: Donation[];
  addDonation: (donation: Donation) => void;
}

export const useDonationStore = create<DonationState>((set) => ({
  donations: [],
  addDonation: (donation) =>
    set((state) => ({
      donations: [...state.donations, donation],
    })),
}));
