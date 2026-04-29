import { base_url } from "@/utils/utils";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// 🍪 get token from cookie
const getToken = () => {
  if (typeof document === "undefined") return null;

  const match = document.cookie.match(/access_token=([^;]+)/);
  return match ? match[1] : null;
};

const baseQuery = fetchBaseQuery({
  baseUrl: `${base_url}/users`,

  //  attach token automatically
  prepareHeaders: (headers) => {
    const token = getToken();

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

export const userApi = createApi({
  reducerPath: "users",
  baseQuery,

  endpoints: (builder) => ({
    // ================= PROFILE =================
    getUserProfile: builder.query({
      query: () => ({
        url: "/profile",
        method: "GET",
      }),
    }),
  }),
});

// ================= EXPORT HOOKS =================
export const { useGetUserProfileQuery } = userApi;
