import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { Open_Sans } from 'next/font/google'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import styles from '@/components/Form/Form.module.scss'

const openSans = Open_Sans({ subsets: ['latin'] })

type Inputs = {
  firstName: string
  lastName: string
  birthDate: Date
  startDate: Date
}

export default function Form() {
  const {
    watch,
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

  const maxDate = new Date()
  maxDate.setFullYear(maxDate.getFullYear() - 18)
  const todayDate = new Date()

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <h2 className={`${openSans.className} ${styles.form__title}`}>
        Create Employee
      </h2>
      {/* register your input into the hook by invoking the "register" function */}
      <div className={styles.form__field}>
        <label htmlFor="firstName">First Name</label>
        <input {...register('firstName', { required: true })} />

        {errors.firstName && (
          <span className={styles.form__field__error}>
            This field is required
          </span>
        )}
      </div>

      <div className={styles.form__field}>
        <label htmlFor="lastName">Last Name</label>
        <input {...register('lastName', { required: true })} />

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
            />
          )}
        />

        {errors.startDate && (
          <span className={styles.form__field__error}>
            This field is required
          </span>
        )}
      </div>

      <input type="submit" />
    </form>
  )
}
