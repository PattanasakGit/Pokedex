"use client";
import { getFilteredPokemonList } from "@app/store/pokemonSlice";
import { RootState } from "@app/store/store";
import React from "react";
import { useSelector } from "react-redux";

const TabView = () => {
  const filteredPokemon = useSelector((state: RootState) =>
    getFilteredPokemonList(state)
  );
  const { list, searchQuery, status } = useSelector(
    (state: RootState) => state.pokemon
  );

  const checksearch = () => {
    if (searchQuery.length > 0) {
      return <div>Search Result ({filteredPokemon.length} Product)</div>;
    } else {
      return <div>Products ({filteredPokemon.length})</div>;
    }
  };

  const showIcon =(nameImg:string)=>{
    return <img src={`/icons/${nameImg}.svg`} alt={nameImg} />
  }

  return (
    <div className="flex justify-between items-center text-[16px] font-semibold px-[150px] h-8 my-4">
      {checksearch()}
      <div className="flex justify-center items-center">
        <div className="bg-yellow-400 px-4 py-2 rounded-l-lg h-full"> {showIcon('grid')} </div>
        <div className="bg-gray-300 px-4 py-2 rounded-r-lg"> {showIcon('list')} </div>
      </div>
    </div>
  );
};

export default TabView;
