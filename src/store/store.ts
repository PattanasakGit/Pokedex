import pokemonReducer from './pokemonSlice';
import { configureStore } from '@reduxjs/toolkit';
import filteredPokemonReducer from './filteredPokemonSlice';

const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
    filteredPokemon: filteredPokemonReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
