import {
  Popover,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@material-ui/core"
import React, { useState } from "react"
import useWindowResize from "../../../utils/useWindowResize"
import TagIcon from "@material-ui/icons/LocalOfferOutlined"
import EditTagsPopover from "../../editTagsPopover"

const DrawerTags: React.FC = () => {
  const [isPopoverOpen, setPopoverOpen] = useState(false)
  const [width, height] = useWindowResize()
  const id = isPopoverOpen ? "edit-tags-popover" : undefined

  const closePopover = () => {
    setPopoverOpen(false)
  }

  const handleClick = () => {
    setPopoverOpen(true)
  }

  return (
    <>
      <ListItem dense button onClick={handleClick}>
        <ListItemIcon>
          <TagIcon />
        </ListItemIcon>
        <ListItemText>Edit Tags</ListItemText>
      </ListItem>
      <Popover
        anchorReference="anchorPosition"
        anchorPosition={{
          top: (typeof window !== "undefined" && height && height / 2) || 0,
          left: (typeof window !== "undefined" && width && width / 2) || 0,
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        id={id}
        open={isPopoverOpen}
        onClose={closePopover}
      >
        <EditTagsPopover closePopover={closePopover} />
      </Popover>
    </>
  )
}

export default DrawerTags
