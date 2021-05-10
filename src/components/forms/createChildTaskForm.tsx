import React from "react"
import { Formik, Form, Field } from "formik"
import { Button, Container, Typography, Grid, Box } from "@material-ui/core"
import { TextField } from "formik-material-ui"
import { useAppDispatch } from "../../redux/reduxHooks"
import createChildTaskSchema from "./yupSchemas/createChildTaskSchema"
import createChildTaskThunk from "../../redux/projectSlice/thunks/createChildTaskThunk"

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
  const url = typeof window !== "undefined" ? window.location.pathname : ""
  const urlArr = url.split("/")
  const projectId = urlArr[3]

  const dispatch = useAppDispatch()

  return (
    <Container maxWidth="xs">
      <Grid container>
        <Grid item xs={12}>
          <Box pt={1}>
            <Typography variant="h4" align="center">
              Create Sub-Task
            </Typography>
          </Box>
        </Grid>
        <Grid item>
          <Formik
            initialValues={{
              childTaskName: "",
            }}
            validationSchema={createChildTaskSchema}
            onSubmit={async ({ childTaskName }: Values) => {
              try {
                dispatch(
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
                    <Button
                      variant="outlined"
                      disabled={isSubmitting}
                      type="submit"
                    >
                      Create
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

export default CreateTaskForm
