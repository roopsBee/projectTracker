import React from "react"
import { ListItem, ListItemText } from "@material-ui/core"
import { Link } from "gatsby"

interface Props {
  to: string
  text: string | undefined
}

const DrawerLink: React.FC<Props> = ({ to, text }) => {
  return (
    <ListItem to={to} button dense component={Link}>
      <ListItemText>{text}</ListItemText>
    </ListItem>
  )
}

export default DrawerLink
