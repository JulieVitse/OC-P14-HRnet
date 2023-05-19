import { createContext, useContext, useEffect, useState } from 'react'
import { EmployeeData } from '@/types/formInputs'

interface DataContextType {
    employeeData: EmployeeData[]
    addData: (newUser: EmployeeData) => void
}

/* export interface FormDataContextProps {
  formData: EmployeeData[]
  setFormData: (formData: EmployeeData[]) => void
} */

export const FormDataContext = createContext<DataContextType>(null as any)

export const FormDataProvider = ({ children }: any) => {
  const [employeeData, setEmployeeData] = useState<EmployeeData[]>([])
    //const [formData, setFormData] = useState<EmployeeData[]>(employeeData)

    const addData = (newUser: EmployeeData) => {
        /* const updatedData = [...employeeData, newUser]
        setEmployeeData(updatedData) */
        setEmployeeData((employeeData) => [...employeeData, newUser])
        employeeData.push(newUser)
        localStorage.setItem('formData', JSON.stringify(employeeData))
        /* console.log(updatedData)
        localStorage.setItem('formData', JSON.stringify(updatedData)) */
    }

    console.log(employeeData)

    
 /*  useEffect(() => {
    const formDataFromStorage = localStorage.getItem('formData')
    if (formDataFromStorage) {
      setFormData(JSON.parse(formDataFromStorage))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData))
  }, [formData]) */

  return (
    <FormDataContext.Provider value={{ employeeData, addData }}>
      {children}
    </FormDataContext.Provider>
  )
}
