/* eslint-disable no-underscore-dangle */
import Image from "next/image";
import Link from "next/link";
import thumbnailDefaultImg from "public/illust/img/img_thumbnailDefault.png";

import { StaticSEO } from "@/constants/seo";

import * as S from "./styled";

interface ItemProps {
  data: any;
}

function Item({ data }: ItemProps) {
  return (
    <S.NavItem>
      <Link href={`community/${data._id}`}>
        <S.Flex>
          <h4>
            {data.title}
            <p css={S.visuallyHidden}>{` | ${data.subwayLine} ${StaticSEO.main.community}`}</p>
          </h4>
          <p>{data.content}</p>
          <S.Box>
            <span>{data.subwayLine} HOT</span>
          </S.Box>
        </S.Flex>
        <Image src={thumbnailDefaultImg} alt={data.title} />
      </Link>
    </S.NavItem>
  );
}

export default Item;
