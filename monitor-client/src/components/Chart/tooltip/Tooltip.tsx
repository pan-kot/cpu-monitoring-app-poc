import { Tooltip as VxTooltip, defaultStyles } from '@visx/tooltip';
import styled from 'styled-components';

import i18n from '../../../i18n';
import { Settings, EventType } from '../../../domain';

import { TooltipData } from '../types';

import useDimensions from '../useDimensions';
import useOffsetFormatter from '../scale/useOffsetFormatter';

type TProps = {
  settings: Settings;
  data: TooltipData;
};

export default function Tooltip({ settings, data }: TProps) {
  const { xMax, margin } = useDimensions();

  const offsetFormatter = useOffsetFormatter({ settings });

  return (
    <VxTooltip
      top={margin.top + 5}
      left={xMax + margin.left - 10}
      style={{ ...defaultStyles, transform: 'translateX(-100%)', width: 120 }}
    >
      {data.tick ? (
        <TooltipContent event={data.tick.event}>
          <div>
            {i18n.chart.tooltip.offset}: {offsetFormatter(data.tick.offset)}
          </div>

          <div>
            {i18n.chart.tooltip.load}: {data.tick.value}
          </div>

          {data.tick.event ? (
            <div>
              {i18n.chart.tooltip.event}: {i18n.event(data.tick.event)}
            </div>
          ) : null}
        </TooltipContent>
      ) : (
        <TooltipContent event={null}>
          <div>{i18n.chart.tooltip.empty}</div>
        </TooltipContent>
      )}
    </VxTooltip>
  );
}

type TTooltipContentProps = {
  event: null | EventType;
};

const TooltipContent = styled.div<TTooltipContentProps>`
  display: flex;
  flex-direction: column;

  color: ${props => props.event && props.theme.event[props.event]};

  > div:not(:last-child) {
    margin-bottom: 8px;
  }
`;
