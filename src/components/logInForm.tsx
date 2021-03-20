import React from "react"
import { Formik, Form, Field } from "formik"
import { Button, Container } from "@material-ui/core"
import { TextField } from "formik-material-ui"
import loginSchema from "../components/yupSchemas/loginSchema"
import firebase from "gatsby-plugin-firebase"
import axios from "axios"
import * as faunadb from "faunadb"
import { useAppDispatch } from "../redux/reduxHooks"
import { login } from "../redux/userSlice"

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
            await firebase.auth().signInWithEmailAndPassword(email, password)
            const userIdToken = await firebase
              .auth()
              .currentUser?.getIdToken(true)
            const { data } = await axios.post(
              "/.netlify/functions/user-login",
              {
                userIdToken,
              }
            )
            const { secret } = data
            const client = new faunadb.Client({ secret })
            const q = faunadb.query
            const userId = await client.query(q.CurrentIdentity())
            dispatch(login({ ...data, secret, userId }))
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
