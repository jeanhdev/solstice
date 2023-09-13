import { getQueryKey } from "@trpc/react-query";

import { queryClient } from "@nebula/providers";
import { GetMeOutput } from "@nebula/server/api/routers/user/outputs";
import { hasErrorKey } from "@nebula/types";
import { api } from "@nebula/utils/api";

export function useMe() {
  console.log(getQueryKey(api.user.getMe));

  const data = queryClient.getQueryData<GetMeOutput>([
    ["user", "getMe"],
    { type: "query" },
  ]);

  if (!data) {
    throw new Error("The data from `user.getMe()` is undefined");
  }

  if (hasErrorKey(data)) {
    throw new Error(data.errorKey);
  }

  return {
    data,
  };
}
