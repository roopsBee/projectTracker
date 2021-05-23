/**@jsx jsx */
import React from "react"
import { Formik, Form, Field } from "formik"
import { Container, Grid } from "@material-ui/core"
import { TextField } from "formik-material-ui"
import loginSchema from "./yupSchemas/loginSchema"
import { useAppDispatch } from "../../redux/reduxHooks"
import loginThunk from "../../redux/userSlice/loginThunk"
import FormHeader from "./formHeader"
import SubmitButton from "./submitButton"
import { navigate } from "gatsby"
import { jsx } from "@emotion/react"

interface Values {
  password: string
  email: string
}

function LogIn({ handleClosePopover }: { handleClosePopover: () => void }) {
  const dispatch = useAppDispatch()

  return (
    <Container maxWidth="xs">
      <FormHeader title="Login" />
      <Formik
        initialValues={{
          password: "",
          email: "",
        }}
        validationSchema={loginSchema}
        onSubmit={async ({ password, email }: Values) => {
          try {
            await dispatch(loginThunk({ email, password }))
            navigate("/app")
            handleClosePopover()
          } catch (error) {
            console.log(error)
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
                  name="email"
                  label="Email"
                  placeholder="your@email.com"
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
              <Grid item container justify="center">
                <SubmitButton fullWidth text="Login" disabled={isSubmitting} />
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Container>
  )
}

export default LogIn
