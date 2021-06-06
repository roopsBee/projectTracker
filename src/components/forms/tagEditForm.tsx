/** @jsx jsx */
import { jsx } from "@emotion/react"
import React from "react"
import { Formik, Form, Field, FormikHelpers } from "formik"
import { Box, Grid } from "@material-ui/core"
import { TextField } from "formik-material-ui"
import { useAppDispatch, useAppSelector } from "../../redux/reduxHooks"
import getProjectIdFromUrl from "../../utils/getProjectIdFromUrl"
import SubmitButton from "./submitButton"
import tagSchema from "./yupSchemas/tagSchema"
import FormikColorPicker from "../formikColorPicker"
import { ProjectTag } from "../../redux/projectSlice/projectSlice"

interface Values {
  name: string
  color: string
  tagIndex?: number
}

type Props = ProjectTag & {
  tagIndex: number
}

const TagEditForm: React.FC<Props> = ({ tagColor, tagName, tagIndex }) => {
  const projectId = getProjectIdFromUrl()
  const dispatch = useAppDispatch()
  const projectTag = useAppSelector(
    state =>
      state.projectState.projects?.find(
        project => project.projectId === projectId
      )?.projectTags?.[tagIndex]
  )
  console.log({ projectTag, tagName, tagColor })

  return (
    <Formik
      initialValues={{
        name: tagName,
        color: tagColor,
      }}
      validationSchema={tagSchema}
      validateOnBlur={false}
      validateOnChange={false}
      onSubmit={async ({ name, color }: Values) => {
        try {
          //   await dispatch(
          //     tagEditThunk({ tagName: name, tagColor: color, projectId })
          //   )
        } catch (error) {
          console.log(error)
        }
      }}
    >
      {({ isSubmitting, values }) => (
        <Form
          style={{ width: "100%", position: "relative", marginBottom: "15px" }}
        >
          <Grid alignItems="flex-start" container spacing={1} justify="center">
            <Grid item xs={6}>
              <Field
                component={TextField}
                fullWidth
                name="name"
                label="Name"
                placeholder="Name..."
              />
            </Grid>
            <Grid item container justify="center" xs={2}>
              <Box top="11px" clone>
                <FormikColorPicker initialColor={tagColor} name="color" />
              </Box>
            </Grid>
            <Grid item container justify="flex-end" xs={4} sm={3}>
              <SubmitButton
                style={{ top: "11px", height: "39px" }}
                text="Save"
                disabled={
                  isSubmitting ||
                  (projectTag?.tagName === values.name &&
                    projectTag?.tagColor === values.color)
                }
              />
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  )
}

export default TagEditForm
