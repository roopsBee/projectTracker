/** @jsx jsx */
import { jsx } from "@emotion/react"
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Button,
} from "@material-ui/core"
import React, { useState } from "react"
import DeleteIcon from "@material-ui/icons/Delete"
import { useAppDispatch } from "../../redux/reduxHooks"
import ConfirmDialog from "../confirmDialog"
import projectDeleteThunk from "../../redux/projectSlice/thunks/projectDeleteThunk"

interface Props {
  projectId: string
}

const DeleteProjectListItem: React.FC<Props> = ({ projectId }) => {
  const [isDialogOpen, setDialogOpen] = useState(false)
  const dispatch = useAppDispatch()

  const closeDialog = () => {
    setDialogOpen(false)
  }

  const handleClick = () => {
    setDialogOpen(true)
  }

  const handleConfirm = async () => {
    await dispatch(projectDeleteThunk({ projectId }))
  }

  return (
    <>
      <ListItem ContainerComponent="div" divider>
        <ListItemText css={{ paddingLeft: 20 }}>Delete Project</ListItemText>
        <ListItemSecondaryAction>
          <Button
            onClick={handleClick}
            variant="contained"
            color="secondary"
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
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
