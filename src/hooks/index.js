import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
export { default as useToast } from "./Toast";
export function useDevicesInfo() {
  return useQuery(
    "devices-info",
    async () => {
      const data = await axios.get("/devices/info").then(({ data }) => data);
      return data;
    },
    {
      staleTime: 60000,
    }
  );
}
export function useModelsInfo() {
  return useQuery(
    "models-info",
    async () => {
      const data = await axios.get("/models/info").then(({ data }) => data);
      return data;
    },
    {
      staleTime: 60000,
    }
  );
}
export function useMutationModel() {
  const queryClient = useQueryClient();
  return useMutation((data) => axios.post("/models", data), {
    onSuccess: () => {
      queryClient.invalidateQueries("models-info");
    },
  });
}
