"use client";
import Navbar from "@app/components/Navbar";
import PokemonList from "@app/components/PokemonLists";
import store from "@app/store/store";
import { Provider } from "react-redux";

export default function Home() {
  return (
    <Provider store={store}>
      <Navbar />
      <main className="flex min-h-screen flex-col justify-between px-24">
        <PokemonList />
      </main>
    </Provider>
  );
}
