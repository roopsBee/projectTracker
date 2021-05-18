import { Button, Popover } from "@material-ui/core"
import React, { useState, useEffect } from "react"
import LogInForm from "../../forms/logInForm"
import useWindowResize from "../../../utils/useWindowResize"
import { useAppDispatch, useAppSelector } from "../../../redux/reduxHooks"
import logOutThunk from "../../../redux/userSlice/logOutThunk"

const AppBarLoginOutButton: React.FC = () => {
  const isLoggedIn = useAppSelector(state => state.user.isLoggedIn)
  const dispatch = useAppDispatch()
  const [isPopoverOpen, setPopoverOpen] = useState(false)
  const [isMounted, setMounted] = useState(false)
  const [width, height] = useWindowResize()
  const id = isPopoverOpen ? "log-in-popover" : undefined

  const onLogInOutClick = () => {
    isLoggedIn ? dispatch(logOutThunk()) : setPopoverOpen(true)
  }

  const handleClosePopover = () => {
    setPopoverOpen(false)
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <>
      {isMounted && (
        <Button onClick={onLogInOutClick}>
          {isLoggedIn ? "LOG OUT" : "LOG IN"}
        </Button>
      )}
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
        onBackdropClick={handleClosePopover}
      >
        <LogInForm handleClosePopover={handleClosePopover} />
      </Popover>
    </>
  )
}

export default AppBarLoginOutButton
