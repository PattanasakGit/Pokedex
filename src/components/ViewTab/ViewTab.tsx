"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@app/store/store";
import { getFilteredPokemonList } from "@app/store/pokemonSlice";
import { setView, selectIsListView } from "@app/store/viewSlice";

const TabView = () => {
  const dispatch: AppDispatch = useDispatch();
  const filteredPokemon = useSelector((state: RootState) => getFilteredPokemonList(state));
  const { searchQuery } = useSelector((state: RootState) => state.pokemon);
  const isListView = useSelector(selectIsListView);

  const checkSearch = () => {
    if (searchQuery.length > 0) {
      return <div>Search Result ({filteredPokemon.length} Product)</div>;
    } else {
      return <div>Products ({filteredPokemon.length})</div>;
    }
  };

  const showIcon = (nameImg: string) => {
    return <img src={`/icons/${nameImg}.svg`} alt={nameImg} />;
  };

  const toggleView = (isList: boolean) => {
    dispatch(setView(isList));
  };

  return (
    <div className="flex justify-between items-center text-[16px] font-semibold px-[150px] h-8 my-4">
      {checkSearch()}
      <div className="flex justify-center items-center">
        <button
          className={`px-4 py-2 rounded-l-lg h-full ${!isListView ? 'bg-custom-yellow' : 'bg-[#f9f9f9]'}`}
          onClick={() => toggleView(false)}
        >
          {showIcon('grid')}
        </button>
        <button
          className={`px-4 py-2 rounded-r-lg h-full ${isListView ? 'bg-custom-yellow' : 'bg-[#f9f9f9]'}`}
          onClick={() => toggleView(true)}
        >
          {showIcon('list')}
        </button>
      </div>
    </div>
  );
};

export default TabView;
