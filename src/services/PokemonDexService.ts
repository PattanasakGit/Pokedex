import {
  IPokemonListResponse,
  IPokemonDetailResponse,
} from "@app/models/PokemonModel";
import axios, { AxiosInstance } from "axios";

class PokemonDexService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: "https://pokeapi.co/api/v2",
    });
  }

  public async listPokemon(limit: number = 24): Promise<IPokemonListResponse> {
    try {
      const response = await this.axiosInstance.get<IPokemonListResponse>(
        "/pokemon",
        {
          params: {
            limit: limit,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch Pokemon list");
    }
  }

  public async getPokemonDetail(
    nameOrId: string
  ): Promise<IPokemonDetailResponse> {
    try {
      const response = await this.axiosInstance.get<IPokemonDetailResponse>(
        `/pokemon/${nameOrId}`
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch details for Pokemon: ${nameOrId}`);
    }
  }

  public async getMultiplePokemonDetails(
    pokemonList: { name: string }[]
  ): Promise<IPokemonDetailResponse[]> {
    try {
      const promises = pokemonList.map((pokemon) =>
        this.getPokemonDetail(pokemon.name)
      );
      return Promise.all(promises);
    } catch (error) {
      throw new Error("Failed to fetch multiple Pokemon details");
    }
  }
}

const pokemonDexService = new PokemonDexService();
export default pokemonDexService;
