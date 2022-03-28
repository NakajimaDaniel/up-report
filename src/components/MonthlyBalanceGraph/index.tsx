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



export function MonthlyBalanceGraph({ transactions }: MonthlyBalanceGraphProps) {

  const [selectedYear, setSelectedYear] = useState(2022);
  const [listByMonth, setListByMonth] = useState();
  const [monthsArray, setMonthsArray] = useState();
  const [balanceArrayValue, setBalanceArrayValue] = useState();


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

    const monthsOfAllExpensesFiltered = monthsOfAllExpenses?.filter((item, position) => {
      return monthsOfAllExpenses.indexOf(item) == position
    })

    const monthsOfAllIncomesFiltered = monthsOfAllIncomes?.filter((item, position) => {
      return monthsOfAllIncomes.indexOf(item) == position
    })

    const totalByMonth = (array) => {
      return array?.reduce((total, item) => {
        total[item.month] = array.reduce((acc, obj) => {
          if (obj.month == item.month) {
            acc = acc + Number(obj.value)
          }
          return acc
        }, 0)
        return total
      }, {})
    }

    const totalExpenses = totalByMonth(allExpenses);
    const totalIncomes = totalByMonth(allIncomes);

    if (monthsOfAllExpensesFiltered && monthsOfAllIncomesFiltered) {
      if (monthsOfAllExpensesFiltered.length > monthsOfAllIncomesFiltered.length) {
        const newmap = monthsOfAllExpensesFiltered.map(val => {
          return {
            month: val,
            totalIncome: totalIncomes[val],
            totalExpense: totalExpenses[val],
          }
        })
        setMonthsArray(monthsOfAllExpensesFiltered);
        setListByMonth(newmap);

      } else {
        const newmap = monthsOfAllIncomesFiltered.map(val => {
          return {
            month: val,
            totalIncome: totalIncomes[val],
            totalExpense: totalExpenses[val],
          }
        })
        setMonthsArray(monthsOfAllIncomesFiltered);
        setListByMonth(newmap);
      }
    }
  }, [])


  useEffect(() => {

    const allExpenses = retrieveAllExpense(selectedYear);
    const allIncomes = retriveAllIncomes(selectedYear);

    const monthsOfAllExpenses = allExpenses?.map(val => { return val.month })
    const monthsOfAllIncomes = allIncomes?.map(val => { return val.month })

    const monthsOfAllExpensesFiltered = monthsOfAllExpenses?.filter((item, position) => {
      return monthsOfAllExpenses.indexOf(item) == position
    })

    const monthsOfAllIncomesFiltered = monthsOfAllIncomes?.filter((item, position) => {
      return monthsOfAllIncomes.indexOf(item) == position
    })

    const totalByMonth = (array) => {
      return array?.reduce((total, item) => {
        total[item.month] = array.reduce((acc, obj) => {
          if (obj.month == item.month) {
            acc = acc + Number(obj.value)
          }
          return acc
        }, 0)
        return total
      }, {})
    }

    const totalExpenses = totalByMonth(allExpenses);
    const totalIncomes = totalByMonth(allIncomes);

    if (monthsOfAllExpensesFiltered && monthsOfAllIncomesFiltered) {
      if (monthsOfAllExpensesFiltered.length > monthsOfAllIncomesFiltered.length) {
        const newmap = monthsOfAllExpensesFiltered.map(val => {
          return {
            month: val,
            totalIncome: totalIncomes[val],
            totalExpense: totalExpenses[val],
          }
        })
        setMonthsArray(monthsOfAllExpensesFiltered);
        setListByMonth(newmap);

      } else {
        const newmap = monthsOfAllIncomesFiltered.map(val => {
          return {
            month: val,
            totalIncome: totalIncomes[val],
            totalExpense: totalExpenses[val],
          }
        })
        setMonthsArray(monthsOfAllIncomesFiltered);
        setListByMonth(newmap);
      }
    }

  }, [selectedYear]);


  useEffect(() => {

    const listOfIncomeByMonth = listByMonth?.map(val => {
      if (!val.totalIncome) {
        return 0
      }
      return val.totalIncome
    })
    const listOfExpenseByMonth = listByMonth?.map(val => {
      if (!val.totalExpense) {
        return 0
      }
      return val.totalExpense
    })

    const balance = listOfIncomeByMonth?.map((valueA, indexInA) => valueA - listOfExpenseByMonth[indexInA]);

    setBalanceArrayValue(balance);

  }, [listByMonth]);


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
      categories: monthsArray ? monthsArray : ["null"],
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
    }
  }

  const series = [
    { name: 'series1', data: balanceArrayValue ? balanceArrayValue : [0] }
  ]


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