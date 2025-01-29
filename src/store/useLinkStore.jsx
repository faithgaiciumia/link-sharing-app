import { create } from "zustand";

const useLinkStore = create((set) => ({
  links: [],
  profile: {
    firstName: "",
    lastName: "",
    email: "",
    bio: "",
    avatar: "",
  },
  generatedLink: "",
  isLoading: false,
  error: null,

  updateProfile: (profileData) =>
    set((state) => ({ profile: { ...state.profile, ...profileData } })),

  addLink: (newLink) => set((state) => ({ links: [...state.links, newLink] })),
  removeLink: (indexToRemove) =>
    set((state) => ({
      links: state.links.filter((_, i) => i != indexToRemove),
    })),
  generateLink: () =>
    set(() => {
      const uniqueID = Math.random().toString(36).substring(2, 8);
      return { generatedLink: `https://link-sharing.com/${uniqueID}` };
    }),

  setLoading: (status) => set(() => ({ isLoading: status })),
}));
export default useLinkStore;
