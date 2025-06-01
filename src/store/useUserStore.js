// store/useUserStore.js
import { create } from "zustand";
import { fetchCurrentUser } from "../data/fetchCurrentUser";

const useUserStore = create((set) => ({
  user: null,
  loading: false,
  fetchUser: async () => {
    set({ loading: true });
    try {
      const user = await fetchCurrentUser();
      set({ user });
    } catch (error) {
      console.error("Failed to fetch user:", error);
    } finally {
      set({ loading: false });
    }
  },
}));

export default useUserStore;
