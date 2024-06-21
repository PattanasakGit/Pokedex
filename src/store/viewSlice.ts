import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@app/store/store";

interface ViewState {
  isListView: boolean;
}

const initialState: ViewState = {
  isListView: false,
};

const viewSlice = createSlice({
  name: "view",
  initialState,
  reducers: {
    setView: (state, action: PayloadAction<boolean>) => {
      state.isListView = action.payload;
    },
  },
});

export const { setView } = viewSlice.actions;
export const selectIsListView = (state: RootState) => state.view.isListView;
export default viewSlice.reducer;
