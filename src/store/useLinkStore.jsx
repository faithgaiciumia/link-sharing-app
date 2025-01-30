import { create } from "zustand";

const useLinkStore = create((set) => ({
  links: [],
  profile: {
    firstName: "",
    lastName: "",
    bio: "",
    avatar: "",
  },
  username: "",
  setUsername: (newUsername) => set(() => ({ username: newUsername })),
  generatedLink: "",
  isLoading: false,
  error: null,

  updateProfile: (profileData) =>
    set((state) => ({ profile: { ...state.profile, ...profileData } })),

  addLink: (newLink) => set((state) => ({ links: [...state.links, newLink] })),
  removeLink: (indexToRemove) =>
    set((state) => ({
      links: state.links.filter((_, i) => i !== indexToRemove),
    })),
  generateLink: () =>
    set((state) => ({
      generatedLink: `https://link-sharing.com/${state.username}`,
    })),

  setLoading: (status) => set(() => ({ isLoading: status })),
}));
export default useLinkStore;
