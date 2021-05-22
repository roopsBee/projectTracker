/** @jsx jsx */
import { jsx } from "@emotion/react"
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
            variant="contained"
            color="secondary"
            autoFocus
          >
            Cancel
          </Button>
          <Button
            css={{
              backgroundColor: "red",
              color: "white",
              "&:hover": { backgroundColor: "maroon" },
            }}
            color="primary"
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
