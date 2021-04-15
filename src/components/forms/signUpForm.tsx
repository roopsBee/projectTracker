import React from "react"
import { Formik, Form, Field } from "formik"
import { Button, Container } from "@material-ui/core"
import { TextField } from "formik-material-ui"
import signupSchema from "./yupSchemas/signupSchema"
import { useAppDispatch } from "../../redux/reduxHooks"
import signUpThunk from "../../redux/userSlice/signUpThunk"

interface Values {
  password: string
  confirmPassword: string
  email: string
  userName: string
}

function SignUp() {
  const dispatch = useAppDispatch()

  return (
    <Container maxWidth="xs">
      <h1>Signup</h1>
      <Formik
        initialValues={{
          password: "",
          confirmPassword: "",
          email: "",
          userName: "",
        }}
        validationSchema={signupSchema}
        onSubmit={async ({ email, password, userName }: Values) => {
          try {
            await dispatch(signUpThunk({ email, password, userName }))
          } catch (error) {
            console.log(error)
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field
              component={TextField}
              fullWidth
              name="userName"
              label="User Name"
              placeholder="Your username..."
            />
            <Field
              component={TextField}
              fullWidth
              name="email"
              label="Email"
              placeholder="john@acme.com"
              type="email"
            />
            <Field
              component={TextField}
              fullWidth
              name="password"
              label="Password"
              placeholder="Password"
            />
            <Field
              component={TextField}
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              placeholder="Confirm Password"
            />

            <Button disabled={isSubmitting} type="submit">
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  )
}

export default SignUp
