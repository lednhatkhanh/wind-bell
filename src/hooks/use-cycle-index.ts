import React from 'react';

export const useCycleIndex = (upperBound: number) => {
  const [index, setIndex] = React.useState(0);

  const increase = () => {
    setIndex((currentIndex) => (currentIndex + 1) % upperBound);
  };

  const decrease = () => {
    setIndex((currentIndex) => (currentIndex === 0 ? upperBound - 1 : currentIndex - 1));
  };

  return { index, increase, decrease, setIndex };
};
