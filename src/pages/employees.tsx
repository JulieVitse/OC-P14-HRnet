import React, { useEffect } from 'react'
import Link from 'next/link'
/* styles */
import styles from '../styles/Employees.module.scss'
/* components */
import { EmployeeTable } from '../components/Table/Table'

/**
 * Employees page
 * @returns {JSX.Element} - Employees page
 */
const Employees = () => {
  // sets page title
  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.title = 'HR Net | Employee List'
    }
  }, [])
  return (
    <section className={styles.wrapper}>
      <h2 className={styles.wrapper__title}>Current Employees</h2>
      <EmployeeTable />
      <Link href="/" className="btn" style={{ margin: 'auto' }}>
        Return to Home
      </Link>
    </section>
  )
}

export default Employees