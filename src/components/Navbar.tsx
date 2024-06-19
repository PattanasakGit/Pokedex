"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@app/store/store";
import { setSearchQuery } from "@app/store/pokemonSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector(
    (state: RootState) => state.pokemon.searchQuery
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(event.target.value));
  };

  return (
    <>
      <section>
        <div className="bg-yellow-400 flex items-center justify-between py-2 px-[150px] text-sm">
          <span className="text-gray-800">Welcome to Pokemon shop!</span>
          <div className="flex items-center space-x-4">
            <a
              href="#"
              className="text-gray-800 hover:text-gray-600 flex items-center"
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
              className="text-gray-800 hover:text-gray-600 flex items-center"
            >
              <img src="/icons/track.svg" alt="track" className="mr-[6px]" />
              Track your order
            </a>
            <p>|</p>
            <a
              href="#"
              className="text-gray-800 hover:text-gray-600 flex items-center"
            >
              <img src="/icons/offers.svg" alt="offers" className="mr-[6px]" />
              All Offers
            </a>
          </div>
        </div>
      </section>
      <section className="flex justify-between items-center mb-4 p-4 px-[150px] bg-white drop-shadow-[0_4px_15px_#0000000a] w-full text-[16px] text-[#666]">
        <img src="/img/Pokémon_logo.webp" alt="Pokémon" className="w-32" />
        <input
          type="text"
          placeholder="Search name Pokémon..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="p-2 border rounded-md w-1/3"
        />
        <div className="flex">
          <div className="flex justify-center items-center cursor-pointer">
            <img src="/icons/user.svg" alt="user" className="mr-2" />
            <span className="mr-4">Username</span>
          </div>
          <div className="flex justify-center items-center cursor-pointer">
            <img src="/icons/cart.svg" alt="cart" className="mr-2" />
            <span>Pocket</span>
          </div>
        </div>
      </section>
    </>
  );
};

export default Navbar;
