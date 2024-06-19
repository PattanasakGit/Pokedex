export interface IPokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{
    name: string;
    url: string;
  }>;
}

export interface IPokemonListItem {
    name: string;
    url: string;
  }
  
  export interface IPokemonListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: IPokemonListItem[];
  }
  
  interface IPokemonSprites {
    front_default: string;
    back_default: string;
    front_shiny: string;
    back_shiny: string;
  }
  
  interface IPokemonType {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }
  
  interface IPokemonAbility {
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
    slot: number;
  }
  
  interface IPokemonStat {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }
  
  export interface IPokemonDetailResponse {
    id: number;
    name: string;
    base_experience: number;
    height: number;
    weight: number;
    sprites: IPokemonSprites;
    types: IPokemonType[];
    abilities: IPokemonAbility[];
    stats: IPokemonStat[];
  }

  export interface IPokemonState {
    list: IPokemonListResponse | null;
    selected: IPokemonDetailResponse | null;
    searchQuery: string;
    status: 'idle' | 'loading' | 'failed';
  }
  