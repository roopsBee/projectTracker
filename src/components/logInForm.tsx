import React from "react"
import { Formik, Form, Field } from "formik"
import { Button, Container } from "@material-ui/core"
import { TextField } from "formik-material-ui"
import loginSchema from "../components/yupSchemas/loginSchema"
import { useAppDispatch } from "../redux/reduxHooks"
import { login } from "../redux/userSlice/userSlice"

interface Values {
  password: string
  email: string
}

function LogIn() {
  const dispatch = useAppDispatch()

  return (
    <Container maxWidth="xs">
      <h1>Log In</h1>
      <Formik
        initialValues={{
          password: "",
          email: "",
        }}
        validationSchema={loginSchema}
        onSubmit={async ({ password, email }: Values) => {
          try {
            const res = await dispatch(login({ email, password }))
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
            <Button disabled={isSubmitting} type="submit">
              Log In
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  )
}

export default LogIn
