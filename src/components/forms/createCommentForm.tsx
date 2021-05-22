/** @jsx jsx */
import { jsx } from "@emotion/react"
import React from "react"
import { Formik, Form, Field } from "formik"
import { Container, Grid } from "@material-ui/core"
import { TextField } from "formik-material-ui"
import { useAppDispatch } from "../../redux/reduxHooks"
import createCommentSchema from "./yupSchemas/createCommentSchema"
import createCommentThunk from "../../redux/projectSlice/thunks/createCommentThunk"
import getProjectIdFromUrl from "../../utils/getProjectIdFromUrl"
import SubmitButton from "./submitButton"
import CancelButton from "./cancelButton"

interface Values {
  text: string
}

function CreateTaskForm({
  closePopover,
  taskId,
}: {
  closePopover: () => void
  taskId: string
}) {
  const projectId = getProjectIdFromUrl()

  const dispatch = useAppDispatch()

  return (
    <Container disableGutters>
      <Formik
        initialValues={{
          text: "",
        }}
        validationSchema={createCommentSchema}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={async ({ text }: Values) => {
          try {
            await dispatch(
              createCommentThunk({ taskId, commentText: text, projectId })
            )
            closePopover()
          } catch (error) {
            console.log(error)
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Grid container item xs={12} spacing={1} justify="center">
              <Grid item xs={12}>
                <Field
                  component={TextField}
                  variant="outlined"
                  multiline
                  css={{ width: "100%" }}
                  fullWidth
                  name="text"
                  label="Comment"
                  placeholder="Comment..."
                  rows={2}
                  rowsMax={10}
                />
              </Grid>
              <Grid item>
                <SubmitButton disabled={isSubmitting} />
              </Grid>
              <Grid item>
                <CancelButton
                  text="Close"
                  disabled={isSubmitting}
                  onClick={closePopover}
                />
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Container>
  )
}

export default CreateTaskForm
