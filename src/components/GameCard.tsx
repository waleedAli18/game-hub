import { Card, CardBody, Heading, HStack, Image } from "@chakra-ui/react";
import { Games } from "../hooks/useGames";
import getCroppedImageUrl from "../services/image-url";
import CriticScore from "./CriticScore";
import PlatformIconList from "./PlatformIconList";

interface Props {
  game: Games;
}

const GameCard = ({ game }: Props) => {
  return (
    <>
      <Card>
        <Image
          height="250px"
          objectFit="cover"
          objectPosition="center"
          src={getCroppedImageUrl(game.background_image)}
        />
        <CardBody paddingY={4}>
          <HStack justifyContent="space-between" marginBottom={1}>
            <PlatformIconList
              platform={game.parent_platforms.map((p) => p.platform)}
            />
            <CriticScore score={game.metacritic} />
          </HStack>
          <Heading fontSize="22px">{game.name}</Heading>
        </CardBody>
      </Card>
    </>
  );
};

export default GameCard;
