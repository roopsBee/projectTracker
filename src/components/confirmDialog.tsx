import React from "react"
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core"
import { useAppSelector } from "../redux/reduxHooks"

interface Props {
  open: boolean
  buttonText: string
  title: string
  body: string
  closeDialog: () => void
  handleConfirm: () => void
}

const ConfirmDialog: React.FC<Props> = ({
  open,
  closeDialog,
  title,
  body,
  handleConfirm,
  buttonText,
}) => {
  const isLoading = useAppSelector(state => state.projectState.isLoading)

  return (
    <>
      <Dialog
        open={open}
        onClose={closeDialog}
        aria-labelledby={title}
        aria-describedby={body}
      >
        <DialogTitle id={title}>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id={body}>{body}</DialogContentText>
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
            {buttonText}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ConfirmDialog
