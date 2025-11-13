import { create } from "zustand";
import type { ShowElement } from "../../types";

/**
 * store the show variable of the send task form
 * so u can use it on other components without passe it in props
 */
export const useShowSendTaskStore = create<ShowElement>((set) => ({
  isOpen: false, // Default value
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
 
}));
export const useShowSendVersStore = create<ShowElement>((set) => ({
  isOpen: false, // Default value
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
 
}));

/**
 * store the show variable of the send task form
 * so u can use it on other components without passe it in props
 */

/**
 * store tge page name of the version and task material
 * Because the version and task material in the Navbar have the same components
 * 
 * export const usePageNameStore = create((set) => ({
 *  page: "",
 * Version: () => set({ page: "Version" }),
 *TaskMat: () => set({ page: "Task Material" }),
 *
 * }));

 */
