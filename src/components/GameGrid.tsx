import {
  Alert,
  AlertIcon,
  Button,
  SimpleGrid,
  useToast,
  Wrap,
} from "@chakra-ui/react";
import useGames from "../hooks/useGames";
import GameCard from "./GameCard";

const GameGrid = () => {
  const { games, error } = useGames();

  return (
    <>
      {/* {error &&} */}
      <Wrap></Wrap>
      <SimpleGrid
        padding="15px"
        columns={{ sm: 1, md: 2, lg: 3, xl: 5 }}
        spacing={10}
      >
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </SimpleGrid>
    </>
  );
};

export default GameGrid;