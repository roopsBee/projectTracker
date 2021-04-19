import { Button, Popover } from "@material-ui/core"
import React, { useState } from "react"
import SignUpForm from "../../forms/signUpForm"
import useWindowResize from "../../../utils/useWindowResize"

const AppBarSignUpButton: React.FC = () => {
  const [isPopoverOpen, setPopoverOpen] = useState(false)
  const [width, height] = useWindowResize()
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
        onBackdropClick={onClosePopover}
      >
        <SignUpForm />
      </Popover>
    </>
  )
}

export default AppBarSignUpButton
