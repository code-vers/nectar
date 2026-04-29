import { RegisterTYpe } from "@/types/user.type";
import { base_url } from "@/utils/utils";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "user",
  baseQuery: fetchBaseQuery({
    baseUrl: `${base_url}/auth`,
  }),

  endpoints: (builder) => ({
    userRegister: builder.mutation({
      query: (data: RegisterTYpe) => ({
        url: "/register",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useUserRegisterMutation } = authApi;
