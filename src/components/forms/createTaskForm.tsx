import React from "react"
import { Formik, Form, Field } from "formik"
import { Container, Grid } from "@material-ui/core"
import { TextField } from "formik-material-ui"
import { useAppDispatch } from "../../redux/reduxHooks"
import createTaskSchema from "./yupSchemas/createTaskSchema"
import createTaskThunk from "../../redux/projectSlice/thunks/createTaskThunk"
import FormHeader from "./formHeader"
import getProjectIdFromUrl from "../../utils/getProjectIdFromUrl"
import SubmitButton from "./submitButton"
import CancelButton from "./cancelButton"

interface Values {
  taskName: string
}

function CreateTaskForm({
  closePopover,
  groupId,
}: {
  closePopover: () => void
  groupId: string
}) {
  const projectId = getProjectIdFromUrl()

  const dispatch = useAppDispatch()

  return (
    <Container maxWidth="xs">
      <Grid container>
        <FormHeader title="Create Task" />
        <Grid item>
          <Formik
            initialValues={{
              taskName: "",
            }}
            validationSchema={createTaskSchema}
            onSubmit={async ({ taskName }: Values) => {
              try {
                await dispatch(
                  createTaskThunk({ taskName, groupId, projectId })
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
                      fullWidth
                      name="taskName"
                      label="Task Name"
                      placeholder="Name..."
                    />
                  </Grid>
                  <Grid item>
                    <SubmitButton text="Create" disabled={isSubmitting} />
                  </Grid>
                  <Grid item>
                    <CancelButton
                      disabled={isSubmitting}
                      onClick={closePopover}
                    />
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </Container>
  )
}

export default CreateTaskForm
