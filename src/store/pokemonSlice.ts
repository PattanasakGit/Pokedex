import pokemonDexService from '@app/services/PokemonDexService';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { IPokemonListResponse, IPokemonDetailResponse } from '@app/models/PokemonModel';

interface PokemonState {
  list: IPokemonDetailResponse[];
  searchQuery: string;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: PokemonState = {
  list: [],
  searchQuery: '',
  status: 'idle',
  error: null,
};

export const fetchPokemonListWithDetails = createAsyncThunk(
  'pokemon/fetchPokemonListWithDetails',
  async () => {
    const listResponse: IPokemonListResponse = await pokemonDexService.listPokemon();
    const details = await pokemonDexService.getMultiplePokemonDetails(listResponse.results);
    return details;
  }
);

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemonListWithDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPokemonListWithDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchPokemonListWithDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch Pokémon list';
      });
  },
});

export const { setSearchQuery } = pokemonSlice.actions;

export default pokemonSlice.reducer;

export const getFilteredPokemonList = (state: { pokemon: PokemonState }) =>
  state.pokemon.list.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(state.pokemon.searchQuery.toLowerCase())
  );