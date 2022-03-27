import { Container, Select, Text } from "@chakra-ui/react";
import { format } from "date-fns";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

interface Transaction {
  dt: number,
  description: string,
  category: string,
  type: string,
  value: string,
}

interface MonthlyBalanceGraphProps {
  transactions: Transaction[];
}

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

export function MonthlyBalanceGraph({ transactions }: MonthlyBalanceGraphProps) {

  const [selectedYear, setSelectedYear] = useState();
  const [listOfExpenseByMonth, setListOfExpenseByMonth] = useState(2022);

  const transactionDateList = transactions?.map(val => {
    return format(val.dt, "MMM/yy")
  })

  const newTransactionList = transactions?.map(val => {
    return {
      dt: val.dt,
      description: val.description,
      category: val.category,
      type: val.type,
      value: val.value,
      year: format(val.dt, "yyyy"),
      month: format(val.dt, "MMMM")
    }
  })

  const arrayOfYears = newTransactionList?.map(val => { return val.year });

  const arrayOfYearsFiltered = arrayOfYears?.filter((item, position) => {
    return arrayOfYears.indexOf(item) == position
  })

  function retrieveAllExpense(year: number) {
    const total = newTransactionList?.filter(val => {
      if (val.type == "Expense") {
        return {
          dt: val.dt
        }
      }
    })
    return total
  }

  function retriveAllIncomes(year: number) {
    const total = newTransactionList?.filter(val => {
      if (val.type == "Income") {
        return {
          dt: val.dt
        }
      }
    })
    return total
  }


  useEffect(() => {
    const allExpenses = retrieveAllExpense(selectedYear);
    const allIncomes = retriveAllIncomes(selectedYear);

    const monthsOfAllExpenses = allExpenses?.map(val => { return val.month })
    const monthsOfAllIncomes = allIncomes?.map(val => { return val.month })

    // const arrayOfMonthsFiltered = allExpensesByMonth?.filter((item, position) => {
    //   return allExpensesByMonth.indexOf(item) == position
    // })

    const totalByMonth = (array) => {
      return array?.reduce((total, item) => {
        total[item.month] = array.reduce((acc, obj) => {
          if (obj.month == item.month) {
            acc = acc + Number(obj.value)
          } else {
            console.log(array)
          }
          return acc
        }, 0)
        return total
      }, {})
    }


    const totalExpenses = totalByMonth(allExpenses);
    const totalIncomes = totalByMonth(allIncomes);

    console.log(totalIncomes)

    if (totalExpenses || totalIncomes) {

      const newTotalExpense = Object.values(totalExpenses);
      const newTotalIncome = Object.values(totalIncomes);

      // const newarray = test?.map((valueA, indexInA) => valueA - test2[indexInA])

    }

  }, [selectedYear]);

  return (
    <Container w="100%" bg="#364154" borderRadius="10px" pl={6} pr={6} pt={6}>
      <Text fontWeight="semibold" fontSize={20} pb={4}>Monthly Total Balance</Text>

      <Select onClick={(e) => setSelectedYear(e.target.value)} >
        {transactions ? (
          arrayOfYearsFiltered?.map(val => {
            return (
              <option key={val}>{val}</option>
            )
          })
        ) : (<option></option>)}
      </Select>
      <Chart type="bar" height={200} options={options} series={series} />
    </Container>
  )
}