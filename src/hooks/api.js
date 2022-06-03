import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Toast from "./Toast";
export function useServiceInfo() {
  return useQuery(
    "service-info",
    async () => {
      const data = await axios.get("/microservices").then(({ data }) => data);
      return data;
    },
    {
      staleTime: 60000,
    }
  );
}
export function useProvision({ onSuccess = () => {} }) {
  const queryClient = useQueryClient();
  const errorToast = Toast("error");
  return useMutation(
    (data) =>
      axios.get("/devies/provision", {
        params: {
          id: data,
        },
      }),
    {
      onSuccess: () => {
        onSuccess();
        queryClient.invalidateQueries("devices-info");
      },
      onError: (error, variables, context) => {
        errorToast(error.response?.data);
      },
    }
  );
}
export function useProtcolConfig(name) {
  return useQuery(
    `protocol?${name}`,
    async () => {
      const data = await axios
        .get("/protocol", {
          params: {
            id: name,
          },
        })
        .then(({ data }) => data);
      return data;
    },
    {
      staleTime: 60000,
    }
  );
}
export function useTask() {
  return useQuery(
    "task",
    async () => {
      const data = await axios.get("/tasks").then(({ data }) => data);
      return data;
    },
    {
      staleTime: 60000,
    }
  );
}
