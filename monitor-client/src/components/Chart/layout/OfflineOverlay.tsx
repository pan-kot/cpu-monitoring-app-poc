import { useContext, memo } from 'react';
import { ThemeContext } from 'styled-components';

import i18n from '../../../i18n';

type TProps = {
  width: number;
  height: number;
};

function OfflineOverlay({ width, height }: TProps) {
  const theme = useContext(ThemeContext);

  return (
    <>
      <rect
        x={0}
        y={0}
        width={width}
        height={height}
        fill={theme.chart.offline.overlay}
        rx={14}
      />

      <text
        x={width / 2}
        y={height / 2}
        textAnchor="middle"
        style={{ fontSize: 25, fill: theme.body.fg }}
      >
        {i18n.offline}
      </text>
    </>
  );
}

export default memo(OfflineOverlay);
