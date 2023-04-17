"use client";

import { BottomSheet } from "../bottomSheet";
import { useRef, useEffect } from "react";

import { useDisclosure, useArrowKeyTrap } from "@/hooks";

import { ArrowDownMinIcon } from "@/assets/icons";

import * as S from "./styled";

interface FilterItem {
  label: string;
  value: string;
}

interface FilterProps {
  id: string;
  label: string;
  options: FilterItem[];
  value: string;
  chnageValue: (value: string) => void;
}

export default function Filter({ id, label, options, value, chnageValue }: FilterProps) {
  const { dialoglRef, isOpen, onOpen, onClose } = useDisclosure();
  const prevValue = useRef(value);

  const uid = `${id}-filter`;

  useArrowKeyTrap(dialoglRef);

  const handleOptionClick = (opt: string) => () => {
    chnageValue(opt);
  };

  useEffect(() => {
    prevValue.current = value;
  }, [value]);

  return (
    <>
      <S.TriggerBtn
        type="button"
        aria-haspopup="dialog"
        aria-controls={uid}
        aria-expanded={isOpen}
        onClick={onOpen}
      >
        {label}
        <ArrowDownMinIcon />
      </S.TriggerBtn>
      <BottomSheet
        id={uid}
        ref={dialoglRef}
        isOpen={isOpen}
        title={label}
        closedCases={[prevValue.current !== value]}
        onClose={onClose}
      >
        <S.OptionContainer role="menu">
          {options.map(opt => (
            <S.Option
              key={opt.value}
              role="menuitemradio"
              aria-checked={opt.value === value}
              onClick={handleOptionClick(opt.value)}
            >
              {opt.label}
            </S.Option>
          ))}
        </S.OptionContainer>
      </BottomSheet>
    </>
  );
}
