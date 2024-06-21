"use client";
import TagType from "@app/components/TagType/TagType";
import { IPokemonDetailResponse } from "@app/models/PokemonModel";
import Image from "next/image";
import React from "react";

interface GridDisplayProps {
  pokemons: IPokemonDetailResponse[];
  onClick: (pokemon: IPokemonDetailResponse) => void;
}

const GridDisplay: React.FC<GridDisplayProps> = ({
  pokemons,
  onClick: onPokemonClick,
}) => {
  return (
    <div className="max-w-[1440px] mx-auto min-h-[calc(100vh-190px)]">
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[2.875rem] px-4 sm:px-[9.375rem] py-4">
        {pokemons.map((pokemon) => (
          <div
            key={pokemon.name}
            className="flex flex-col items-center w-full sm:w-[15.625rem] drop-shadow-[0_0_15px_#0000000f]"
          >
            <div className="h-[15.625rem] w-full bg-white rounded-t-[0.5rem]">
              <Image
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                alt={pokemon.name}
                height={300}
                width={300}
                layout="responsive"
              />
            </div>
            <div className="bg-custom-gray w-full h-[8rem] flex flex-col justify-end p-[0.625rem] gap-2">
              <p className="text-xl font-bold text-custom-black">
                {pokemon.name}
              </p>
              <TagType type={pokemon.types.map((type) => type.type.name)} />
              <div className="text-[0.875rem] flex justify-center items-center font-bold">
                <button
                  className="mt-2 bg-custom-black text-white py-2 px-6 rounded-lg h-[2.375rem] w-full
                hover:bg-custom-yellow hover:text-custom-black hover:outline hover:outline-[#F8F1D8] 
                transition duration-300 ease-in-out"
                  onClick={() => onPokemonClick(pokemon)}
                >
                  <span className="block relative">Detail</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GridDisplay;