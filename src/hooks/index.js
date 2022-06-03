import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import Toast from "./Toast";
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
export function useMutationModel({ onSuccess }) {
  const queryClient = useQueryClient();
  const errorToast = Toast("error");
  return useMutation((data) => axios.post("/models", data), {
    onSuccess: () => {
      onSuccess();
      queryClient.invalidateQueries("models-info");
    },
    onError: (error, variables, context) => {
      errorToast(error.response?.data);
    },
  });
}
export function useToast(prop) {
  return Toast(prop);
}
export * from "./api";
export * from "./io";
