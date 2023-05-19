export type EmployeeType = {
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

export const mockedEmployees = [
  {
    id: '0',
    firstName: 'Landon',
    lastName: 'Linsley',
    startDate: '09/01/2021',
    selectDepartment: 'Sales',
    department: 'Sales',
    birthDate: '25/01/1990',
    street: '1234 Main St',
    city: 'Salt Lake City',
    selectState: 'UT',
    state: 'UT',
    zipCode: 84101,
  },

  {
    id: '1',
    firstName: 'Emily',
    lastName: 'Smith',
    startDate: '11/05/2022',
    department: 'Marketing',
    birthDate: '12/07/1988',
    street: '5678 Elm St',
    city: 'Chicago',
    state: 'IL',
    zipCode: 60601,
  },

  {
    id: '2',
    firstName: 'Jacob',
    lastName: 'Johnson',
    startDate: '03/15/2023',
    department: 'Finance',
    birthDate: '08/23/1992',
    street: '9876 Oak St',
    city: 'New York',
    state: 'NY',
    zipCode: 10001,
  },
  {
    id: '3',
    firstName: 'Ava',
    lastName: 'Williams',
    startDate: '07/10/2022',
    department: 'Human Resources',
    birthDate: '05/14/1995',
    street: '2468 Pine St',
    city: 'Los Angeles',
    state: 'CA',
    zipCode: 90001,
  },
  {
    id: '4',
    firstName: 'Oliver',
    lastName: 'Brown',
    startDate: '02/28/2023',
    department: 'Engineering',
    birthDate: '11/30/1991',
    street: '1357 Cedar St',
    city: 'Houston',
    state: 'TX',
    zipCode: 77002,
  },
]
