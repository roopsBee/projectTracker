import { ListItem, Chip, Menu, Grid } from "@material-ui/core"
import React, { useState } from "react"
import AddIcon from "@material-ui/icons/AddCircleOutlined"
import {
  ChildTaskType,
  ProjectTag,
  TaskType,
} from "../redux/projectSlice/projectSlice"
import TagMenuItem from "./menuItems/tagMenuItem"
import TagChip from "./tagChip"
import { AnimatePresence } from "framer-motion"

type Props = task | childTask

type task = {
  type: "task"
  projectTags: ProjectTag[]
  task: TaskType
}

type childTask = {
  type: "childTask"
  projectTags: ProjectTag[]
  task: ChildTaskType
}

const TagBar: React.FC<Props> = props => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <>
      <ListItem disableGutters>
        <Grid container spacing={1}>
          <Grid item>
            <Chip
              icon={<AddIcon />}
              component="button"
              label="Tags"
              size="small"
              color="primary"
              onClick={handleClick}
            />
          </Grid>
          <AnimatePresence>
            {props.task.tags.map(tagId => {
              const tag = props.projectTags.find(tag => tag.tagId === tagId)
              if (tag) {
                return (
                  <Grid key={tag.tagId} item>
                    <TagChip tag={tag} />
                  </Grid>
                )
              }
            })}
          </AnimatePresence>
        </Grid>
      </ListItem>
      <Menu
        getContentAnchorEl={null || undefined}
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        {props.projectTags?.map(tag => {
          return (
            <TagMenuItem
              task={props.task}
              key={tag.tagId}
              tag={tag}
              taskId={
                props.type === "task"
                  ? props.task.taskId
                  : props.task.childTaskId
              }
              closeMenu={handleClose}
            />
          )
        })}
      </Menu>
    </>
  )
}

export default TagBar
