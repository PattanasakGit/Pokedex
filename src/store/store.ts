import viewReducer from "@app/store/viewSlice";
import { configureStore } from "@reduxjs/toolkit";
import pokemonReducer from "@app/store/pokemonSlice";
import filteredPokemonReducer from "@app/store/filteredPokemonSlice";
import pagemanagerSlice from "./pagemanagerSlice";

const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
    filteredPokemon: filteredPokemonReducer,
    view: viewReducer,
    pagemanagerSlice:pagemanagerSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
