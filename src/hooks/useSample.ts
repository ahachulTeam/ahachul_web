import { useEffect, useState } from "react";

const useSample = () => {
  const [sample, setSample] = useState("");

  useEffect(() => {
    setSample("sample");
  }, []);

  return { sample };
};

export default useSample;
