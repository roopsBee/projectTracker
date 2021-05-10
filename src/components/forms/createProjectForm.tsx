import React from "react"
import { Formik, Form, Field } from "formik"
import { Button, Container, Typography, Grid, Box } from "@material-ui/core"
import { TextField } from "formik-material-ui"
import { useAppDispatch } from "../../redux/reduxHooks"
import createProjectSchema from "./yupSchemas/createProjectSchema"
import createProject from "../../redux/projectSlice/thunks/createProjectThunk"

interface Values {
  projectName: string
}

function CreateProjectForm({ closePopover }: { closePopover: () => void }) {
  const dispatch = useAppDispatch()

  return (
    <Container maxWidth="xs">
      <Grid container>
        <Grid item xs={12}>
          <Box pt={1}>
            <Typography variant="h4" align="center">
              Create Project
            </Typography>
          </Box>
        </Grid>
        <Grid item>
          <Formik
            initialValues={{
              projectName: "",
            }}
            validationSchema={createProjectSchema}
            onSubmit={async ({ projectName }: Values) => {
              try {
                await dispatch(createProject(projectName))
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
                      name="projectName"
                      label="Project name"
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

export default CreateProjectForm
