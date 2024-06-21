"use client";
import TagType from "@app/components/TagType/TagType";
import { IPokemonDetailResponse } from "@app/models/PokemonModel";
import Image from "next/image";
import React from "react";

interface ListDisplayProps {
  pokemons: IPokemonDetailResponse[];
  onClick: (pokemon: IPokemonDetailResponse) => void;
}

const ListDisplay: React.FC<ListDisplayProps> = ({
  pokemons,
  onClick: onPokemonClick,
}) => {
  return (
    <div className="list px-[150px] py-4 ">
      {pokemons.map((pokemon) => (
        <div
          key={pokemon.name}
          className="flex flex-row items-center w-full rounded-[8px] mb-4 h-[108px] p-4"
          style={{ boxShadow: "0px 0px 10px 0px #0000000A" }}
          onClick={() => onPokemonClick(pokemon)}
        >
          <div className="h-[100px] w-[100px] rounded-t-[8px] flex justify-center items-center">
            <Image
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
              alt={pokemon.name}
              height={80}
              width={80}
            />
          </div>
          <div className="w-full h-[100px] flex flex-col justify-center p-[10px] gap-2 ml-4">
            <p className="text-lg font-bold text-custom-black text-[18px]">
              {pokemon.name}
            </p>
            <TagType type={pokemon.types.map((type) => type.type.name)} />
            <div className="text-custom-darkGray text-[12px] flex gap-1">
              <p>Abilities:</p>
              <p>{pokemon.abilities.map((ability) => ability.ability.name).join(', ')}</p>

            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListDisplay;
