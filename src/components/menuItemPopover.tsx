import React from "react"
import { MenuItem, Popover } from "@material-ui/core"

import useWindowResize from "../utils/useWindowResize"

interface Props {
  title: string
  popoverId: string
  open: boolean
  onClick: () => void
}

const MenuItemPopover: React.FC<Props> = ({
  title,
  children,
  popoverId,
  open,
  onClick,
}) => {
  const [width, height] = useWindowResize()
  const id = open ? popoverId : undefined

  return (
    <>
      <MenuItem dense onClick={onClick}>
        {title}
      </MenuItem>
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
        open={open}
      >
        {children}
      </Popover>
    </>
  )
}

export default MenuItemPopover
