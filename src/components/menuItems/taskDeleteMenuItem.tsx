import React, { useState } from "react"
import { useAppDispatch } from "../../redux/reduxHooks"
import { MenuItem } from "@material-ui/core"
import getProjectIdFromUrl from "../../utils/getProjectIdFromUrl"
import ConfirmDialog from "../confirmDialog"
import taskDeleteThunk from "../../redux/projectSlice/thunks/taskdeleteThunk"

interface Props {
  taskId: string
  handleClose: () => void
}

const TaskDeleteMenuItem: React.FC<Props> = ({ taskId, handleClose }) => {
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
    await dispatch(taskDeleteThunk({ projectId, taskId }))
  }

  return (
    <>
      <MenuItem dense onClick={handleClick}>
        Delete Task
      </MenuItem>
      <ConfirmDialog
        open={isDialogOpen}
        closeDialog={closeDialog}
        title="Are you sure you want to delete this task"
        body="This will permanently delete this task and it's data. It cannot be undone"
        handleConfirm={handleConfirm}
        buttonText="Delete"
      />
    </>
  )
}

export default TaskDeleteMenuItem
