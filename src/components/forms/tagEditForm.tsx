/** @jsx jsx */
import { jsx } from "@emotion/react"
import React from "react"
import { Formik, Form, Field } from "formik"
import { TextField } from "formik-material-ui"
import { useAppDispatch, useAppSelector } from "../../redux/reduxHooks"
import getProjectIdFromUrl from "../../utils/getProjectIdFromUrl"
import tagSchema from "./yupSchemas/tagSchema"
import FormikColorPicker from "../formikColorPicker"
import { ProjectTag } from "../../redux/projectSlice/projectSlice"
import tagEditThunk from "../../redux/projectSlice/thunks/tagEditThunk"
import IconButton from "../iconButton"
import SaveIcon from "@material-ui/icons/SaveOutlined"
import { Grid } from "@material-ui/core"

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
          await dispatch(
            tagEditThunk({
              tagName: name,
              tagColor: color,
              projectId,
              index: tagIndex,
            })
          )
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
                placeholder="Name..."
              />
            </Grid>
            <Grid item container justify="center" xs={2}>
              <FormikColorPicker
                // style={{ top: "11px" }}
                initialColor={tagColor}
                name="color"
              />
            </Grid>
            <Grid item container justify="flex-end" xs={4} sm={3}>
              <IconButton
                color="#2A953D"
                icon={<SaveIcon />}
                disabled={
                  isSubmitting ||
                  values.name === "" ||
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
