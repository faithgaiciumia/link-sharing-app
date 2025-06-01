import { create } from "zustand";
import { fetchCurrentUser } from "../data/fetchCurrentUser";

const useUserStore = create((set) => ({
  user: null,
  fetchAndSetUser: async () => {
    const user = await fetchCurrentUser();
    set({ user });
  },
}));
export default useUserStore;