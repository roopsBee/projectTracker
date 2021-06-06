import { Container, Divider, Grid } from "@material-ui/core"
import React from "react"
import { useAppSelector } from "../redux/reduxHooks"
import getProjectIdFromUrl from "../utils/getProjectIdFromUrl"
import FormHeader from "./forms/formHeader"
import TagCreateForm from "./forms/tagCreateForm"
import TagEditForm from "./forms/tagEditForm"

interface Props {
  closePopover: () => void
}

const EditTagsPopover: React.FC<Props> = ({ closePopover }) => {
  const projectId = getProjectIdFromUrl()
  const tags = useAppSelector(state =>
    state.projectState.projects?.find(
      project => project.projectId === projectId
    )
  )?.projectTags

  const dividerStyle = { width: "120%", transform: "translateX(-10%)" }
  return (
    <Container maxWidth="xs">
      <Grid container>
        <Grid container item xs={12}>
          <FormHeader title="Tags" />
        </Grid>
        <Divider style={{ ...dividerStyle, margin: "10px 0px" }} />
        {tags?.map((tag, index) => (
          <Grid key={index} container item xs={12}>
            <TagEditForm
              tagColor={tag.tagColor}
              tagName={tag.tagName}
              tagIndex={index}
            />
          </Grid>
        ))}
        <Divider style={dividerStyle} />
        <Grid container item xs={12}>
          <TagCreateForm />
        </Grid>
        <Divider style={dividerStyle} />
      </Grid>
    </Container>
  )
}

export default EditTagsPopover
