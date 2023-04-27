import { pb } from "../../libs/pocketbase";
import useSWRMutation from "swr/mutation";

const login = async (key, { arg }) => {
  const { email, password } = arg;
  const authData = await pb
    .collection("users")
    .authWithPassword(email, password);
  return authData;
};

export default function useLogin() {
  const { trigger, data, error, isMutating } = useSWRMutation(
    "UserLogin",
    login
  );

  return {
    trigger,
    data,
    error,
    isMutating,
  };
}
