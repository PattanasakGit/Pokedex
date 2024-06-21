"use client";
import { IPage } from "@app/models/pageManager";
import { setPageManager } from "@app/store/pagemanagerSlice";
import { setSearchQuery } from "@app/store/pokemonSlice";
import { RootState } from "@app/store/store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector(
    (state: RootState) => state.pokemon.searchQuery
  );
  const pokemonInPocket = useSelector(
    (state: RootState) => state.pokemon.pokemonInPocket
  );
  pokemonInPocket.length;

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(event.target.value));
    dispatch(setPageManager(IPage.PokemonLists));
  };

  const handleClickPocket = () => {
    dispatch(setPageManager(IPage.Pocket));
  };

  const handleClickLogo = () => {
    dispatch(setPageManager(IPage.PokemonLists));
  };

  return (
    <>
      <section>
        <div className="bg-custom-yellow flex items-center justify-between py-3 px-[150px] text-sm">
          <span className="text-custom-black">Welcome to Pokemon shop!</span>
          <div className="flex items-center space-x-4">
            <a
              href="#"
              className="text-custom-black hover:text-gray-600 flex items-center"
            >
              <img
                src="/icons/contact.svg"
                alt="contact"
                className="mr-[6px]"
              />
              Contact: 123456
            </a>
            <p>|</p>
            <a
              href="#"
              className="text-custom-black hover:text-gray-600 flex items-center"
            >
              <img src="/icons/track.svg" alt="track" className="mr-[6px]" />
              Track your order
            </a>
            <p>|</p>
            <a
              href="#"
              className="text-custom-black hover:text-gray-600 flex items-center"
            >
              <img src="/icons/offers.svg" alt="offers" className="mr-[6px]" />
              All Offers
            </a>
          </div>
        </div>
      </section>
      <section className="flex justify-between items-center p-4 px-[150px] bg-white drop-shadow-[0_4px_15px_#0000000a] w-full text-[16px] text-[#666]">
        <img
          src="/img/Pokémon_logo.webp"
          alt="Pokémon"
          className="w-32"
          onClick={handleClickLogo}
        />
        <div className="flex h-[48px] w-[507px] items-center bg-[#f8f8f8] rounded-[10px] p-2 focus-within:outline focus-within:outline-[1.5px] focus-within:outline-custom-yellow">
          <img src="/icons/search.svg" alt="search icon" className="mr-2" />
          <input
            type="text"
            placeholder="Search name Pokémon..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full h-full border-none outline-none bg-[#f8f8f8]"
            style={{ caretColor: "#FFCB05" }}
          />
        </div>
        <div className="flex">
          <div className="flex justify-center items-center cursor-pointer">
            <img src="/icons/user.svg" alt="user" className="mr-2" />
            <span className="mr-6">Username</span>
          </div>
          <p className="mr-6 text-[#D9D9D9]">|</p>
          <div
            className="flex justify-center items-center cursor-pointer relative"
            onClick={handleClickPocket}
          >
            <img src="/icons/cart.svg" alt="cart" className="mr-2" />
            <span>Pocket</span>
            {pokemonInPocket.length > 0 && (
              <div className="absolute top-[-2px] left-[13px] bg-custom-black text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                {pokemonInPocket.length}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Navbar;
