import React from "react"
import { Formik, Form, Field } from "formik"
import { Container, Grid } from "@material-ui/core"
import { TextField } from "formik-material-ui"
import { useAppDispatch } from "../../redux/reduxHooks"
import createProjectSchema from "./yupSchemas/createProjectSchema"
import createProject from "../../redux/projectSlice/thunks/createProjectThunk"
import FormHeader from "./formHeader"
import CancelButton from "./cancelButton"
import SubmitButton from "./submitButton"

interface Values {
  projectName: string
}

function CreateProjectForm({ closePopover }: { closePopover: () => void }) {
  const dispatch = useAppDispatch()

  return (
    <Container maxWidth="xs">
      <Grid container>
        <FormHeader title="Create Project" />
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

export default CreateProjectForm
