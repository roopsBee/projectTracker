/** @jsx jsx */
import { jsx } from "@emotion/react"
import React from "react"
import { Formik, Form, Field } from "formik"
import { Button, Grid } from "@material-ui/core"
import { TextField } from "formik-material-ui"
import { useAppDispatch, useAppSelector } from "../../redux/reduxHooks"
import getProjectIdFromUrl from "../../utils/getProjectIdFromUrl"
import changeProjectNameSchema from "./yupSchemas/changeProjectNameSchema"
import projectChangeNameThunk from "../../redux/projectSlice/thunks/projectChangeNameThunk"
import SaveIcon from "@material-ui/icons/Save"

interface Values {
  projectName: string
}

function ChildTaskChangeNameForm() {
  const projectId = getProjectIdFromUrl()
  const dispatch = useAppDispatch()
  const project = useAppSelector(state =>
    state.projectState.projects?.find(
      project => project.projectId === projectId
    )
  )

  return (
    <Formik
      initialValues={{
        projectName: project?.projectName ? project.projectName : "",
      }}
      validationSchema={changeProjectNameSchema}
      validateOnBlur={false}
      validateOnChange={false}
      onSubmit={async ({ projectName }: Values) => {
        try {
          await dispatch(
            projectChangeNameThunk({ newProjectName: projectName, projectId })
          )
        } catch (error) {
          console.log(error)
        }
      }}
    >
      {({ isSubmitting, values }) => (
        <Form autoComplete="off" css={{ marginBottom: 8 }}>
          <Grid container item xs={12}>
            <Grid item xs={8}>
              <Field
                component={TextField}
                fullWidth
                name="projectName"
                label="Change Project Name"
                placeholder="Name..."
              />
            </Grid>
            <Grid
              container
              item
              xs={4}
              alignContent="flex-end"
              justify="flex-end"
            >
              <Button
                css={{ width: 114, position: "absolute", top: 28 }}
                startIcon={<SaveIcon />}
                variant="contained"
                color="primary"
                disabled={
                  isSubmitting || project?.projectName === values.projectName
                }
                type="submit"
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  )
}

export default ChildTaskChangeNameForm
