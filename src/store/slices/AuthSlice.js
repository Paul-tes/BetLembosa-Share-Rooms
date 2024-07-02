export const createAuthSlice = (set, get) => ({
  isAuthModalOpen: false,
  isLoggedIn: false,
  userInfo: null,
  isEror: false,
  popError: "",
  setError: (popError) => set({popError}),
  setAuthModal: () => {
    set({ isAuthModalOpen: !get().isAuthModalOpen });
  },
  setIsLoggedIn: (status) => {
    set({ isLoggedIn: status });
  },
  setUserInfo: (userInfo) => {
    set({ userInfo });
    if(userInfo !== null) set({isLoggedIn: true});
  },
});