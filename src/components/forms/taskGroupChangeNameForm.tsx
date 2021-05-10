import React from "react"
import { Formik, Form, Field } from "formik"
import { Button, Container, Typography, Grid, Box } from "@material-ui/core"
import { TextField } from "formik-material-ui"
import { useAppDispatch } from "../../redux/reduxHooks"
import taskGroupChangeNameSchema from "./yupSchemas/taskGroupChangeNameSchema"
import taskGroupChangeNameThunk from "../../redux/projectSlice/thunks/taskGroupChangeNameThunk"
import { TaskGroupType } from "../../redux/projectSlice/projectSlice"

interface Values {
  taskGroupName: string
}

function TaskGroupChangeNameForm({
  closePopover,
  group,
}: {
  closePopover: () => void
  group: TaskGroupType
}) {
  const dispatch = useAppDispatch()
  const { groupId, taskGroupName } = group

  return (
    <Container maxWidth="xs">
      <Grid container>
        <Grid item xs={12}>
          <Box pt={1}>
            <Typography variant="h4" align="center">
              Change Group Name
            </Typography>
          </Box>
        </Grid>
        <Grid item>
          <Formik
            initialValues={{
              taskGroupName: taskGroupName,
            }}
            validationSchema={taskGroupChangeNameSchema}
            onSubmit={async ({ taskGroupName: newName }: Values) => {
              try {
                await dispatch(taskGroupChangeNameThunk({ newName, groupId }))
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
                      name="taskGroupName"
                      label="Group Name"
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

export default TaskGroupChangeNameForm
