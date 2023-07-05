import { Alert, AlertIcon, Button, useToast, Wrap } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import apiClient from "../services/api-client";

interface Games {
  id: number;
  name: string;
}

interface FetchGamesResponse {
  count: number;
  results: Games[];
}

const GameGrid = () => {
  const [games, setGames] = useState<Games[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    apiClient
      .get<FetchGamesResponse>("/games")
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
        setError(err.message);
        toast({
          title: err.message,
          position: "top-right",
          isClosable: true,
          variant: "subtle",
          status: "error",
        });
      });
  }, []);

  const toast = useToast();

  return (
    <>
      {/* {error &&} */}
      <Wrap></Wrap>
      <ul>
        {games.map((game) => (
          <li key={game.id}>{game.name}</li>
        ))}
      </ul>
    </>
  );
};

export default GameGrid;
