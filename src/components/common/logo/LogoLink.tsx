"use client";

import Link from "next/link";

import { LogoIcon } from "@/assets/icons";

import * as S from "./styled";

import { PATH } from "@/constants";

interface LogoLinkProps {
  className?: string;
}

function LogoLink({ className }: LogoLinkProps) {
  return (
    <Link css={S.anchor} href={PATH.HOME} className={className} aria-label="아하철">
      {/* <LogoIcon aria-hidden="true" />; */}
      LOGO
    </Link>
  );
}

export default LogoLink;
