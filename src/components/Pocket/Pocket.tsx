import { IPokemonDetailResponse } from "@app/models/PokemonModel";
import { removePokemonFromPocket } from "@app/store/pokemonSlice";
import { RootState } from "@app/store/store";
import Image from "next/image";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import TagType from "../TagType/TagType";

const PokemonPocketList: React.FC = () => {
  window.scrollTo(0, 0);
  const dispatch = useDispatch();
  const pokemonInPocket = useSelector(
    (state: RootState) => state.pokemon.pokemonInPocket
  );

  const handleRemovePokemon = (pokemon: IPokemonDetailResponse) => {
    dispatch(removePokemonFromPocket(pokemon));
  };

  const totalQuantity = pokemonInPocket.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <section className=" bg-custom-gray w-[99vdw] min-h-[calc(100vh-178px)] px-[150px] pt-14 text-custom-black">
      <div className="flex justify-center gap-[44px]">
        <div className="w-[954px] bg-white p-6 rounded-[8px]">
          <h2 className="font-bold mb-4 text-[1rem] font-blod">
            Pocket list ({pokemonInPocket.length})
          </h2>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 text-start text-sm font-blod">
                  Product name
                </th>
                <th className="py-2 text-center text-sm font-blod">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {pokemonInPocket.map((item) => (
                <tr key={item.pokemon.id} className="border-t">
                  <td className="flex items-center py-4">
                    <Image
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${item.pokemon.id}.png`}
                      alt={item.pokemon.name}
                      width={50}
                      height={50}
                      className="mr-4"
                    />
                    <div>
                      <p className="font-bold mb-2 text-[1rem] font-blod">{item.pokemon.name}</p>
                      <TagType
                        type={item.pokemon.types.map((type) => type.type.name)}
                      />
                    </div>
                  </td>
                  <td className="py-4 text-center self-center">
                    <h3>{item.quantity}</h3>
                  </td>
                  <td>
                    <button
                      onClick={() => handleRemovePokemon(item.pokemon)}
                      className="ml-2 text-red-500"
                    >
                      <img src="/icons/bin.svg" alt="bin" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="w-[282px] h-[240px] rounded-lg shadow-md">
          <h3 className="text-[16px] font-bold mb-4 p-[10px] bg-[#FFF9E3] w-full">
            Order Summary
          </h3>
          <div className="p-4">
            <div className="flex justify-between">
              <p className="mb-2 text-sm">Subtotal:</p>
              <p className="mb-2 text-sm font-bold">
                {pokemonInPocket.length} Product
              </p>
            </div>
            <div className="flex justify-between">
              <p className="mb-4 text-sm">Quantity:</p>
              <p className="mb-4 text-sm font-bold">{totalQuantity} Quantity</p>
            </div>

            <button className="w-full py-2 bg-custom-red text-white rounded-lg hover:scale-105  mt-10 mb-5">
              Proceed To Checkout
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PokemonPocketList;
