import { useToast } from "@chakra-ui/react";
import { CanceledError } from "axios";
import { useEffect, useState } from "react";
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
  const [data, setData] = useState<Platforms[]>([]);
  const [error, setError] = useState("");
  const [isloading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    apiClient
      .get<FetchPlatform>("/platforms/lists/parents", {
        signal: controller.signal,
      })
      .then((res) => {
        setData(res?.data?.results);
        toast({
          title: "Platform Fetched Successfully!",
          position: "top-right",
          isClosable: true,
          variant: "subtle",
          status: "success",
        });
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        toast({
          title: err.message,
          position: "top-right",
          isClosable: true,
          variant: "subtle",
          status: "error",
        });
        setLoading(false);
      });
    return () => controller.abort();
  }, []);
  return { data, error, isloading };
};

export default usePlatforms;
