"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import TagType from "@app/components/TagType";
import TabView from "@app/components/ViewTab";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@app/store/store";
import { IPokemonDetailResponse } from "@app/models/PokemonModel";
import {
  fetchPokemonListWithDetails,
  getFilteredPokemonList,
} from "@app/store/pokemonSlice";

const PokemonList = () => {
  const dispatch: AppDispatch = useDispatch();
  const { list, searchQuery, status } = useSelector(
    (state: RootState) => state.pokemon
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPokemonListWithDetails());
    }
  }, [dispatch, status]);

  const handlePokemonClick = (pokemon: IPokemonDetailResponse) => {
    console.log(pokemon);
  };

  const filteredPokemon = useSelector((state: RootState) =>
    getFilteredPokemonList(state)
  );

  return (
    <section className="">
      <TabView />
      <div className="grid grid-cols-4 gap-[46px] px-[150px] py-4">
        {filteredPokemon.map((pokemon) => (
          <div
            key={pokemon.name}
            className="flex flex-col items-center w-[250px] drop-shadow-[0_0_15px_#0000000f]"
          >
            <div className="h-[250px] bg-white rounded-t-[8px]">
              <Image
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                alt={pokemon.name}
                height={250}
                width={250}
              />
            </div>
            <div className="bg-[#fafafa] w-full h-[128px] flex flex-col justify-end p-[10px] gap-2">
              <p className="text-lg font-bold text-[#373737] text-[18px]">
                {pokemon.name}
              </p>
              <TagType type={pokemon.types.map((type) => type.type.name)} />
              <div className="text-[14px] flex justify-center items-center font-bold">
                <button
                  className="mt-2 bg-[#373737] text-white py-2 px-6 rounded-lg h-[38px] w-[230px]
              hover:bg-[#FFCB05] hover:text-[#373737] hover:outline hover:outline-[#F8F1D8] "
                  onClick={() => handlePokemonClick(pokemon)}
                >
                  <span className="block relative">Detail</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PokemonList;
