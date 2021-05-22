import React from "react"
import { Formik, Form, Field } from "formik"
import { Container } from "@material-ui/core"
import { TextField } from "formik-material-ui"
import loginSchema from "./yupSchemas/loginSchema"
import { useAppDispatch } from "../../redux/reduxHooks"
import loginThunk from "../../redux/userSlice/loginThunk"
import FormHeader from "./formHeader"
import SubmitButton from "./submitButton"
import { navigate } from "gatsby"

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
            <SubmitButton text="Login" disabled={isSubmitting} />
          </Form>
        )}
      </Formik>
    </Container>
  )
}

export default LogIn
