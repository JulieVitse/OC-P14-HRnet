import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Select from 'react-select'
import { states } from '@/data/stateList'
import { department } from '@/data/departmentList'
import styles from '@/components/Form/Form.module.scss'
import React, { useContext, useState } from 'react'
import { FormDataContext } from '@/contexts/formDataContext'


type FormInputs = {
  firstName: string
  lastName: string
  birthDate: Date
  startDate: Date
  street: string
  city: string
  state: string
  selectState: string
  zipCode: number
  selectDepartment: string
  department: string
}

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



export default function Form() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>()

  const maxDate = new Date()
  maxDate.setFullYear(maxDate.getFullYear() - 18)
  const todayDate = new Date()

  const { employeeData, addData } = useContext(FormDataContext)

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    //console.log(data)
    addData(data)
    localStorage.setItem('formData', JSON.stringify(data))
  }

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      {employeeData.map((item) => (
        <div key={item.firstName}>
          <p>{item.firstName}</p>
          <p>{item.lastName}</p>
        </div>
      )
        )}
      {/* register your input into the hook by invoking the "register" function */}
      <div className={styles.form__field}>
        <label htmlFor="firstName">First Name </label>
        <input
          {...register('firstName', { required: true })}
          className={
            errors.firstName ? styles.form__input__error : styles.form__input
          }
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
              onChange={(date) => field.onChange(date)}
              selected={field.value}
              maxDate={maxDate}
              dateFormat="dd/MM/yyyy"
              className={
                errors.birthDate
                  ? styles.form__input__error
                  : styles.form__input
              }
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
              onChange={(date) => field.onChange(date)}
              selected={field.value}
              maxDate={todayDate}
              dateFormat="dd/MM/yyyy"
              className={
                errors.startDate
                  ? styles.form__input__error
                  : styles.form__input
              }
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
  )
}
