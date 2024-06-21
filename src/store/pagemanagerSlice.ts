import { IPage } from '@app/models/pageManager';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IPageManager {
  PageCurrent: IPage;
}

const initialState: IPageManager = {
  PageCurrent: IPage.PokemonLists,
};

const pageManager = createSlice({
  name: 'pageManager',
  initialState,
  reducers: {
    setPageManager: (state, action: PayloadAction<IPage>) => {
      state.PageCurrent = action.payload;
    },
  },
});

export const { setPageManager } = pageManager.actions;
export default pageManager.reducer;
