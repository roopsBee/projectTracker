import React from "react"
import { Formik, Form, Field } from "formik"
import { Button, Container } from "@material-ui/core"
import { TextField } from "formik-material-ui"
import signupSchema from "../components/yupSchemas/signupSchema"
import firebase from "gatsby-plugin-firebase"
import axios from "axios"
import * as faunadb from "faunadb"
import { useAppDispatch } from "../redux/reduxHooks"
import { login } from "../redux/userSlice"

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
            const res = await firebase
              .auth()
              .createUserWithEmailAndPassword(email, password)
            console.log("Created new user", res)

            //get firebase id token
            const userIdToken = await firebase
              .auth()
              .currentUser?.getIdToken(true)
            console.log("Got user id token")

            // get faunadb secret with user token
            const { data } = await axios.post(
              "/.netlify/functions/user-create-login",
              {
                userIdToken,
                userName,
              }
            )
            console.log("Got fauna user data", data)
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
