import { Card, CardBody, Heading, HStack, Image } from "@chakra-ui/react";
import { Games } from "../hooks/useGames";
import CriticScore from "./CriticScore";
import PlatformIconList from "./PlatformIconList";

interface Props {
  game: Games;
}

const GameCard = ({ game }: Props) => {
  return (
    <>
      <Card borderRadius="10px" overflow="hidden">
        <Image
          height="250px"
          objectFit="cover"
          objectPosition="center"
          src={game.background_image}
        />
        <CardBody>
          <Heading fontSize="2xl">{game.name}</Heading>
          <HStack justifyContent="space-between">
            <PlatformIconList
              platform={game.parent_platforms.map((p) => p.platform)}
            />
            <CriticScore score={game.metacritic} />
          </HStack>
        </CardBody>
      </Card>
    </>
  );
};

export default GameCard;
