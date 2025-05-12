import { create } from "zustand";
import { userInfo } from "@/entities/users/type";
import { userLogOut } from "./storage";

interface userStore {
  user: userInfo | null;
  isLoggedIn: boolean;
  saveUser: (user: userInfo) => void;
  logout: () => void;
}

/**
 * Usage Example
 * const user = useUserStore((state) => state.user);
 * const isLoggedIn = useUserStore((state) => state.isLoggedIn);
 */
const useUserStore = create<userStore>((set) => ({
  user: null,
  isLoggedIn: false,
  saveUser: async (user: userInfo) => {
    try {
      set({ user });
      set({ isLoggedIn: true });
    } catch (error) {
      console.error("Error while saving user info:", error);
    }
  },
  logout: async () => {
    try {
      await userLogOut();
      set({ user: null });
      set({ isLoggedIn: false });
    } catch (error) {
      console.error("Error while deleting user info:", error);
    }
  },
}));

export default useUserStore;
