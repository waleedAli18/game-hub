import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";

interface Props {
  onSelectSortOrder: (sortOrder: string) => void;
  sortOrder: string;
}

const SortSelector = ({ onSelectSortOrder, sortOrder }: Props) => {
  const sortOrders = [
    { value: "", label: "Relevance" },
    { value: "-added", label: "Date Added" },
    { value: "name", label: "Name" },
    { value: "-released", label: "Release Date" },
    { value: "-metacritic", label: "Popularity" },
    { value: "-rating", label: "Average Rating" },
  ];

  const currentSortOrder = sortOrders.find(
    (order) => order.value === sortOrder
  );

  return (
    <Menu>
      {({ isOpen }) => (
        <>
          <MenuButton
            as={Button}
            rightIcon={isOpen ? <BsChevronUp /> : <BsChevronDown />}
          >
            Order by: {currentSortOrder?.label ?? "Relevance"}
          </MenuButton>
          {sortOrders && (
            <MenuList>
              {sortOrders.map((order) => (
                <MenuItem
                  onClick={() => onSelectSortOrder(order.value)}
                  key={order.label}
                  value={order.value}
                >
                  {order.label}
                </MenuItem>
              ))}
            </MenuList>
          )}
        </>
      )}
    </Menu>
  );
};

export default SortSelector;
