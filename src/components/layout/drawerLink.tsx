import React from "react"
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core"
import { Link } from "gatsby"

interface Props {
  to: string
  text: string | undefined
  Icon?: React.FC
}

const DrawerLink: React.FC<Props> = ({ to, text, Icon, ...props }) => {
  return (
    <ListItem {...props} to={to} button dense component={Link}>
      {Icon && (
        <ListItemIcon>
          <Icon />
        </ListItemIcon>
      )}
      <ListItemText>{text}</ListItemText>
    </ListItem>
  )
}

export default DrawerLink
