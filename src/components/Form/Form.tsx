import React, { useEffect } from 'react'
/* libs */
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import DatePicker from 'react-datepicker'
import Select from 'react-select'
import moment from 'moment'
import { Modal, useModal } from 'julie-react-ts-modal'
/* data */
import { states } from '@/data/stateList'
import { department } from '@/data/departmentList'
/* types */
import { FormInputs } from '@/types/FormInputs.types'
/* styles */
import 'react-datepicker/dist/react-datepicker.css'
import styles from '@/components/Form/Form.module.scss'
/* context */
import { useAppContext } from '@/contexts/AppContext'

const customStyles = {
  control: (provided: any) => ({
    ...provided,
    borderRadius: '5px',
    background: 'white',
    border: 'none',
    boxShadow: '0 0 10px #dddddd',
    width: '175.38px',
    minHeight: 'initial',
  }),
  input: (provided: any) => ({
    ...provided,
    margin: '0',
    background: 'transparent',
    border: 'none',
    boxShadow: 'none',
  }),
}

/**
 * @function Form
 * @returns Form component
 * @description Form component that handles employee creation
 */
export default function Form() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>()

  /** Sets max dates for datepickers
   * maxDate: used in birthdate, sets max selectable date to 18 years ago
   * todayDate: used in startdate, sets max selectable date to today
   * */
  const maxDate = new Date()
  maxDate.setFullYear(maxDate.getFullYear() - 18)
  const todayDate = new Date()

  const { dispatch } = useAppContext()

  // gets functions from useModal hook
  const { isOpen, openModal, closeModal, handleEscClose } = useModal()
  handleEscClose() // closes modal on ESC key press

  /**
   * @function onSubmit Handles form submit
   * @param data FormInputs
   * dispatches ADD_EMPLOYEE action to AppReducer
   * opens modal on successful submit
   */
  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    console.log(data)
    dispatch({ type: 'ADD_EMPLOYEE', payload: data })
    openModal()
  }

  // sets page title
  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.title = 'HR Net | Create Employee'
    }
  }, [])

  return (
    <>
      {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        {/* register your input into the hook by invoking the "register" function */}
        <div className={styles.form__field}>
          <label htmlFor="firstName">First Name </label>
          <input
            {...register('firstName', { required: true })}
            className={
              errors.firstName ? styles.form__input__error : styles.form__input
            }
            id="firstName"
          />

          {errors.firstName && (
            <span className={styles.form__field__error}>
              This field is required
            </span>
          )}
        </div>

        <div className={styles.form__field}>
          <label htmlFor="lastName">Last Name</label>
          <input
            {...register('lastName', { required: true })}
            className={
              errors.lastName ? styles.form__input__error : styles.form__input
            }
            id="lastName"
          />

          {errors.lastName && (
            <span className={styles.form__field__error}>
              This field is required
            </span>
          )}
        </div>

        <div className={styles.form__field}>
          <label htmlFor="birthdate">Date of Birth</label>
          <Controller
            control={control}
            name="birthDate"
            rules={{ required: true }}
            render={({ field }) => (
              <DatePicker
                placeholderText="Select date"
                onChange={(date) => {
                  const formattedDate = moment(date).format('DD/MM/YYYY')
                  field.onChange(formattedDate)
                }}
                selected={
                  field.value
                    ? moment(field.value, 'DD/MM/YYYY').toDate()
                    : null
                }
                maxDate={maxDate}
                dateFormat="dd/MM/yyyy"
                className={
                  errors.birthDate
                    ? styles.form__input__error
                    : styles.form__input
                }
                id="birthdate"
              />
            )}
          />

          {errors.birthDate && (
            <span className={styles.form__field__error}>
              This field is required
            </span>
          )}
        </div>

        <div className={styles.form__field}>
          <label htmlFor="startdate">Start Date</label>
          <Controller
            control={control}
            name="startDate"
            rules={{ required: true }}
            render={({ field }) => (
              <DatePicker
                placeholderText="Select date"
                onChange={(date) => {
                  const formattedDate = moment(date).format('DD/MM/YYYY')
                  field.onChange(formattedDate)
                }}
                selected={
                  field.value
                    ? moment(field.value, 'DD/MM/YYYY').toDate()
                    : null
                }
                maxDate={todayDate}
                dateFormat="dd/MM/yyyy"
                className={
                  errors.startDate
                    ? styles.form__input__error
                    : styles.form__input
                }
                id="startdate"
              />
            )}
          />

          {errors.startDate && (
            <span className={styles.form__field__error}>
              This field is required
            </span>
          )}
        </div>

        <fieldset className={styles.fieldset}>
          <legend>Address</legend>
          <div className={styles.form__field}>
            <label htmlFor="street">Street</label>
            <input
              {...register('street', { required: true })}
              className={
                errors.street ? styles.form__input__error : styles.form__input
              }
              id="street"
            />

            {errors.street && (
              <span className={styles.form__field__error}>
                This field is required
              </span>
            )}
          </div>

          <div className={styles.form__field}>
            <label htmlFor="city">City</label>
            <input
              {...register('city', { required: true })}
              className={
                errors.city ? styles.form__input__error : styles.form__input
              }
              id="city"
            />

            {errors.city && (
              <span className={styles.form__field__error}>
                This field is required
              </span>
            )}
          </div>

          <div className={styles.form__field}>
            <label htmlFor="state">State</label>
            <Controller
              name="selectState"
              control={control}
              defaultValue={undefined}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <Select
                  options={states}
                  onChange={(selectedOption) => onChange(selectedOption)}
                  value={states.find((state) => state.value === value)}
                  isClearable={true}
                  styles={customStyles}
                  instanceId={'state'}
                  inputId="state"
                />
              )}
            />

            {errors.selectState && (
              <span className={styles.form__field__error}>
                This field is required
              </span>
            )}
          </div>

          <div className={styles.form__field}>
            <label htmlFor="zipCode">Zip Code</label>
            <input
              {...register('zipCode', { valueAsNumber: true, required: true })}
              className={
                errors.zipCode ? styles.form__input__error : styles.form__input
              }
              type="number"
              id="zipCode"
            />

            {errors.zipCode && (
              <span className={styles.form__field__error}>
                This field is required
              </span>
            )}
          </div>
        </fieldset>

        <div className={styles.form__field}>
          <label htmlFor="department">Department</label>
          <Controller
            name="selectDepartment"
            control={control}
            defaultValue={undefined}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <Select
                options={department}
                onChange={(selectedOption) => onChange(selectedOption)}
                value={department.find((item) => item.value === value)}
                isClearable={true}
                styles={customStyles}
                instanceId={'department'}
                inputId="department"
              />
            )}
          />

          {errors.selectDepartment && (
            <span className={styles.form__field__error}>
              This field is required
            </span>
          )}
        </div>

        <input type="submit" value="Save" className={styles.btn} />
      </form>

      <Modal
        isOpen={isOpen}
        closeModal={closeModal}
        textContent="Employee successfully created!"
        modalClass={styles.modal__custom}
      />
    </>
  )
}
