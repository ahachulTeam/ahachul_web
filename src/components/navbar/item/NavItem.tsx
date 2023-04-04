"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { isMatchRoute } from "@/utils";

import * as S from "./NavItem.styled";

interface NavItemProps {
  label: string;
  path: string;
  icon: React.ReactElement;
}

export default function NavItem({ label, path, icon }: NavItemProps) {
  const pathname = usePathname();

  const isCurrentPage = isMatchRoute(pathname || "", path);

  return (
    <S.NavItem>
      <Link href={path} aria-current={isCurrentPage ? "page" : "false"}>
        {icon}
        <span>{label}</span>
      </Link>
    </S.NavItem>
  );
}
