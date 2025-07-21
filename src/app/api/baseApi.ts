import { createApi } from "@reduxjs/toolkit/query/react";
import { graphqlRequestBaseQuery } from "@rtk-query/graphql-request-base-query";
import { GraphQLClient } from "graphql-request";

export const client = new GraphQLClient("https://api.github.com/graphql");

export const api = createApi({
  reducerPath:'baseApi',
  baseQuery: graphqlRequestBaseQuery({
    client,
    prepareHeaders: (headers) => {
      headers.set(
        "Authorization",
        `Bearer `
      );
      headers.set('User-Agent', 'github-search');
      return headers;
    },
  }),
  endpoints: () => ({}),
});