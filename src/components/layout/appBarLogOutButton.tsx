import { Button } from "@material-ui/core"
import React from "react"
import { logOut } from "../../redux/userSlice/userSlice"
import { useAppDispatch } from "../../redux/reduxHooks"

const AppBarLogOutButton: React.FC = () => {
  const dispatch = useAppDispatch()
  const onLogOutClick = () => {
    dispatch(logOut())
  }

  return (
    <>
      <Button onClick={onLogOutClick}>LOG OUT</Button>
    </>
  )
}

export default AppBarLogOutButton
