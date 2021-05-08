/** @jsx jsx */
import { jsx } from "@emotion/react"
import { ListItemIcon, IconButton, Badge } from "@material-ui/core"
import React from "react"
import ExpandLess from "@material-ui/icons/ExpandLess"
import ExpandMore from "@material-ui/icons/ExpandMore"

interface Props {
  handleClick: () => void
  badgeContent: number
  open: boolean
}

const ExpandIconButton: React.FC<Props> = ({
  badgeContent,
  handleClick,
  open,
}) => {
  return (
    <ListItemIcon>
      <IconButton onClick={handleClick}>
        <Badge badgeContent={badgeContent} color="primary">
          {!open ? <ExpandMore /> : <ExpandLess />}
        </Badge>
      </IconButton>
    </ListItemIcon>
  )
}

export default ExpandIconButton
