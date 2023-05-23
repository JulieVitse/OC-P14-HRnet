import {
  ReactNode,
  createContext,
  useReducer,
  useContext,
  useMemo,
  useEffect,
} from 'react'
/* reducer */
import { AppReducer, initialState } from './AppReducer'

const AppContext = createContext({} as any)

/**
 * AppWrapper component to wrap the entire app with the context provider
 * @param children - the children components
 * @returns the context provider
 * @example
 * ```tsx
 * <AppWrapper>
 *  <App />
 * </AppWrapper>
 * ```
 */
export function AppWrapper({ children }: { children: ReactNode }) {
  
  const [state, dispatch] = useReducer(AppReducer, initialState)
  const contextValue = useMemo(() => {
    return { state, dispatch }
  }, [state, dispatch]) // memoize the context value to update only when the state or dispatch change

  // load stored employees from local storage and set the state with them if they exist in local storage using dispatch
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

  // store the employees in local storage when the state changes
  useEffect(() => {
    if (state !== initialState) {
        localStorage.setItem('employees', JSON.stringify(state.employees))
    }
    }, [state, state.employees])

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  )
}
/**
 * Custom hook to use the app context
 * @returns the app context
 * @example
 * ```tsx
 * const { state, dispatch } = useAppContext()
 * ```
 */
export function useAppContext() {
  return useContext(AppContext)
}