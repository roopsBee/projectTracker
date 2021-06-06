/** @jsx jsx */
import { jsx } from "@emotion/react"
import React, { useState } from "react"
import { Formik, Form, Field } from "formik"
import { Container, Grid } from "@material-ui/core"
import { TextField } from "formik-material-ui"
import { useAppDispatch } from "../../redux/reduxHooks"
import getProjectIdFromUrl from "../../utils/getProjectIdFromUrl"
import SubmitButton from "./submitButton"
import tagCreateSchema from "./yupSchemas/tagCreateSchema"
import FormikColorPicker from "../formikColorPicker"

interface Values {
  name: string
  color: string
}

function TagCreateForm({ closePopover }: { closePopover: () => void }) {
  const projectId = getProjectIdFromUrl()

  const dispatch = useAppDispatch()

  return (
    <Container disableGutters>
      <Formik
        initialValues={{
          name: "",
          color: "",
        }}
        validationSchema={tagCreateSchema}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={async ({ name, color }: Values) => {
          try {
            // await dispatch(createTagThunk({}))
            console.log({ name, color })
          } catch (error) {
            console.log(error)
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Grid container item xs={12} justify="center">
              <Grid item xs={6}>
                <Field
                  component={TextField}
                  fullWidth
                  name="name"
                  label="Name"
                  placeholder="Name..."
                />
              </Grid>
              <Grid item>
                <FormikColorPicker name="color" />
              </Grid>
              <Grid item>
                <SubmitButton text="Create" disabled={isSubmitting} />
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Container>
  )
}

export default TagCreateForm
