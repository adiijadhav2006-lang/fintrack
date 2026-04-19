import { create } from "zustand";

type Tab = "home" | "add" | "reports" | "profile";

interface AppStore {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  addExpenseOpen: boolean;
  setAddExpenseOpen: (open: boolean) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  activeTab: "home",
  setActiveTab: (tab) => set({ activeTab: tab }),
  addExpenseOpen: false,
  setAddExpenseOpen: (open) => set({ addExpenseOpen: open }),
}));
