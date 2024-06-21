"use client";
import TabView from "@app/components/ViewTab/ViewTab";
import { IPokemonDetailResponse } from "@app/models/PokemonModel";
import { fetchPokemonListWithDetails, getFilteredPokemonList, setSelectedPokemon } from "@app/store/pokemonSlice";
import { AppDispatch, RootState } from "@app/store/store";
import { selectIsListView } from "@app/store/viewSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import GridDisplay from "./GridDisplay";
import ListDisplay from "./ListDisplay";
import { setPageManager } from "@app/store/pagemanagerSlice";
import { IPage } from "@app/models/pageManager";
import Image from "next/image";

const PokemonList = () => {
  const dispatch: AppDispatch = useDispatch();
  const { status } = useSelector((state: RootState) => state.pokemon);
  const isListView = useSelector(selectIsListView);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPokemonListWithDetails());
    }
  }, [dispatch, status]);

  const handlePokemonClick = (pokemon: IPokemonDetailResponse) => {
    dispatch(setSelectedPokemon(pokemon));
    dispatch(setPageManager(IPage.PokemonDetail));
    console.log(pokemon);
  };

  const filteredPokemon = useSelector((state: RootState) => getFilteredPokemonList(state));

  return (
    <>
      <TabView />
      {filteredPokemon.length > 0 ? (
        isListView ? (
          <ListDisplay pokemons={filteredPokemon} onClick={handlePokemonClick} />
        ) : (
          <GridDisplay pokemons={filteredPokemon} onClick={handlePokemonClick} />
        )
      ) : (
        <div className="flex flex-col items-center min-h-[calc(100vh-190px)] mt-[70px]">
          <Image src="/icons/emptySearch.svg" alt="No results" width={64} height={64} />
          <p className="mt-4 text-[#909090] text-lg">Oops! Nothing was found for "Aoooooo".</p>
          <p className="text-[#909090] text-lg">Please try to search for something else.</p>
        </div>
      )}
    </>
  );
};

export default PokemonList;
