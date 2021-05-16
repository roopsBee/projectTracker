/** @jsx jsx */
import { jsx } from "@emotion/react"
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@material-ui/core"
import React, { useState } from "react"
import DeleteIcon from "@material-ui/icons/Delete"
import { useAppDispatch } from "../../redux/reduxHooks"
import ConfirmDialog from "../confirmDialog"

const DeleteProjectListItem: React.FC = () => {
  const [isDialogOpen, setDialogOpen] = useState(false)
  const dispatch = useAppDispatch()

  const closeDialog = () => {
    setDialogOpen(false)
  }

  const handleClick = () => {
    setDialogOpen(true)
  }

  const handleConfirm = async () => {
    console.log("confirm")
  }

  return (
    <>
      <ListItem divider>
        <ListItemText css={{ paddingLeft: 20 }}>Delete Project</ListItemText>
        <ListItemSecondaryAction>
          <IconButton onClick={handleClick}>
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <ConfirmDialog
        title="Are you sure you want to delete this project?"
        body="Deleting this project will delete all associated data. This cannot be undone. Are you sure you want to do this?"
        buttonText="Delete"
        closeDialog={closeDialog}
        open={isDialogOpen}
        handleConfirm={handleConfirm}
      />
    </>
  )
}

export default DeleteProjectListItem
