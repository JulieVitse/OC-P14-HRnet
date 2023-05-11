import React, { useContext, useEffect, useState } from 'react'
import styles from '../styles/Employees.module.scss'

import { CompactTable } from '@table-library/react-table-library/compact'
import { useTheme } from '@table-library/react-table-library/theme'
import { getTheme } from '@table-library/react-table-library/baseline'
import { useSort } from '@table-library/react-table-library/sort'

import { FormDataContext } from '@/contexts/formDataContext'
import { set } from 'react-hook-form'

const Employees = () => {
  const context = useContext(FormDataContext)

  const [ employee, setEmployee ] = useState(context)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const dataFromStorage = localStorage.getItem('formData')
      if (dataFromStorage) {
        setEmployee(JSON.parse(dataFromStorage))
      }
    }
  }, [])

  console.log(employee.employeeData)
  /* console.log(context.employeeData)
  
  context.employeeData.map((data) => {
    console.log(data)
  })

  const getDataFromStorage = localStorage.getItem('formData')
  if (getDataFromStorage) {
    console.log(getDataFromStorage)
    context.employeeData.push(JSON.parse(getDataFromStorage)) */

  const nodes = [
  {
    id: '0',
    firstName: 'Landon',
    lastName: 'Linsley',
    startDate: '09/01/2021',
    department: 'Sales',
    birthDate: '25/01/1990',
    street: '1234 Main St',
    city: 'Salt Lake City',
    state: 'UT',
    zipCode: 84101,
  },
  /* {
    id: '1',
    firstName: 'Tanner',
    lastName: 'Linsley',
    startDate: '09/01/2021',
    department: 'Sales',
    birthDate: '25/01/1990',
    street: '1234 Main St',
    city: 'Salt Lake City',
    state: 'UT',
    zipCode: 84101,
  }, */
]

  const data = { nodes }

  const theme = useTheme([
    getTheme(),
    {
      Table: `
        --data-table-library_grid-template-columns:  repeat(9, auto);
        width: 100%;
      `,
    },
  ])

  const sort = useSort(
    data,
    {
      onChange: onSortChange,
    },
    {
      sortFns: {
        FIRSTNAME: (array) =>
          array.sort((a, b) => a.firstName.localeCompare(b.firstName)),
        LASTNAME: (array) =>
          array.sort((a, b) => a.lastName.localeCompare(b.lastName)),
        STARTDATE: (array) => array.sort((a, b) => a.startDate - b.startDate),
        DEPARTMENT: (array) =>
          array.sort((a, b) => a.department.localeCompare(b.department)),
        BIRTHDATE: (array) => array.sort((a, b) => a.birthDate - b.birthDate),
        STREET: (array) =>
          array.sort((a, b) => a.street.localeCompare(b.street)),
        CITY: (array) => array.sort((a, b) => a.city.localeCompare(b.city)),
        STATE: (array) => array.sort((a, b) => a.state.localeCompare(b.state)),
        ZIPCODE: (array) => array.sort((a, b) => a.zipCode - b.zipCode),
        /* TASKS: (array) =>
          array.sort((a, b) => (a.nodes || []).length - (b.nodes || []).length), */
      },
    }
  )

  function onSortChange(action: any, state: any) {
    console.log(action, state)
  }

  const COLUMNS = [
    {
      label: 'First Name',
      renderCell: (item: { firstName: string }) => item.firstName,
      sort: { sortKey: 'FIRSTNAME' },
    },
    {
      label: 'Last Name',
      renderCell: (item: { lastName: string }) => item.lastName,
      sort: { sortKey: 'LASTNAME' },
    },
    {
      label: 'Start Date',
      renderCell: (item: { startDate: string }) => item.startDate,
      sort: { sortKey: 'STARTDATE' },
    },
    {
      label: 'Department',
      renderCell: (item: { department: string }) => item.department,
      sort: { sortKey: 'DEPARTMENT' },
    },
    {
      label: 'Birth Date',
      renderCell: (item: { birthDate: string }) => item.birthDate,
      sort: { sortKey: 'BIRTHDATE' },
    },
    {
      label: 'Street',
      renderCell: (item: { street: string }) => item.street,
      sort: { sortKey: 'STREET' },
    },
    { label: 'City', renderCell: (item: { city: string }) => item.city },
    {
      label: 'State',
      renderCell: (item: { state: string }) => item.state,
      sort: { sortKey: 'STATE' },
    },
    {
      label: 'Zip Code',
      renderCell: (item: { zipCode: number }) => item.zipCode,
      sort: { sortKey: 'ZIPCODE' },
    },
  ]

  return (
    <>
      <CompactTable
        columns={COLUMNS}
        data={data}
        theme={theme}
        layout={{ custom: true }}
        sort={sort}
        className={styles.customTable}
      />
    </>
    
  )
}

export default Employees

/* const defaultData = [
  {
    firstName: 'tanner',
    lastName: 'linsley',
    startDate: '09/01/2021',
    department: 'Sales',
    birthDate: '25/01/1990',
    street: '1234 Main St',
    city: 'Salt Lake City',
    state: 'UT',
    zipCode: 84101,
  }
]
 */
