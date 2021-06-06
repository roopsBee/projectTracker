import { ListItem, ListItemText, ListItemIcon } from "@material-ui/core"
import React from "react"
import TagIcon from "@material-ui/icons/LocalOfferOutlined"
import EditTagsPopover from "../../editTagsPopover"
import CenteredPopover, { usePopoverState } from "../../centeredPopover"

const DrawerTags: React.FC = () => {
  const [closePopover, openPopover, props] = usePopoverState()

  const handleClick = () => {
    openPopover()
  }

  return (
    <>
      <ListItem dense button onClick={handleClick}>
        <ListItemIcon>
          <TagIcon />
        </ListItemIcon>
        <ListItemText>Edit Tags</ListItemText>
      </ListItem>
      <CenteredPopover {...props} id="edit-tags-popover">
        <EditTagsPopover closePopover={closePopover} />
      </CenteredPopover>
    </>
  )
}

export default DrawerTags
