import { create } from "zustand";
import { createAuthSlice } from "./slices/AuthSlice";
import { createLisitingsSlice } from "./slices/ListingsSlice";

import { createNewHostProcessSlice } from "./slices/HostProcessSlice";

export const useAppStore = create()((...a) => ({
    ...createAuthSlice(...a),
    ...createNewHostProcessSlice(...a),
    ...createLisitingsSlice(...a),
}));