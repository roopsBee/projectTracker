import { Button } from "@material-ui/core"
import React from "react"
import { useAppDispatch } from "../../redux/reduxHooks"
import logOutThunk from "../../redux/userSlice/logOutThunk"

const AppBarLogOutButton: React.FC = () => {
  const dispatch = useAppDispatch()
  const onLogOutClick = () => {
    dispatch(logOutThunk())
  }

  return (
    <>
      <Button onClick={onLogOutClick}>LOG OUT</Button>
    </>
  )
}

export default AppBarLogOutButton
