import { memo } from 'react';
import { AxisLeft } from '@visx/axis';

import i18n from '../../../i18n';

import { LoadScale } from '../types';

type TProps = {
  loadScale: LoadScale;
};

function LoadAxis({ loadScale }: TProps) {
  return (
    <>
      <AxisLeft scale={loadScale} />

      <text x="-70" y="15" transform="rotate(-90)" fontSize={10}>
        {i18n.chart.loadAxis.label}
      </text>
    </>
  );
}

export default memo(LoadAxis);
