import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPokemonDetailResponse } from '@app/models/PokemonModel';

interface FilteredPokemonState {
  filteredPokemon: IPokemonDetailResponse[];
}

const initialState: FilteredPokemonState = {
  filteredPokemon: [],
};

const filteredPokemonSlice = createSlice({
  name: 'filteredPokemon',
  initialState,
  reducers: {
    setFilteredPokemon: (state, action: PayloadAction<IPokemonDetailResponse[]>) => {
      state.filteredPokemon = action.payload;
    },
  },
});

export const { setFilteredPokemon } = filteredPokemonSlice.actions;
export default filteredPokemonSlice.reducer;