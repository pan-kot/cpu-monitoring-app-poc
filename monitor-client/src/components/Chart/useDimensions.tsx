import { createContext, useContext } from 'react';

import type { ChartDimensions } from './types';

export const margin = {
  top: 40,
  right: 30,
  bottom: 50,
  left: 40
};

export const ChartDimensionsContext = createContext<ChartDimensions>({
  width: 0,
  height: 0,
  margin,
  xMax: 0,
  yMax: 0
});

export default function useDimensions() {
  return useContext(ChartDimensionsContext);
}
