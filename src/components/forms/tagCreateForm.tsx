/** @jsx jsx */
import { jsx } from "@emotion/react"
import React from "react"
import { Formik, Form, Field } from "formik"
import { Box, Grid } from "@material-ui/core"
import { TextField } from "formik-material-ui"
import { useAppDispatch } from "../../redux/reduxHooks"
import getProjectIdFromUrl from "../../utils/getProjectIdFromUrl"
import SubmitButton from "./submitButton"
import tagCreateSchema from "./yupSchemas/tagCreateSchema"
import FormikColorPicker from "../formikColorPicker"
import tagCreateThunk from "../../redux/projectSlice/thunks/tagCreateThunk"

interface Values {
  name: string
  color: string
}

function TagCreateForm({ closePopover }: { closePopover: () => void }) {
  const projectId = getProjectIdFromUrl()
  const dispatch = useAppDispatch()

  return (
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
          await dispatch(
            tagCreateThunk({ tagName: name, tagColor: color, projectId })
          )
        } catch (error) {
          console.log(error)
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form
          style={{ width: "100%", position: "relative", marginBottom: "15px" }}
        >
          <Grid alignItems="flex-start" container spacing={1} justify="center">
            <Grid item xs={6}>
              <Field
                component={TextField}
                fullWidth
                name="name"
                label="Name"
                placeholder="Name..."
              />
            </Grid>
            <Grid item container justify="center" xs={2}>
              <Box top="11px" clone>
                <FormikColorPicker name="color" />
              </Box>
            </Grid>
            <Grid item container justify="flex-end" xs={4} sm={3}>
              <SubmitButton
                style={{ top: "11px", height: "39px" }}
                text="Create"
                disabled={isSubmitting}
              />
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  )
}

export default TagCreateForm
