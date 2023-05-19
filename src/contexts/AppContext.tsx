import {
  ReactNode,
  createContext,
  useReducer,
  useContext,
  useMemo,
  useEffect,
} from 'react'
import { AppReducer, initialState } from './AppReducer'

const AppContext = createContext({} as any)

export function AppWrapper({ children }: { children: ReactNode }) {
  
  const [state, dispatch] = useReducer(AppReducer, initialState)
  const contextValue = useMemo(() => {
    return { state, dispatch }
  }, [state, dispatch])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedEmployees = localStorage.getItem('employees')
      if (storedEmployees) {
        try {
          const employees = JSON.parse(storedEmployees)
          dispatch({
            type: 'SET_EMPLOYEES',
            payload: employees,
          })
        } catch (error) {
          console.error('Error parsing stored employees:', error)
        }
      }
    }
  }, [])

  useEffect(() => {
    if (state !== initialState) {
        localStorage.setItem('employees', JSON.stringify(state.employees))
    }
    }, [state, state.employees])

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  )
}
export function useAppContext() {
  return useContext(AppContext)
}