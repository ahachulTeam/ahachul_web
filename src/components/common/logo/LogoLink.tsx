"use client";

import Link from "next/link";

import { StaticSEO } from "@/constants/seo";

import { LogoIcon } from "@/assets/icons";

import * as S from "./styled";

import { PATH } from "@/constants";

interface LogoLinkProps {
  className?: string;
}

function LogoLink({ className }: LogoLinkProps) {
  return (
    <h1>
      <Link css={S.anchor} href={PATH.HOME} className={className} aria-label="아하철">
        <LogoIcon aria-hidden="true" />
        <div css={S.visuallyHidden}>{StaticSEO.main.sitename}</div>
      </Link>
    </h1>
  );
}

export default LogoLink;
