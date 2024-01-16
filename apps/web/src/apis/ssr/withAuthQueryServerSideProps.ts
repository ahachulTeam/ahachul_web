import { dehydrate, QueryClient } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
import type { GetServerSideProps, GetServerSidePropsContext } from "next";

import { ax } from "../axios";
import { getMyProfileServerSide } from "../users";
import { COOKIE_KEY } from "@/constants";
import { setAuthorizationHeader } from "@/utils";
import * as O from "@/utils/option";

export type GetServerSidePropsContextWithAuthClient =
  GetServerSidePropsContext & {
    queryClient: QueryClient;
    api: AxiosInstance;
  };

export const withAuthQueryServerSideProps = (
  getServerSidePropsFunc?: GetServerSideProps,
) => {
  return async (context: GetServerSidePropsContextWithAuthClient) => {
    try {
      const api = ax;
      context.api = api;
      const optionCookie = O.fromUndefined(context.req.cookies[COOKIE_KEY]);
      const accessToken = O.mapOrElse(
        optionCookie,
        (cookie) => JSON.parse(cookie).accessToken,
        "",
      );

      const queryClient = new QueryClient();
      context.queryClient = queryClient;

      if (accessToken) {
        setAuthorizationHeader(api, accessToken, { type: "Bearer" });
        await queryClient.prefetchQuery(
          ["user", "me"],
          getMyProfileServerSide(api),
        );
      }

      if (!getServerSidePropsFunc) {
        const dehydratedState = JSON.parse(
          JSON.stringify(dehydrate(queryClient)),
        );
        return {
          props: {
            dehydratedState,
          },
        };
      } else {
        const { props } = (await getServerSidePropsFunc(context)) as {
          props: {
            [key: string]: any;
          };
        };

        const dehydratedState = JSON.parse(
          JSON.stringify(dehydrate(context.queryClient)),
        );

        return {
          props: {
            ...(props ?? {}),
            dehydratedState,
          },
        };
      }
    } catch (error) {
      console.log(error);
      return {
        props: {},
      };
    }
  };
};
