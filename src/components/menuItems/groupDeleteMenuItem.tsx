import React, { useState } from "react"
import { useAppDispatch } from "../../redux/reduxHooks"
import groupDeleteThunk from "../../redux/projectSlice/thunks/groupDeleteThunk"
import { MenuItem } from "@material-ui/core"
import getProjectIdFromUrl from "../../utils/getProjectIdFromUrl"
import ConfirmDialog from "../confirmDialog"

interface Props {
  groupId: string
  handleClose: () => void
}

const GroupDeleteMenuItem: React.FC<Props> = ({ groupId, handleClose }) => {
  const projectId = getProjectIdFromUrl()

  const [isDialogOpen, setDialogOpen] = useState(false)
  const dispatch = useAppDispatch()

  const closeDialog = () => {
    setDialogOpen(false)
  }

  const handleClick = () => {
    setDialogOpen(true)
    handleClose()
  }

  const handleConfirm = async () => {
    await dispatch(groupDeleteThunk({ groupId, projectId }))
  }

  return (
    <>
      <MenuItem dense onClick={handleClick}>
        Delete Group
      </MenuItem>
      <ConfirmDialog
        open={isDialogOpen}
        closeDialog={closeDialog}
        title="Are you sure you want to delete this group?"
        body="This will permanently delete this group and all associated tasks. It cannot be
        undone."
        handleConfirm={handleConfirm}
        buttonText="Delete"
      />
    </>
  )
}

export default GroupDeleteMenuItem
