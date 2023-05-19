import React, { useState } from 'react'
import Link from 'next/link'
import styles from '../styles/Employees.module.scss'

import { CompactTable } from '@table-library/react-table-library/compact'
import { useTheme } from '@table-library/react-table-library/theme'
import { getTheme } from '@table-library/react-table-library/baseline'
import { useSort } from '@table-library/react-table-library/sort'

import { useAppContext } from '@/contexts/AppContext'

import { EmployeeTable } from '../components/Table/Table'
import next from 'next/types'

type Props = {
  id: string
  firstName: string
  lastName: string
  startDate: Date
  department: string
  selectDepartment: any
  birthDate: Date
  street: string
  city: string
  state: string
  selectState: any
  zipCode: number
}


const Employees = () => {
  const { state } = useAppContext()
  const employees = state.employees

  const [search, setSearch] = useState('')

  const handleSearch = (e: any) => {
    setSearch(e.target.value)
  }

  const nodes = employees.map((employee: Props) => {
    return {
      firstName: employee.firstName,
      lastName: employee.lastName,
      startDate: employee.startDate,
      department: employee.selectDepartment?.value || employee.department,
      birthDate: employee.birthDate,
      street: employee.street,
      city: employee.city,
      state: employee.selectState?.abbreviation || employee.state,
      zipCode: employee.zipCode,
    }
  })

  //const data = { nodes }

   const data = {
     nodes: nodes.filter((item: { firstName: string; lastName: string; department: string; city: string; state: string }) =>
       item.firstName.toLowerCase().includes(search.toLowerCase()) ||
        item.lastName.toLowerCase().includes(search.toLowerCase()) ||
        item.department.toLowerCase().includes(search.toLowerCase()) ||
        item.city.toLowerCase().includes(search.toLowerCase()) ||
        item.state.toLowerCase().includes(search.toLowerCase())
     ),
   }

  console.log(data)
  console.log(search)

  const theme = useTheme([
    getTheme(),
    {
      Table: `
        --data-table-library_grid-template-columns:  repeat(9, auto);
        width: 100%;
        border-radius: 8px;
        box-shadow: 0 0 20px rgba(63, 63, 68, 0.05);
      `,
      HeaderCell: `
        font-size: 14px;
        transition: background-color 0.3s ease-in-out;
        div > div {
          justify-content: space-between;
        }
        &:hover {
          background-color: #f5f5f5;
        }
      `,
      Row: `
        font-size: 14px;
      `
    },
  ])

  const sort = useSort(
    data,
    {
      onChange: onSortChange,
    },
    {
      sortIcon: {
        size: '10px',
    },
    
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
      renderCell: (item: { startDate: Date }) => item.startDate,
      sort: { sortKey: 'STARTDATE' },
    },
    {
      label: 'Department',
      renderCell: (item: { department: string }) => item.department,
      sort: { sortKey: 'DEPARTMENT' },
    },
    {
      label: 'Birth Date',
      renderCell: (item: { birthDate: Date }) => item.birthDate,
      sort: { sortKey: 'BIRTHDATE' },
    },
    {
      label: 'Street',
      renderCell: (item: { street: string }) => item.street,
      sort: { sortKey: 'STREET' },
    },
    { label: 'City', renderCell: (item: { city: string }) => item.city,
      sort: { sortKey: 'CITY' },
    },
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
    <section className={styles.wrapper}>
      <h2 className={styles.wrapper__title}>Current Employees</h2>
     
      <EmployeeTable />
      <Link href="/" className='btn' style={
        {margin: 'auto'}
      }>
        Return to Home
      </Link>
    </section>
  )
}

export default Employees