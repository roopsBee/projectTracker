import React, { useState } from "react"
import { useAppDispatch } from "../../redux/reduxHooks"
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
import getProjectIdFromUrl from "../../utils/getProjectIdFromUrl"
import childTaskDeleteThunk from "../../redux/projectSlice/thunks/childTaskDeleteThunk"

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
    await dispatch(childTaskDeleteThunk({ groupId, projectId, childTaskId }))
  }

  return (
    <>
      <MenuItem dense onClick={handleClick}>
        Delete Sub-Task
      </MenuItem>
      <Dialog
        open={isDialogOpen}
        onClose={closeDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete this Sub-Task?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This will delete this Sub-Task. It cannot be undone.
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

export default ChildTaskDeleteMenuItem
