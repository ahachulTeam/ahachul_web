"use client";

import { Button, Tab } from "../common";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";

import { useSampleAtom } from "@/atoms";

import { useSample } from "@/hooks";

import * as S from "./styled";

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

  const { data } = useQuery(["sampleKey"], fetchSample);

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
        {/* TOOD: styled-components에서 css props 전달
      가능한가 ? */}
        <Button size="md" variant="primary" label="ah! hachul" />
        <Tab />
      </S.Components>
    </S.Paragraph>
  );
}
