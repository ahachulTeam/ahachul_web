import { useState } from "react";

const useSample = () => {
  const [sample, setSample] = useState("sample");

  return { sample };
};

export default useSample;
