import pokemonDexService from '@app/services/PokemonDexService';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { IPokemonListResponse, IPokemonDetailResponse } from '@app/models/PokemonModel';

interface PokemonState {
  list: IPokemonDetailResponse[];
  selected: IPokemonDetailResponse,
  pokemonInPocket: { pokemon: IPokemonDetailResponse; quantity: number }[];
  searchQuery: string;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: PokemonState = {
  list: [],
  searchQuery: '',
  pokemonInPocket: [],
  status: 'idle',
  error: null,
  selected: {
    id: 0,
    name: '',
    base_experience: 0,
    height: 0,
    weight: 0,
    sprites: {
      front_default: '',
      back_default: '',
      front_shiny: '',
      back_shiny: ''
    },
    types: [],
    abilities: [],
    stats: [],
  },
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
    setSelectedPokemon(state, action: PayloadAction<IPokemonDetailResponse>) {
      state.selected = action.payload;
    },
    addPokemonToPocket: (state, action: PayloadAction<{ pokemon: IPokemonDetailResponse; quantity: number }>) => {
      const existingIndex = state.pokemonInPocket.findIndex(
        item => item.pokemon.id === action.payload.pokemon.id
      );

      if (existingIndex >= 0) {
        // Update quantity if Pokémon already exists in the pocket
        state.pokemonInPocket[existingIndex].quantity += action.payload.quantity;
      } else {
        // Add new Pokémon to the pocket
        state.pokemonInPocket.push(action.payload);
      }
    },
    removePokemonFromPocket: (state, action: PayloadAction<IPokemonDetailResponse>) => {
      const index = state.pokemonInPocket.findIndex(item => item.pokemon.id === action.payload.id);
      if (index !== -1) {
        state.pokemonInPocket.splice(index, 1); // Remove the item from array
      }
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

export const { setSearchQuery, setSelectedPokemon, addPokemonToPocket , removePokemonFromPocket} = pokemonSlice.actions;

export default pokemonSlice.reducer;

export const getFilteredPokemonList = (state: { pokemon: PokemonState }) =>
  state.pokemon.list.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(state.pokemon.searchQuery.toLowerCase())
  );
