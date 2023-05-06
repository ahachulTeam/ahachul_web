"use client";

/* eslint-disable no-underscore-dangle */
import Image from "next/image";
import Link from "next/link";
import thumbnailDefaultImg from "public/illust/img/img_thumbnailDefault.png";

import { SubwayBadge } from "@/components/common";

import { StaticSEO } from "@/constants/seo";

import * as S from "./styled";

interface ItemProps {
  data: any;
}

function Item({ data }: ItemProps) {
  return (
    <S.Item>
      <Link href={`community/${data._id}`}>
        <S.Flex>
          <h4>{data.title}</h4>
          <p>{data.content}</p>
          <S.Box>
            <SubwayBadge label={data.subwayLine} isHottest />
          </S.Box>
        </S.Flex>
        <Image src={thumbnailDefaultImg} alt={data.title} />
      </Link>
    </S.Item>
  );
}

export default Item;
