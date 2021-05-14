import React, { useState } from "react"
import { useAppDispatch } from "../../redux/reduxHooks"
import { MenuItem } from "@material-ui/core"
import getProjectIdFromUrl from "../../utils/getProjectIdFromUrl"
import childTaskDeleteThunk from "../../redux/projectSlice/thunks/childTaskDeleteThunk"
import ConfirmDialog from "../confirmDialog"

interface Props {
  groupId: string
  childTaskId: string
  handleClose: () => void
}

const ChildTaskDeleteMenuItem: React.FC<Props> = ({
  groupId,
  handleClose,
  childTaskId,
}) => {
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
    await dispatch(childTaskDeleteThunk({ groupId, projectId, childTaskId }))
  }

  return (
    <>
      <MenuItem dense onClick={handleClick}>
        Delete Sub-Task
      </MenuItem>
      <ConfirmDialog
        open={isDialogOpen}
        closeDialog={closeDialog}
        title="Are you sure you want to delete this Sub-Task"
        body="This will permanently delete this Sub-task and it's data. It cannot be undone"
        handleConfirm={handleConfirm}
        buttonText="Delete"
      />
    </>
  )
}

export default ChildTaskDeleteMenuItem
