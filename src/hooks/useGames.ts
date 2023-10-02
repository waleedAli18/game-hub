import { useToast } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { CanceledError } from "axios";
import { GameQuery } from "../App";
import apiClient from "../services/api-client";

export interface Platform {
  id: number;
  name: string;
  slug: string;
}

export interface Games {
  id: number;
  name: string;
  background_image: string;
  parent_platforms: { platform: Platform }[];
  metacritic: number;
}

interface FetchGamesResponse {
  count: number;
  results: Games[];
}

const useGames = (gameQuery: GameQuery) => {
  const toast = useToast();

  const {
    data: games = [],
    error,
    isLoading,
  } = useQuery<Games[], Error>(
    ["games", gameQuery?.genre?.id], // unique query key based on gameQuery
    async () => {
      const response = await apiClient.get<FetchGamesResponse>("/games", {
        params: {
          genres: gameQuery?.genre?.id,
          page_size: 50,
          platforms: gameQuery?.platform?.id,
          ordering: gameQuery?.sortOrder,
          search: gameQuery.searchText,
        },
      });
      return response.data.results;
    },
    {
      onError: (err) => {
        if (!(err instanceof CanceledError)) {
          toast({
            title: err.message,
            position: "top-right",
            isClosable: true,
            variant: "subtle",
            status: "error",
          });
        }
      },
    }
  );

  return { games, error, isLoading };
};

export default useGames;
