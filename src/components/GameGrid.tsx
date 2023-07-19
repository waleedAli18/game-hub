import { Center, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import { GameQuery } from "../App";
import useGames from "../hooks/useGames";
import GameCard from "./GameCard";
import GameCardContainer from "./GameCardContainer";
import GameCardSkeleton from "./GameCardSkeleton";

interface Props {
  gameQuery: GameQuery;
}

const GameGrid = ({ gameQuery }: Props) => {
  const { games, error, isloading } = useGames(gameQuery);
  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  if (error) {
    return (
      <>
        <Text>{error}</Text>
      </>
    );
  } else if (games.length === 0 && !isloading && !error) {
    return (
      <>
        <Center h="50vh" color="#01a6de">
          <Heading as="h1" size="2xl" noOfLines={1}>
            No Games Found!
          </Heading>
        </Center>
      </>
    );
  }

  return (
    <>
      <SimpleGrid
        paddingY="15px"
        columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
        spacing={3}
      >
        {isloading &&
          skeletons.map((skeleton) => (
            <GameCardContainer key={skeleton}>
              <GameCardSkeleton key={skeleton} />
            </GameCardContainer>
          ))}
        {games.map((game) => (
          <GameCardContainer key={game.id}>
            <GameCard key={game.id} game={game} />
          </GameCardContainer>
        ))}
      </SimpleGrid>
    </>
  );
};

export default GameGrid;
