import { Container, Text } from "@chakra-ui/react";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
})


const options = {
  chart: {
    toolbar: {
      show: false,

    },
    zoom: {
      enabled: false,

    },
  },
  plotOptions: {
    bar: {
      // colors: {
      //   ranges: [{
      //     from: -100,
      //     to: -46,
      //     color: '#F15B46'
      //   }, {
      //     from: -45,
      //     to: 0,
      //     color: '#FEB019'
      //   }]
      // },
      columnWidth: '70%',
    }
  },

  grid: {
    show: false,
  },

  dataLabels: {
    enabled: false,
  },

  tooltip: {
    enabled: true,
    y: {
      formatter: function (val) {
        return "R$ " + val
      }
    },

    theme: "dark",

  },

  xaxis: {
    // type: 'datetime',
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul',],
    labels: {
      show: true,
      rotate: -45,
      rotateAlways: false,
      hideOverlappingLabels: true,
      showDuplicates: false,
      trim: false,
      minHeight: undefined,
      maxHeight: 120,
      style: {
        colors: '#fff',
        fontSize: '12px',
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontWeight: 400,
        cssClass: 'apexcharts-xaxis-label',
      },
      offsetX: 0,
      offsetY: 0,
      format: undefined,
      formatter: undefined,
      datetimeUTC: true,
      datetimeFormatter: {
        year: 'yyyy',
        month: "MMM 'yy",
        day: 'dd MMM',
        hour: 'HH:mm',
      },
    },
  },

  yaxis: {
    show: false,

  },

  fill: {
    opacity: 1,
    colors: [function ({ value }: any) {
      if (value < 0) {
        return "#EB4335"
      } else {
        return "#5FF099"
      }
    }]
  },

}

const series = [
  { name: 'series1', data: [21, 120, 200, 20, 30, 40, -50] }
]

export function MonthlyBalanceGraph() {
  return (
    <Container w="100%" bg="#364154" borderRadius="10px" pl={6} pr={6} pt={6}>
      <Text fontWeight="semibold" fontSize={20} pb={4}>Monthly Total Balance</Text>
      <Chart type="bar" height={200} options={options} series={series} />
    </Container>
  )
}