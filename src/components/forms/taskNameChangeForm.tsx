import React from "react"
import { Formik, Form, Field } from "formik"
import { Button, Container, Grid } from "@material-ui/core"
import { TextField } from "formik-material-ui"
import { useAppDispatch } from "../../redux/reduxHooks"
import { TaskType } from "../../redux/projectSlice/projectSlice"
import taskNameChangeThunk from "../../redux/projectSlice/thunks/taskNameChangeThunk"
import taskNameChangeschema from "./yupSchemas/taskNameChangeschema"
import FormHeader from "./formHeader"

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
  const url = typeof window !== "undefined" ? window.location.pathname : ""
  const urlArr = url.split("/")
  const projectId = urlArr[3]
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
                    <Button
                      variant="outlined"
                      disabled={isSubmitting}
                      type="submit"
                    >
                      Submit
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="outlined"
                      disabled={isSubmitting}
                      onClick={closePopover}
                    >
                      Cancel
                    </Button>
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
