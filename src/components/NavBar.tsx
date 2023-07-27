import { HStack, Image, Link } from "@chakra-ui/react";
import logo from "../assets/images/Logo.png";
import ColorModeSwitch from "./ColorModeSwitch";
import SearchInput from "./SearchInput";

interface Props {
  onSearch: (searchText: string) => void;
}

const NavBar = ({ onSearch }: Props) => {
  return (
    <>
      <HStack padding="10px">
        <Link href="/">
          <Image objectFit="contain" src={logo} boxSize="55px" />
        </Link>
        <SearchInput onSearch={onSearch} />
        <ColorModeSwitch />
      </HStack>
    </>
  );
};

export default NavBar;
