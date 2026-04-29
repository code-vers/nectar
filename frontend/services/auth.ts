import { RegisterTYpe } from "@/types/user.type";
import { base_url } from "@/utils/utils";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// ================= TOKEN HELPERS =================
const setTokenCookie = (token: string) => {
  document.cookie = `access_token=${token}; path=/; max-age=604800`; // 7 days
};

const removeTokenCookie = () => {
  document.cookie = "access_token=; path=/; max-age=0";
};

// ================= AUTH API =================
export const authApi = createApi({
  reducerPath: "authApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `${base_url}/auth`,
  }),

  endpoints: (builder) => ({
    // ================= REGISTER =================
    userRegister: builder.mutation({
      query: (data: RegisterTYpe) => ({
        url: "/register",
        method: "POST",
        body: data,
      }),
    }),

    // ================= LOGIN =================
    userLogin: builder.mutation({
      query: (data: { email: string; password: string }) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),

      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const result = await queryFulfilled;

          const token = result.data?.data?.access_token;

          if (token) {
            setTokenCookie(token);
          }
        } catch (error) {
          console.log("Login failed:", error);
        }
      },
    }),

    // ================= LOGOUT =================
    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),

      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;

          // remove token from cookie
          removeTokenCookie();

          console.log("Logout successful");
        } catch (error) {
          console.log("Logout failed:", error);
        }
      },
    }),
  }),
});

// ================= EXPORT HOOKS =================
export const {
  useUserRegisterMutation,
  useUserLoginMutation,
  useLogoutMutation,
} = authApi;
