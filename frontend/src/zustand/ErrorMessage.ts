import { create } from "zustand";

type State = {
    error: string;
};

type Actions = {
    setError: (error: string) => void;
};

export const useErrorMessageStore = create<State & Actions>((set) => ({
    error: "",
    setError: (error: string) => set({ error })
}));