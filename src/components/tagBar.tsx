import { ListItem, Chip, Menu, Grid } from "@material-ui/core"
import React, { useState } from "react"
import AddIcon from "@material-ui/icons/AddCircleOutlined"
import { ProjectTag, TaskType } from "../redux/projectSlice/projectSlice"
import TagMenuItem from "./menuItems/tagMenuItem"
import TagChip from "./tagChip"

interface Props {
  tags: ProjectTag[]
  task: TaskType
}

const TagBar: React.FC<Props> = ({ tags, task }) => {
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
          {task.tags.map(tag => (
            <Grid item key={tag.tagColor + tag.tagName}>
              <TagChip tag={tag} />
            </Grid>
          ))}
        </Grid>
      </ListItem>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {tags?.map(tag => {
          const tagIndex = task.tags.indexOf(tag)
          return (
            <TagMenuItem
              task={task}
              tagIndex={tagIndex}
              key={Math.random()}
              tag={tag}
              taskId={task.taskId}
              closeMenu={handleClose}
            />
          )
        })}
      </Menu>
    </>
  )
}

export default TagBar
