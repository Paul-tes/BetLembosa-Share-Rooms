import { create } from "zustand";
import { createAuthSlice } from "./slices/AuthSlice";

export const userAppStore = create()((...a) => ({
    ...createAuthSlice(...a)
}));