import { create } from "zustand";

interface User {
  name: string;
  email: string;
  profileUrl?: string;
}

interface UserStore {
  user: User | null;
  isLoggedIn: boolean;
  setUser: (user: User) => void;
  logout: () => void;
}

/**
 * Usage Example
 * const user = useUserStore((state) => state.user);
 * const isLoggedIn = useUserStore((state) => state.isLoggedIn);
 */
const useUserStore = create<UserStore>((set) => ({
  user: null,
  isLoggedIn: false,
  setUser: (user) =>
    set({
      user,
      isLoggedIn: true,
    }),
  logout: () =>
    set({
      user: null,
      isLoggedIn: false,
    }),
}));

export default useUserStore;
