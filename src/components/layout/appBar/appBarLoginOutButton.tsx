import { Button, Popover } from "@material-ui/core"
import React, { useState } from "react"
import LogInForm from "../../logInForm"
import useWindowResize from "../../../utils/useWindowResize"

const AppBarLoginOutButton: React.FC = () => {
  const [isPopoverOpen, setPopoverOpen] = useState(false)
  const [width, height] = useWindowResize()
  const id = isPopoverOpen ? "log-in-popover" : undefined

  const onLogInOutClick = () => {
    setPopoverOpen(true)
  }

  const onClosePopover = () => {
    setPopoverOpen(false)
  }

  return (
    <>
      <Button onClick={onLogInOutClick}>LOG IN</Button>
      <Popover
        anchorReference="anchorPosition"
        anchorPosition={{
          top: (typeof window !== "undefined" && height! / 2) || 0,
          left: (typeof window !== "undefined" && width! / 2) || 0,
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        id={id}
        open={isPopoverOpen}
        onBackdropClick={onClosePopover}
      >
        <LogInForm />
      </Popover>
    </>
  )
}

export default AppBarLoginOutButton
