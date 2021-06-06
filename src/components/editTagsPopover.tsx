import { Container } from "@material-ui/core"
import React from "react"
import TagCreateForm from "./forms/tagCreateForm"

const EditTagsPopover = ({ closePopover }: { closePopover: () => void }) => {
  return (
    <Container maxWidth="xs">
      <TagCreateForm closePopover={closePopover} />
    </Container>
  )
}

export default EditTagsPopover
