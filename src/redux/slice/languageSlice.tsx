import { createSlice } from "@reduxjs/toolkit";
import i18n from "../../../i18n";

const languageSlice = createSlice({
  name: "language",
  initialState: { lang: "enUS" },
  reducers: {
    toggleLanguage: (state) => {
      state.lang = state.lang === "enUS" ? "enUK" : "enUS";
      i18n.changeLanguage(state.lang); // 🔥 instantly change language
    },
    setLanguage: (state, action) => {
      state.lang = action.payload;
      i18n.changeLanguage(state.lang);
    },
  },
});

export const { toggleLanguage, setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
