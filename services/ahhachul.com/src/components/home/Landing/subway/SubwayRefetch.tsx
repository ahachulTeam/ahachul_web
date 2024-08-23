import React, { useReducer } from 'react';

const SubwayRefetch = () => {
  const [refetchBtnClicked, toggle] = useReducer((active) => !active, false);
};
