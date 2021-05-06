import { ListItemIcon, IconButton, Menu } from "@material-ui/core"
import MenuIcon from "@material-ui/icons/Menu"
import React, { useState, ReactElement } from "react"

interface Props {
  children(handleClose: () => void): ReactElement
}

const MenuItemButton: React.FC<Props> = ({ children }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <ListItemIcon>
        <IconButton onClick={handleClick}>
          <MenuIcon />
        </IconButton>
      </ListItemIcon>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {children && children(handleClose)}
      </Menu>
    </>
  )
}

export default MenuItemButton
