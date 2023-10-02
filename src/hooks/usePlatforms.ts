import { useToast } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { CanceledError } from "axios";
import apiClient from "../services/api-client";

interface Platforms {
  id: number;
  name: string;
  slug: string;
}

interface FetchPlatform {
  count: number;
  results: Platforms[];
}

const usePlatforms = () => {
  const toast = useToast();

  const {
    data = [],
    error,
    isLoading,
  } = useQuery<Platforms[], Error>(
    ["platforms"],
    async () => {
      const response = await apiClient.get<FetchPlatform>(
        "/platforms/lists/parents"
      );
      return response.data.results;
    },
    {
      onError: (err) => {
        if (!(err instanceof CanceledError)) {
          toast({
            title: err.message,
            position: "top-right",
            isClosable: true,
            variant: "subtle",
            status: "error",
          });
        }
      },
    }
  );

  return { data, error, isLoading };
};

export default usePlatforms;
