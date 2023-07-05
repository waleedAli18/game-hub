import { useToast } from "@chakra-ui/react";
import { CanceledError } from "axios";
import { useEffect, useState } from "react";
import apiClient from "../services/api-client";

export interface Games {
  id: number;
  name: string;
  background_image: string;
}

interface FetchGamesResponse {
  count: number;
  results: Games[];
}

const useGames = () => {
  const toast = useToast();
  const [games, setGames] = useState<Games[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    apiClient
      .get<FetchGamesResponse>("/games", { signal: controller.signal })
      .then((res) => {
        setGames(res.data.results);
        toast({
          title: "Games Fetched Successfully!",
          position: "top-right",
          isClosable: true,
          variant: "subtle",
          status: "success",
        });
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
      });
    return () => controller.abort();
  }, []);
  return { games, error };
};

export default useGames;
