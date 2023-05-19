import { mockedEmployees } from '../data/mockedEmployees'
import { EmployeeType } from '../data/mockedEmployees'

export const initialState = {
  employees: mockedEmployees,
}

export const AppReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'ADD_EMPLOYEE':
      let newEmployee = [...state.employees, action.payload]
      return {
        ...state,
        employees: newEmployee,
      }
    case 'SET_EMPLOYEES':
      return {
        ...state,
        employees: action.payload,
      }
    default:
      return state
  }
}
