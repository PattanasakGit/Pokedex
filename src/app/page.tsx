"use client";
import PokemonPocketList from "@app/components/Pocket/Pocket";
import PokemonDetail from "@app/components/PokemonDetail/PokemonDetail";
import PokemonList from "@app/components/PokemonLists/PokemonLists";
import { IPage } from "@app/models/pageManager";
import { RootState } from "@app/store/store";
import { useSelector } from "react-redux";

export default function Home() {
  const pageManager = useSelector((state: RootState) => state.pagemanagerSlice);

  const checkPage = () => {
    if (pageManager.PageCurrent === IPage.PokemonLists) {
      return <PokemonList />;
    } else if (pageManager.PageCurrent === IPage.PokemonDetail) {
      return <PokemonDetail />;
    } else if (pageManager.PageCurrent === IPage.Pocket) {
      return <PokemonPocketList />;
    }
  };
  return (
    <>
      <main className="flex flex-col justify-between">{checkPage()}</main>
    </>
  );
}
