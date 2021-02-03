import { Tooltip as VxTooltip, defaultStyles } from '@visx/tooltip';
import styled from 'styled-components';

import { Settings, TimeValue, EventType } from '../../../domain';
import i18n from '../../../i18n';

import useOffsetFormatter from '../scale/useOffsetFormatter';

export type TTooltipData = { tick: null | TimeValue };

type TProps = {
  settings: Settings;
  top: number;
  left: number;
  data: TTooltipData;
  styles: React.CSSProperties;
};

export default function Tooltip({ settings, top, left, data, styles }: TProps) {
  const offsetFormatter = useOffsetFormatter({ settings });

  return (
    <VxTooltip top={top} left={left} style={{ ...defaultStyles, ...styles }}>
      {data.tick ? (
        <TooltipData event={data.tick.event}>
          <div>
            {i18n.tooltip.offset}: {offsetFormatter(data.tick.offset)}
          </div>

          <div>
            {i18n.tooltip.load}: {data.tick.value}
          </div>

          {data.tick.event ? (
            <div>
              {i18n.tooltip.event}: {i18n.event(data.tick.event)}
            </div>
          ) : null}
        </TooltipData>
      ) : (
        <TooltipData event={null}>
          <div>{i18n.tooltip.empty}</div>
        </TooltipData>
      )}
    </VxTooltip>
  );
}

type TTooltipDataProps = {
  event: null | EventType;
};

const TooltipData = styled.div<TTooltipDataProps>`
  display: flex;
  flex-direction: column;

  color: ${props => props.event && props.theme.event[props.event]};

  > div:not(:last-child) {
    margin-bottom: 8px;
  }
`;
