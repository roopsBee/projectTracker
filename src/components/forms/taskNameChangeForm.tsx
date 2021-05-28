import React from "react"
import { Formik, Form, Field } from "formik"
import { Container, Grid } from "@material-ui/core"
import { TextField } from "formik-material-ui"
import { useAppDispatch } from "../../redux/reduxHooks"
import { TaskType } from "../../redux/projectSlice/projectSlice"
import taskNameChangeThunk from "../../redux/projectSlice/thunks/taskNameChangeThunk"
import taskNameChangeschema from "./yupSchemas/taskNameChangeschema"
import FormHeader from "./formHeader"
import getProjectIdFromUrl from "../../utils/getProjectIdFromUrl"
import CancelButton from "./cancelButton"
import SubmitButton from "./submitButton"

interface Values {
  taskName: string
}

function TaskChangeNameForm({
  closePopover,
  task,
}: {
  closePopover: () => void
  task: TaskType
}) {
  const projectId = getProjectIdFromUrl()
  const dispatch = useAppDispatch()
  const { taskId, taskName } = task

  return (
    <Container maxWidth="xs">
      <Grid container>
        <FormHeader title="Change Task Name" />
        <Grid item>
          <Formik
            initialValues={{
              taskName,
            }}
            validationSchema={taskNameChangeschema}
            onSubmit={async ({ taskName: newName }: Values) => {
              try {
                await dispatch(
                  taskNameChangeThunk({ newName, taskId, projectId })
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
                    <SubmitButton text="Save" disabled={isSubmitting} />
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

export default TaskChangeNameForm
