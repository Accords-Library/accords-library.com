import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AppLayoutState {
  subPanelOpen: boolean;
  languagePanelOpen: boolean;
  mainPanelReduced: boolean;
  mainPanelOpen: boolean;
}

const initialState: AppLayoutState = {
  subPanelOpen: false,
  languagePanelOpen: false,
  mainPanelReduced: false,
  mainPanelOpen: false,
};

export const appLayoutSlice = createSlice({
  name: "appLayout",
  initialState,
  reducers: {
    setMainPanelOpen: (state, action: PayloadAction<boolean>) => {
      state.mainPanelOpen = action.payload;
    },

    setLanguagePanelOpen: (state, action: PayloadAction<boolean>) => {
      state.languagePanelOpen = action.payload;
    },

    setSubPanelOpen: (state, action: PayloadAction<boolean>) => {
      state.subPanelOpen = action.payload;
    },

    setMainPanelReduced: (state, action: PayloadAction<boolean>) => {
      state.mainPanelReduced = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setMainPanelOpen,
  setLanguagePanelOpen,
  setSubPanelOpen,
  setMainPanelReduced,
} = appLayoutSlice.actions;

export default appLayoutSlice.reducer;
