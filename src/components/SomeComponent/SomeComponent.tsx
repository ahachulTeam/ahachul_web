"use client";

import { Button, Toggle } from "../common";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

import { Checkbox } from "@/components";

import { useSampleAtom } from "@/atoms";

import { useSample, useToast } from "@/hooks";

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
  const toast = useToast();
  const { sample } = useSample();
  const { sample: sampleAtom, setSample: setSampleAtom } = useSampleAtom();

  const { data, refetch } = useQuery(["sampleKey"], fetchSample);

  const fetchActionFn = (station: string) => {
    console.log(station, "fetching data, with this function");

    if (station === "jamwon") {
      refetch();
    }
  };

  const [checked, setChecked] = useState<boolean>(false);

  const onCheckedChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(e => {
    setChecked(e.target.checked);
  }, []);

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
        <S.GhostBtn>ghost</S.GhostBtn>
        <S.OutlineBtn>outline</S.OutlineBtn>
        <br />
        <Button size="md" variant="primary" label="구매하기" />
        <br />
        <Toggle defaultValue={subwayTabs[0].tabLabel} tabAraiLabel="지하철 방면 설정 버튼">
          <Toggle.WithChildren tabs={subwayTabs} />
        </Toggle>
        <br />
        <Toggle defaultValue={subwayTabs2.kyodae} tabAraiLabel="지하철 방면 설정 버튼">
          <Toggle.WithActionFn tabs={subwayTabs2} actionFn={fetchActionFn} />
        </Toggle>
        <div style={{ padding: "20px" }}>
          <Checkbox id="test" label="BUTTON" checked={checked} onChange={onCheckedChange} />
        </div>
      </S.Components>
    </S.Paragraph>
  );
}
