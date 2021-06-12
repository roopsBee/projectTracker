import React from "react"
import { Formik, Form, Field, FormikHelpers } from "formik"
import { Grid } from "@material-ui/core"
import { TextField } from "formik-material-ui"
import { useAppDispatch } from "../../redux/reduxHooks"
import getProjectIdFromUrl from "../../utils/getProjectIdFromUrl"
import SubmitButton from "./submitButton"
import tagSchema from "./yupSchemas/tagSchema"
import FormikColorPicker from "../formikColorPicker"
import tagCreateThunk from "../../redux/projectSlice/thunks/tagCreateThunk"
import { ProjectTag } from "../../redux/projectSlice/projectSlice"
import { v4 as uuid } from "uuid"

interface Values {
  name: string
  color: string
}

function TagCreateForm() {
  const projectId = getProjectIdFromUrl()
  const dispatch = useAppDispatch()

  return (
    <Formik
      initialValues={{
        name: "",
        color: "",
      }}
      validationSchema={tagSchema}
      validateOnBlur={false}
      validateOnChange={false}
      onSubmit={async (
        { name, color }: Values,
        { resetForm }: FormikHelpers<Values>
      ) => {
        try {
          const tag: ProjectTag = {
            tagName: name,
            tagColor: color,
            tagId: uuid(),
          }
          await dispatch(tagCreateThunk({ tag, projectId }))
          resetForm({ values: { name: "", color } })
        } catch (error) {
          console.log(error)
        }
      }}
    >
      {({ isSubmitting, values }) => (
        <Form
          style={{ width: "100%", position: "relative", marginBottom: "15px" }}
        >
          <Grid alignItems="flex-start" container spacing={1} justify="center">
            <Grid item xs={6}>
              <Field
                component={TextField}
                fullWidth
                name="name"
                placeholder="Name..."
              />
            </Grid>
            <Grid item container justify="center" xs={2}>
              <FormikColorPicker initialColor="rgb(3 169 244)" name="color" />
            </Grid>
            <Grid item container justify="flex-end" xs={4} sm={3}>
              <SubmitButton
                style={{ height: "39px" }}
                text="Create"
                disabled={isSubmitting || values.name === ""}
              />
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  )
}

export default TagCreateForm
