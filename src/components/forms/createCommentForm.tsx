/** @jsx jsx */
import { jsx } from "@emotion/react"
import React from "react"
import { Formik, Form, Field } from "formik"
import { Button, Container, Grid } from "@material-ui/core"
import { TextField } from "formik-material-ui"
import { useAppDispatch } from "../../redux/reduxHooks"
import createCommentSchema from "./yupSchemas/createCommentSchema"
import createCommentThunk from "../../redux/projectSlice/thunks/createCommentThunk"

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
  const url = typeof window !== "undefined" ? window.location.pathname : ""
  const urlArr = url.split("/")
  const projectId = urlArr[3]

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
            dispatch(
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
                <Button
                  variant="outlined"
                  disabled={isSubmitting}
                  type="submit"
                >
                  Add
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  disabled={isSubmitting}
                  onClick={closePopover}
                >
                  Close
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Container>
  )
}

export default CreateTaskForm
