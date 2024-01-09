import { LineCharts } from '@/components/LineCharts';
import { Button } from '@/components/ui/button';
import { DatePickerWithRange } from '@/components/ui/date-range-picker';
import { useOrder } from '@/hooks/useOrder';
import { Select, SelectItem } from '@nextui-org/react';
import {
  addDays,
  addMonths,
  differenceInDays,
  differenceInMonths,
  format,
} from 'date-fns';
import React, { useEffect } from 'react';
import { DateRange } from 'react-day-picker';
import toast from 'react-hot-toast';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Brush,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const statisticType = [
  { id: 1, type: 'Doanh thu' },
  { id: 2, type: 'Đăng ký' },
];
const statisticRange = [
  { id: 1, range: 'Ngày' },
  { id: 2, range: 'Tháng' },
];

const Report = () => {
  //Get date from user
  const [date, setDate] = React.useState<DateRange | undefined>(undefined);
  const [type, setType] = React.useState(new Set(['1']));
  const [range, setRange] = React.useState(new Set(['1']));
  const [data, setData] = React.useState<any>([]);

  //IsLoading
  const [isFetched, setIsFetched] = React.useState(false);

  const dateMap = new Map<string, number>();

  //fetch data from api
  const { onGetOrderFromRange } = useOrder();
  console.log(
    'from: ' +
      date?.from?.toLocaleDateString() +
      ' to: ' +
      date?.to?.toLocaleDateString()
  );

  //Key and Function for fetch data
  //using react-query

  const fetchOrder = async () => {
    const from = date?.from?.toISOString() || new Date().toISOString();
    const to = date?.to?.toISOString() || new Date().toISOString();
    const res = await onGetOrderFromRange(from, to);
    console.log('🚀 ~ file: Charts.tsx:107 ~ fetchOrder ~ res', res);
    return res || [];
  };

  //Show data by days if user choose 'Show by days'
  const showDataByDays = (fetchedData) => {
    const from = new Date(date.from);
    const to = new Date(date.to);
    const diffDays = differenceInDays(to, from);

    for (let i = 0; i <= diffDays; i++) {
      // Add days from the date range to the map
      const dateAfter = addDays(from, i);
      dateMap.set(dateAfter.toLocaleDateString(), 0);
    }
    if (type.has('1')) {
      // Show revenue
      fetchedData.forEach((item) => {
        const orderDate = new Date(item.orderDate).toLocaleDateString();
        if (dateMap.has(orderDate)) {
          dateMap.set(orderDate, dateMap.get(orderDate) + item.total);
        }
      });
    } else if (type.has('2')) {
      // Show orders
      fetchedData.forEach((item) => {
        const orderDate = new Date(item.orderDate).toLocaleDateString();
        if (dateMap.has(orderDate)) {
          dateMap.set(orderDate, dateMap.get(orderDate) + 1);
        }
      });
    }
  };

  //Show data by months if user choose 'Show by months'
  const showDataByMonths = (fetchedData) => {
    dateMap.clear();
    const from = new Date(date.from);
    const to = new Date(date.to);
    const diffMonths = differenceInMonths(to, from);

    for (let i = 0; i <= diffMonths; i++) {
      const monthAfter = addMonths(from, i);
      dateMap.set(format(monthAfter, 'MM/yyyy'), 0);
    }

    if (type.has('1')) {
      fetchedData.forEach((item) => {
        const orderDate = new Date(item.orderDate);
        const monthYearKey = format(orderDate, 'MM/yyyy'); // Use 'MM/yyyy' as the key for months
        if (dateMap.has(monthYearKey)) {
          dateMap.set(monthYearKey, dateMap.get(monthYearKey) + item.total);
        }
      });
    } else if (type.has('2')) {
      fetchedData.forEach((item) => {
        const orderDate = new Date(item.orderDate);
        const monthYearKey = format(orderDate, 'MM/yyyy'); // Use 'MM/yyyy' as the key for months
        if (dateMap.has(monthYearKey)) {
          dateMap.set(monthYearKey, dateMap.get(monthYearKey) + 1);
        }
      });
    }
  };

  useEffect(() => {
    if (date) {
      onSubmit();
    }
  }, [type, range]);

  const onSubmit = async () => {
    if (!date || !date.from || !date.to) {
      toast.error('Please choose date');
      return;
    }

    // Fetch orders from the API
    const res = await fetchOrder();

    // Create a map of dates from the date range
    dateMap.clear();

    if (range.has('1')) {
      showDataByDays(res);
    } else if (range.has('2')) {
      showDataByMonths(res);
    }

    console.log('🚀 ~ file: Charts.tsx:119 ~ onSubmit ~ dateMap', dateMap);
    // Convert map to array
    const array = Array.from(dateMap, ([date, total]) => ({ date, total }));

    // Set data for the chart
    setData(array);
    setIsFetched(true);
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full h-fit flex flex-row justify-center gap-8 mb-16">
        <div className="w-full flex flex-col">
          <div className="font-bold text-lg">Chọn thông tin cần thống kê:</div>
          <div className="w-full h-fit flex flex-row justify-start gap-8">
            <Select
              key={'type'}
              radius={'md'}
              value={statisticType[0].type}
              autoFocus={false}
              placeholder="Choose type"
              selectedKeys={type}
              onSelectionChange={setType}
              className="max-w-xs"
            >
              {statisticType?.map((c) => (
                <SelectItem key={c.id} value={c.type}>
                  {c.type}
                </SelectItem>
              ))}
            </Select>
            <Select
              key={'range'}
              radius={'md'}
              value={statisticRange[0].range}
              autoFocus={false}
              placeholder="Choose range"
              selectedKeys={range}
              onSelectionChange={setRange}
              className="max-w-xs"
            >
              {statisticRange?.map((c) => (
                <SelectItem key={c.id} value={c.range}>
                  {c.range}
                </SelectItem>
              ))}
            </Select>
          </div>
        </div>
        <div className="w-full flex flex-col">
          <div className="font-bold text-lg">Chọn khoảng thời gian:</div>
          <div className="w-full h-fit flex flex-row gap-16 items-center">
            <DatePickerWithRange
              date={date}
              setDate={setDate}
            ></DatePickerWithRange>
            <Button className="w-fit h-full" onClick={onSubmit}>
              Xác nhận
            </Button>
          </div>
        </div>
      </div>
      <div>
        {isFetched ? (
          <div>
            {' '}
            <ResponsiveContainer width="100%" height={550}>
              <BarChart data={data}>
                <XAxis
                  dataKey="date"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={true}
                  tickFormatter={
                    type.has('1')
                      ? (value) => `$${value}`
                      : (value) => ` ${value}`
                  }
                />
                <Brush startIndex={data.length - 10}>
                  <AreaChart>
                    <Area dataKey="date" isAnimationActive={false} />
                  </AreaChart>
                </Brush>
                <Tooltip />
                <Legend />
                <Bar dataKey="total" fill="primary" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="w-full h-full">
              <LineCharts data={data} xAxisName={'date'} yAxisName={'total'} />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Report;
