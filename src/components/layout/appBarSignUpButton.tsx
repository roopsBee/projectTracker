import { Button, Popover, Typography } from "@material-ui/core"
import React, { useState } from "react"
import SignUpForm from "../signUpForm"

const AppBarSignUpButton: React.FC = () => {
  const [isPopoverOpen, setPopoverOpen] = useState(false)
  const id = isPopoverOpen ? "sign-up-popover" : undefined

  const onSignUpClick = () => {
    setPopoverOpen(true)
  }

  const onClosePopover = () => {
    setPopoverOpen(false)
  }

  return (
    <>
      <Button onClick={onSignUpClick}>Sign Up</Button>
      <Popover
        anchorReference="anchorPosition"
        anchorPosition={{ top: 100, left: 100 }}
        id={id}
        open={isPopoverOpen}
        onBackdropClick={onClosePopover}
      >
        <SignUpForm />
      </Popover>
    </>
  )
}

export default AppBarSignUpButton
