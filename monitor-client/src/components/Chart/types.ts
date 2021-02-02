import { ScaleLinear } from 'd3-scale';

import { Settings, TimeValue } from '../../domain';

export type ChartProps = {
  settings: Settings;
  timeseries: TimeValue[];
  maximum: number;
};

export type ChartDimensions = {
  width: number;
  height: number;
  margin: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  xMax: number;
  yMax: number;
};

export type OffsetScale = ScaleLinear<number, number>;

export type LoadScale = ScaleLinear<number, number>;
