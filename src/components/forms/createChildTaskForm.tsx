import React from "react"
import { Formik, Form, Field } from "formik"
import { Container, Grid } from "@material-ui/core"
import { TextField } from "formik-material-ui"
import { useAppDispatch } from "../../redux/reduxHooks"
import createChildTaskSchema from "./yupSchemas/createChildTaskSchema"
import createChildTaskThunk from "../../redux/projectSlice/thunks/createChildTaskThunk"
import FormHeader from "./formHeader"
import getProjectIdFromUrl from "../../utils/getProjectIdFromUrl"
import SubmitButton from "./submitButton"
import CancelButton from "./cancelButton"

interface Values {
  childTaskName: string
}

function CreateTaskForm({
  closePopover,
  taskId,
  groupId,
}: {
  closePopover: () => void
  taskId: string
  groupId: string
}) {
  const projectId = getProjectIdFromUrl()
  const dispatch = useAppDispatch()

  return (
    <Container maxWidth="xs">
      <Grid container>
        <FormHeader title="Create Sub-Task" />
        <Grid item>
          <Formik
            initialValues={{
              childTaskName: "",
            }}
            validationSchema={createChildTaskSchema}
            onSubmit={async ({ childTaskName }: Values) => {
              try {
                await dispatch(
                  createChildTaskThunk({
                    childTaskName,
                    groupId,
                    taskId,
                    projectId,
                  })
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
                      name="childTaskName"
                      label="Sub-Task Name"
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
