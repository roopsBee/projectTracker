import React from "react"
import { Formik, Form, Field } from "formik"
import { Button, Container, Typography, Grid, Box } from "@material-ui/core"
import { TextField } from "formik-material-ui"
import { useAppDispatch } from "../../redux/reduxHooks"
import createGroupSchema from "./yupSchemas/createGroupSchema"
import createGroupThunk from "../../redux/projectSlice/createGroupThunk"

interface Values {
  taskGroupName: string
}

function CreateGroupForm({ closePopover }: { closePopover: () => void }) {
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
              Create Group
            </Typography>
          </Box>
        </Grid>
        <Grid item>
          <Formik
            initialValues={{
              taskGroupName: "",
            }}
            validationSchema={createGroupSchema}
            onSubmit={async ({ taskGroupName }: Values) => {
              try {
                console.log("createGroup")
                await dispatch(createGroupThunk({ taskGroupName, projectId }))
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

export default CreateGroupForm
