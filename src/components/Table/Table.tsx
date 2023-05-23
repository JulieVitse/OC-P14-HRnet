import * as React from 'react'
import { useState } from 'react'
import { useAppContext } from '@/contexts/AppContext'
import styles from './Table.module.scss'
import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  Cell,
} from '@table-library/react-table-library/table'
import {
  useSort,
  HeaderCellSort,
} from '@table-library/react-table-library/sort'
import { useTheme } from '@table-library/react-table-library/theme'
import { getTheme } from '@table-library/react-table-library/baseline'
import { usePagination } from '@table-library/react-table-library/pagination'
import { TableProps } from '@/types/TableProps.types'


/**
 * Table component.
 * @returns {JSX.Element} - The table component.
 */
export const EmployeeTable = () => {
  const { state } = useAppContext() // Get the global state from the context
  const employees = state.employees // Get the employees array from the global state

  const [search, setSearch] = React.useState('')
  const handleSearch = (e: any) => {
    setSearch(e.target.value)
  }
  /**
   * Raw data for the table.
   * We are using the employees array from the global state.
   * @param {TableProps} employee - The employee object.
   */
  const nodes = employees.map((employee: TableProps) => {
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
  /**
   * Data for the table.
   * Filters the data defined above based on the search string.
   */
  const data = {
    nodes: nodes.filter(
      (item: {
        firstName: string
        lastName: string
        department: string
        city: string
        state: string
      }) =>
        item.firstName.toLowerCase().includes(search.toLowerCase()) ||
        item.lastName.toLowerCase().includes(search.toLowerCase()) ||
        item.department.toLowerCase().includes(search.toLowerCase()) ||
        item.city.toLowerCase().includes(search.toLowerCase()) ||
        item.state.toLowerCase().includes(search.toLowerCase())
    ),
  }
  /**
   * Theme for the table.
   * Customizing the baseline theme from the react-table-library.
   */
  const theme = useTheme([
    getTheme(),
    {
      Table: `
        grid-template-columns: auto auto auto auto auto auto auto auto auto;
        table-layout: auto;
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
      `,
    },
  ])
  /**
   * Sort for the table.
   * Customizing the baseline sort from the react-table-library.
   * @param {TableProps} data - The employees data.
   * @param {any} sortIcon - customizes the sort icon.
   * @param {any} sortFns - the functions used to sort the data.
   * @param {any} onChange - undefined here as it's required by the baseline sort but we don't need it.
   */
  const sort = useSort(
    data,
    {
      onChange: undefined,
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
        STARTDATE: (array) =>
          array.sort((a, b) =>
            a.startDate
              .split('/')
              .reverse()
              .join()
              .localeCompare(b.startDate.split('/').reverse().join())
          ),
        DEPARTMENT: (array) =>
          array.sort((a, b) => a.department.localeCompare(b.department)),
        BIRTHDATE: (array) =>
          array.sort((a, b) =>
            a.birthDate
              .split('/')
              .reverse()
              .join()
              .localeCompare(b.birthDate.split('/').reverse().join())
          ),
        STREET: (array) =>
          array.sort((a, b) => a.street.localeCompare(b.street)),
        CITY: (array) => array.sort((a, b) => a.city.localeCompare(b.city)),
        STATE: (array) => array.sort((a, b) => a.state.localeCompare(b.state)),
        ZIPCODE: (array) => array.sort((a, b) => a.zipCode - b.zipCode),
      },
    }
  )
  /**
   * Pagination for the table.
   * Customizing the baseline pagination from the react-table-library.
   * @param {TableProps} data - The employees data.
   * @param {any} state - the initial state of the pagination.
   * @param {any} onChange - the function used to change the state of the pagination.
   */
  const pagination = usePagination(data, {
    state: {
      page: 0,
      size: 10,
    },
    onChange: onPaginationChange,
  })
  /**
   * Range of entries to display.
   * @param {number} start - the start index of the entries.
   * @param {number} end - the end index of the entries.
   */
  const [entriesRange, setEntriesRange] = useState<{
    start: number
    end: number
  }>({ start: 1, end: Math.min(pagination.state.size, data.nodes.length) })
  /**
   * Function to update the display of the range of entries.
   */
  function onPaginationChange() {
    const { page, size } = pagination.state
    const start = page * size + 1
    const end = Math.min(start + size - 1, data.nodes.length)
    setEntriesRange({ start, end })
  }

  /** Array of sizes for table entries */
  const sizes = [10, 25, 50, 100]

  return (
    <div className={styles.tableWrapper}>
      <div className={styles.tableWrapper__head}>
        <span>
          Show{' '}
          <select
            value={pagination.state.size}
            onChange={(e) => pagination.fns.onSetSize(Number(e.target.value))}
            name="page-size"
            className={styles.tableSelect}
          >
            {sizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>{' '}
          entries
        </span>

        <label htmlFor="search" className={styles.tableWrapper__label}>
          Search:&nbsp;
          <input
            id="search"
            type="text"
            value={search}
            onChange={handleSearch}
          />
        </label>
      </div>

      <Table data={data} theme={theme} sort={sort} pagination={pagination}>
        {(tableList: any[]) => (
          <>
            <Header>
              <HeaderRow>
                <HeaderCellSort sortKey="FIRSTNAME">First Name</HeaderCellSort>
                <HeaderCellSort sortKey="LASTNAME">Last Name</HeaderCellSort>
                <HeaderCellSort sortKey="STARTDATE">Start Date</HeaderCellSort>
                <HeaderCellSort sortKey="DEPARTMENT">Department</HeaderCellSort>
                <HeaderCellSort sortKey="BIRTHDATE">
                  Date of Birth
                </HeaderCellSort>
                <HeaderCellSort sortKey="STREET">Street</HeaderCellSort>
                <HeaderCellSort sortKey="CITY">City</HeaderCellSort>
                <HeaderCellSort sortKey="STATE">State</HeaderCellSort>
                <HeaderCellSort sortKey="ZIPCODE">Zip Code</HeaderCellSort>
              </HeaderRow>
            </Header>

            <Body>
              {tableList.map((item, index) => (
                <Row key={item.lastName + index} item={item}>
                  <Cell>{item.firstName}</Cell>
                  <Cell>{item.lastName}</Cell>
                  <Cell>{item.startDate}</Cell>
                  <Cell>{item.department}</Cell>
                  <Cell>{item.birthDate}</Cell>
                  <Cell>{item.street}</Cell>
                  <Cell>{item.city}</Cell>
                  <Cell>{item.state}</Cell>
                  <Cell>{item.zipCode}</Cell>
                </Row>
              ))}
            </Body>
          </>
        )}
      </Table>

      <div
        style={{
          fontSize: '14px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '1rem',
        }}
      >
        <span>
          Showing {entriesRange.start} to {entriesRange.end} of{' '}
          {data.nodes.length} entries.
        </span>

        <span>
          <button
            type="button"
            disabled={pagination.state.page === 0} // Disable the button when on the first page
            onClick={() => {
              const previousPageIndex = pagination.state.page - 1
              pagination.fns.onSetPage(previousPageIndex)
            }}
            className={styles.controlBtn}
          >
            Previous
          </button>{' '}
          {pagination.state
            .getPages(data.nodes)
            .map((_: any, index: number) => (
              <button
                key={index}
                type="button"
                style={{
                  fontWeight:
                    pagination.state.page === index ? 'bold' : 'normal',
                  backgroundColor:
                    pagination.state.page === index ? '#2473cd' : 'white',
                  color: pagination.state.page === index ? 'white' : 'black',
                }}
                onClick={() => pagination.fns.onSetPage(index)}
                className={styles.tableBtn}
              >
                {index + 1}
              </button>
            ))}{' '}
          <button
            type="button"
            disabled={
              pagination.state.page ===
              pagination.state.getTotalPages(data.nodes) - 1 // Disable the button when on the last page
            }
            onClick={() => {
              const nextPageIndex = pagination.state.page + 1
              pagination.fns.onSetPage(nextPageIndex)
            }}
            className={styles.controlBtn}
          >
            Next
          </button>
        </span>
      </div>
    </div>
  )
}
