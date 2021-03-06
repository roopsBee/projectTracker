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
import DeleteIcon from "@material-ui/icons/DeleteForever"
import tagDeleteThunk from "../../redux/projectSlice/thunks/tagDeleteThunk"

interface Values {
  name: string
  color: string
  tagIndex?: number
}

type Props = {
  tag: ProjectTag
}

const TagEditForm: React.FC<Props> = ({
  tag: { tagColor, tagId, tagName },
}) => {
  const projectId = getProjectIdFromUrl()
  const dispatch = useAppDispatch()
  const projectTag = useAppSelector(state =>
    state.projectState.projects
      ?.find(project => project.projectId === projectId)
      ?.projectTags?.find(tag => tag.tagId === tagId)
  )
  const isLoading = useAppSelector(state => state.projectState.isLoading)

  const handleDelete = async () => {
    await dispatch(tagDeleteThunk({ tagId, projectId }))
  }

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
          const tag: ProjectTag = {
            tagName: name,
            tagColor: color,
            tagId,
          }
          await dispatch(
            tagEditThunk({
              tag,
              projectId,
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
              <FormikColorPicker initialColor={tagColor} name="color" />
            </Grid>
            <Grid item container justify="flex-start" xs={2}>
              <IconButton
                type="submit"
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
            <Grid item container justify="flex-end" xs={2}>
              <IconButton
                disabled={isLoading}
                onClick={handleDelete}
                color="#f24"
                icon={<DeleteIcon />}
              />
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  )
}

export default TagEditForm
