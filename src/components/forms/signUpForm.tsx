import React from "react"
import { Formik, Form, Field } from "formik"
import { Container, Grid } from "@material-ui/core"
import { TextField } from "formik-material-ui"
import signupSchema from "./yupSchemas/signupSchema"
import { useAppDispatch } from "../../redux/reduxHooks"
import signUpThunk from "../../redux/userSlice/signUpThunk"
import FormHeader from "./formHeader"
import SubmitButton from "./submitButton"
import { unwrapResult } from "@reduxjs/toolkit"
import { useSnackbar } from "notistack"

interface Values {
  password: string
  confirmPassword: string
  email: string
  userName: string
}

function SignUp() {
  const dispatch = useAppDispatch()
  const { enqueueSnackbar } = useSnackbar()
  return (
    <Container maxWidth="xs">
      <FormHeader title="Sign Up" />
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
            const res = await dispatch(
              signUpThunk({ email, password, userName })
            )
            unwrapResult(res)
          } catch (error) {
            if (error.code === "auth/email-already-in-use") {
              enqueueSnackbar("Email already in use. Please use another.", {
                variant: "error",
              })
            }
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Grid container spacing={1}>
              <Grid item container>
                <Field
                  component={TextField}
                  fullWidth
                  name="userName"
                  label="User Name"
                  placeholder="Your username..."
                />
              </Grid>
              <Grid item container>
                <Field
                  component={TextField}
                  fullWidth
                  name="email"
                  label="Email"
                  placeholder="john@acme.com"
                  type="email"
                />
              </Grid>
              <Grid item container>
                <Field
                  component={TextField}
                  fullWidth
                  name="password"
                  label="Password"
                  placeholder="Password"
                />
              </Grid>
              <Grid item container>
                <Field
                  component={TextField}
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  placeholder="Confirm Password"
                />
              </Grid>
              <Grid item container>
                <SubmitButton
                  text="Sign Up"
                  fullWidth
                  disabled={isSubmitting}
                />
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Container>
  )
}

export default SignUp
