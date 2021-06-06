import { Container, Divider, Grid } from "@material-ui/core"
import React from "react"
import FormHeader from "./forms/formHeader"
import TagCreateForm from "./forms/tagCreateForm"

const EditTagsPopover = ({ closePopover }: { closePopover: () => void }) => {
  const dividerStyle = { width: "120%", transform: "translateX(-10%)" }
  return (
    <Container maxWidth="xs">
      <Grid container>
        <Grid container item xs={12}>
          <FormHeader title="Tags" />
        </Grid>
        <Divider style={dividerStyle} />
        <Grid container item xs={12}>
          <TagCreateForm closePopover={closePopover} />
        </Grid>
        <Divider style={dividerStyle} />
      </Grid>
    </Container>
  )
}

export default EditTagsPopover
