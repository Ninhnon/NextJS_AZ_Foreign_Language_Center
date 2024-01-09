/** @format */

import {
  Area,
  AreaChart,
  Brush,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export const LineCharts = ({ data, xAxisName, yAxisName }) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis dataKey={xAxisName} />
        <YAxis />
        <Tooltip />
        <legend />
        <Line type="monotone" dataKey={yAxisName} stroke="#8884d8" />
        <Brush startIndex={data.length - 10}>
          <AreaChart>
            <Area dataKey={xAxisName} isAnimationActive={false} />
          </AreaChart>
        </Brush>
      </LineChart>
    </ResponsiveContainer>
  );
};
