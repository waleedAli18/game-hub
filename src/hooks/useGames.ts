import { useToast } from "@chakra-ui/react";
import { CanceledError } from "axios";
import { useEffect, useState } from "react";
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
  const [games, setGames] = useState<Games[]>([]);
  const [error, setError] = useState("");
  const [isloading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    apiClient
      .get<FetchGamesResponse>("/games", {
        params: {
          genres: gameQuery?.genre?.id,
          page_size: 50,
          platforms: gameQuery?.platform?.id,
          ordering: gameQuery?.sortOrder,
        },
        signal: controller.signal,
      })
      .then((res) => {
        setGames(res.data.results);
        toast({
          title: "Games Fetched Successfully!",
          position: "top-right",
          isClosable: true,
          variant: "subtle",
          status: "success",
        });
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        toast({
          title: err.message,
          position: "top-right",
          isClosable: true,
          variant: "subtle",
          status: "error",
        });
        setLoading(false);
      });
    return () => controller.abort();
  }, [gameQuery]);
  return { games, error, isloading };
};

export default useGames;
