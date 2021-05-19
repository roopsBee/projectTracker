/** @jsx jsx */
import { jsx } from "@emotion/react"
import React, { useEffect } from "react"
import { Formik, Form, Field } from "formik"
import { Button, Grid } from "@material-ui/core"
import { TextField } from "formik-material-ui"
import { useAppDispatch, useAppSelector } from "../../redux/reduxHooks"
import getProjectIdFromUrl from "../../utils/getProjectIdFromUrl"
import changeProjectNameSchema from "./yupSchemas/changeProjectNameSchema"

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
        projectName: project ? project.projectName! : "",
      }}
      validationSchema={changeProjectNameSchema}
      validateOnBlur={false}
      validateOnChange={false}
      onSubmit={async ({ projectName }: Values) => {
        try {
          console.log({ projectName })
        } catch (error) {
          console.log(error)
        }
      }}
    >
      {({ isSubmitting, values }) => (
        <Form autoComplete="off" css={{ marginBottom: 16 }}>
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
                variant="outlined"
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
