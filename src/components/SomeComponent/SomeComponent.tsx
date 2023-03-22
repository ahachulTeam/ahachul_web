"use client";

import { Button, Toggle } from "../common";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";

import { useSampleAtom } from "@/atoms";

import { useSample } from "@/hooks";

import * as S from "./styled";

const subwayTabs = [
  {
    tabLabel: "교대방면",
    component: <div>hello korea</div>,
  },
  {
    tabLabel: "잠원방면",
    component: <div>hello world</div>,
  },
];

const subwayTabs2 = { kyodae: "교대방면", jamwon: "잠원방면" };

interface Props {
  someProp: string;
}

export const fetchSample = async () => {
  const { data } = await axios.get("https://pokeapi.co/api/v2/pokemon/ditto");
  return data;
};

export default function SomeComponent({ someProp }: Props) {
  const { sample } = useSample();
  const { sample: sampleAtom, setSample: setSampleAtom } = useSampleAtom();

  const { data, refetch } = useQuery(["sampleKey"], fetchSample);

  const fetchActionFn = (station: string) => {
    console.log(station, "fetching data, with this function");

    if (station === "jamwon") {
      refetch();
    }
  };

  useEffect(() => {
    console.log("API SUCCESS", data);
  }, [data]);

  useEffect(() => {
    setSampleAtom("mounted");
  }, []);

  return (
    <S.Paragraph>
      <span>{someProp}</span>
      <span>{sample}</span>
      <span>{sampleAtom}</span>
      <S.Components>
        <S.PrimaryBtn>hello world</S.PrimaryBtn>
        <S.SecondaryBtn>hello korea</S.SecondaryBtn>
        <br />
        <Button size="md" variant="primary" label="구매하기" />
        <br />
        <Toggle defaultValue={subwayTabs[0].tabLabel} tabAraiLabel="지하철 방면 설정 버튼">
          <Toggle.ToggleWithChildren tabs={subwayTabs} />
        </Toggle>
        <br />
        <Toggle defaultValue={subwayTabs2.kyodae} tabAraiLabel="지하철 방면 설정 버튼">
          <Toggle.ToggleWithActionFn tabs={subwayTabs2} actionFn={fetchActionFn} />
        </Toggle>
      </S.Components>
    </S.Paragraph>
  );
}
