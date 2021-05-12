import React, { useState } from "react"
import { TaskType } from "../../redux/projectSlice/projectSlice"
import MenuItemPopover from "./menuItemPopover"
import { useAppDispatch } from "../../redux/reduxHooks"
import groupDeleteThunk from "../../redux/projectSlice/thunks/groupDeleteThunk"
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
} from "@material-ui/core"
import { useAppSelector } from "../../redux/reduxHooks"

interface Props {
  groupId: string
  handleClose: () => void
}

const GroupDeleteMenuItem: React.FC<Props> = ({ groupId, handleClose }) => {
  const url = typeof window !== "undefined" ? window.location.pathname : ""
  const urlArr = url.split("/")
  const projectId = urlArr[3]
  const isLoading = useAppSelector(state => state.projectState.isLoading)

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
      <Dialog
        open={isDialogOpen}
        onClose={closeDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete this group?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This will delete this group and all associated tasks. It cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            disabled={isLoading}
            onClick={closeDialog}
            variant="outlined"
            autoFocus
          >
            Cancel
          </Button>
          <Button
            disabled={isLoading}
            onClick={handleConfirm}
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default GroupDeleteMenuItem
