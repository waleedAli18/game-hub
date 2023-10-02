import { useToast } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";

export interface Platform {
  id: number;
  name: string;
  slug: string;
}

export interface Genre {
  id: number;
  name: string;
  image_background: string;
  parent_platforms: { platform: Platform }[];
  metacritic: number;
}

interface FetchGenresResponse {
  count: number;
  results: Genre[];
}

const useGenre = () => {
  const toast = useToast();
  const {
    data: genres,
    error,
    isLoading,
  } = useQuery<Genre[], Error>(
    ["genres"],
    async () => {
      const response = await apiClient.get<FetchGenresResponse>("/genres");
      return response.data.results;
    },
    {
      onSuccess: () => {
        toast({
          title: "Genres Fetched Successfully!",
          position: "top-right",
          isClosable: true,
          variant: "subtle",
          status: "success",
        });
      },
      onError: (err) => {
        toast({
          title: err.message,
          position: "top-right",
          isClosable: true,
          variant: "subtle",
          status: "error",
        });
      },
    }
  );

  return { genres, error, isLoading };
};

export default useGenre;
