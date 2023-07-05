import { Card, CardBody, Heading, Image } from "@chakra-ui/react";
import React from "react";
import { Games } from "../hooks/useGames";

interface Props {
  game: Games;
}

const GameCard = ({ game }: Props) => {
  return (
    <>
      <Card borderRadius="10px" overflow="hidden">
        <Image src={game.background_image} />
        <CardBody>
          <Heading fontSize="2xl">{game.name}</Heading>
        </CardBody>
      </Card>
    </>
  );
};

export default GameCard;
