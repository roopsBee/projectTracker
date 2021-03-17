import { Button, Popover, Typography } from "@material-ui/core"
import React, { useState } from "react"
import LogInForm from "../logInForm"

const AppBarLoginOutButton: React.FC = () => {
  const [isPopoverOpen, setPopoverOpen] = useState(false)
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
        anchorPosition={{ top: 0, left: 0 }}
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
