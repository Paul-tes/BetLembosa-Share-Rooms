import { create } from "zustand";
import { createAuthSlice } from "./slices/AuthSlice";

import { createNewHostProcessSlice } from "./slices/HostProcessSlice";

export const useAppStore = create()((...a) => ({
    ...createAuthSlice(...a),
    ...createNewHostProcessSlice(...a),
}));