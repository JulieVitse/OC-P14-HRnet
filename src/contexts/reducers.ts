export const employeeReducer = (state: any, action: any) => {
  switch (action.type) {
    case "ADD_EMPLOYEE":
      return [...state, action.payload];
    case "DELETE_EMPLOYEE":
      return state.filter((employee: any) => employee.id !== action.payload);
    case "UPDATE_EMPLOYEE":
      return state.map((employee: any) =>
        employee.id === action.payload.id ? action.payload : employee
      );
    default:
      return state;
  }
}

