import React from "react"
import { Formik, Form, Field } from "formik"
import { Container, Grid } from "@material-ui/core"
import { TextField } from "formik-material-ui"
import { useAppDispatch } from "../../redux/reduxHooks"
import { ChildTaskType } from "../../redux/projectSlice/projectSlice"
import childTaskNameChangeSchema from "./yupSchemas/childTaskNameChangeSchema"
import childTaskNameChangeThunk from "../../redux/projectSlice/thunks/childTaskNameChangeThunk"
import FormHeader from "./formHeader"
import getProjectIdFromUrl from "../../utils/getProjectIdFromUrl"
import SubmitButton from "./submitButton"
import CancelButton from "./cancelButton"

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
  const projectId = getProjectIdFromUrl()
  const dispatch = useAppDispatch()
  const { childTaskId, childTaskName } = childTask

  return (
    <Container maxWidth="xs">
      <Grid container>
        <FormHeader title="Change Sub-Task Name" />
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
                    <SubmitButton disabled={isSubmitting} />
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

export default ChildTaskChangeNameForm
