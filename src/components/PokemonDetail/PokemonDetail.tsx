import { IPage } from "@app/models/pageManager";
import { setPageManager } from "@app/store/pagemanagerSlice";
import { addPokemonToPocket } from "@app/store/pokemonSlice";
import { RootState } from "@app/store/store";
import Image from "next/image";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TagType from "../TagType/TagType";

const PokemonDetail: React.FC = () => {
  window.scrollTo(0, 0);
  const dispatch = useDispatch();
  const pokemon = useSelector((state: RootState) => state.pokemon.selected);
  const [quantity, setQuantity] = useState(1);
  console.log('this is PokemonDetail.... ', pokemon);

  const increment = () => setQuantity(quantity + 1);
  const decrement = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  const addToPocket = () => {
    dispatch(addPokemonToPocket({ pokemon, quantity }));
    toast.success(`Added ${quantity} ${pokemon.name} to your pocket!`, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleBack = () => {
    dispatch(setPageManager(IPage.PokemonLists));
  }

  return (
    <section className="flex flex-col items-center bg-custom-gray w-[99vdw] min-h-[calc(100vh-178px)] px-[150px]">
      <ToastContainer />
      <button className="flex items-center mt-4 font-semibold self-start mb-4 text-gray-600 hover:text-custom-black" onClick={handleBack}>
        <img src="/icons/back.svg" />
        Back
      </button>
      <div className="flex flex-col lg:flex-row bg-white px-[14px] py-[16px] rounded-lg shadow-md w-full h-[385px]">
        <div className="flex items-center justify-center ">
          <Image
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
            alt={pokemon.name}
            width={353}
            height={353}
            className="rounded-md"
          />
        </div>
        <div className="flex flex-col lg:w-1/2 lg:pl-14">
          <h2 className="text-2xl font-bold mb-2 capitalize">{pokemon.name}</h2>
          <TagType type={pokemon.types.map((type) => type.type.name)} />
          <div className="flex gap-4 mb-4 text-sm text-custom-black font-light mt-2">
            <h3 className="font-light text-sm">Stats:</h3>
            <p>{pokemon.stats.map((stat) => stat.stat.name).join(", ")}</p>
          </div>
          <div className="flex gap-4 mb-4 text-sm text-custom-black font-light">
            <h3 className="font-light text-sm">Abilities:</h3>
            <p>
              {pokemon.abilities.map((ability) => ability.ability.name).join(", ")}
            </p>
          </div>
          <div className="flex items-center mb-8">
            <h3 className="font-light mr-2 text-sm">Quantity:</h3>
            <div className="flex items-center border border-custom-black rounded-[8px]">
              <button
                onClick={decrement}
                className="px-3 py-1 text-custom-black bg-white hover:bg-gray-300 rounded-l-lg"
              >
                -
              </button>
              <span className="px-4 py-1 bg-custom-gray">{quantity}</span>
              <button
                onClick={increment}
                className="px-3 py-1 text-custom-black bg-white hover:bg-gray-300 rounded-r-lg"
              >
                +
              </button>
            </div>
          </div>
          <button
            onClick={addToPocket}
            className="flex items-center justify-center gap-2 bg-[#ff6f61] h-[50px] w-[254px] text-white py-2 px-6 rounded-[8px] hover:scale-105"
          >
            <img src="/icons/cart_white.svg" alt="cart_white" />
            Add To Pocket
          </button>
        </div>
      </div>
    </section>
  );
};

export default PokemonDetail;