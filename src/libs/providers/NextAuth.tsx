"use client";

import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth/next";
import { SessionProvider } from "next-auth/react";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { PropsWithChildren } from "react";

interface NextAuthProps {
  session?: any;
}

export default function NextAuth({ children, session }: PropsWithChildren<NextAuthProps>) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}

export const getServerSideProps: GetServerSideProps<NextAuthProps> = async context => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};
