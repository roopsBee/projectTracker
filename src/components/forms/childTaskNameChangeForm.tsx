import React from "react"
import { Formik, Form, Field } from "formik"
import { Button, Container, Typography, Grid, Box } from "@material-ui/core"
import { TextField } from "formik-material-ui"
import { useAppDispatch } from "../../redux/reduxHooks"
import { ChildTaskType } from "../../redux/projectSlice/projectSlice"
import childTaskNameChangeSchema from "./yupSchemas/childTaskNameChangeSchema"
import childTaskNameChangeThunk from "../../redux/projectSlice/thunks/childTaskNameChangeThunk"

interface Values {
  childTaskName: string
}

function ChildTaskChangeNameForm({
  closePopover,
  childTask,
  groupId,
}: {
  closePopover: () => void
  childTask: ChildTaskType
  groupId: string
}) {
  const url = typeof window !== "undefined" ? window.location.pathname : ""
  const urlArr = url.split("/")
  const projectId = urlArr[3]
  const dispatch = useAppDispatch()
  const { childTaskId, childTaskName } = childTask

  return (
    <Container maxWidth="xs">
      <Grid container>
        <Grid item xs={12}>
          <Box pt={1}>
            <Typography variant="h4" align="center">
              Change Sub-Task Name
            </Typography>
          </Box>
        </Grid>
        <Grid item>
          <Formik
            initialValues={{
              childTaskName,
            }}
            validationSchema={childTaskNameChangeSchema}
            onSubmit={async ({ childTaskName: newName }: Values) => {
              try {
                await dispatch(
                  childTaskNameChangeThunk({
                    newName,
                    groupId,
                    childTaskId,
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

export default ChildTaskChangeNameForm
