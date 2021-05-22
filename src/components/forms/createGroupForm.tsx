import React from "react"
import { Formik, Form, Field } from "formik"
import { Container, Grid } from "@material-ui/core"
import { TextField } from "formik-material-ui"
import { useAppDispatch } from "../../redux/reduxHooks"
import createGroupSchema from "./yupSchemas/createGroupSchema"
import createGroupThunk from "../../redux/projectSlice/thunks/createGroupThunk"
import FormHeader from "./formHeader"
import getProjectIdFromUrl from "../../utils/getProjectIdFromUrl"
import SubmitButton from "./submitButton"
import CancelButton from "./cancelButton"

interface Values {
  taskGroupName: string
}

function CreateGroupForm({ closePopover }: { closePopover: () => void }) {
  const projectId = getProjectIdFromUrl()

  const dispatch = useAppDispatch()

  return (
    <Container maxWidth="xs">
      <Grid container>
        <FormHeader title="Create Group" />
        <Grid item>
          <Formik
            initialValues={{
              taskGroupName: "",
            }}
            validationSchema={createGroupSchema}
            onSubmit={async ({ taskGroupName }: Values) => {
              try {
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

export default CreateGroupForm
