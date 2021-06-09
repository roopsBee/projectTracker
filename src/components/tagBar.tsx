import { ListItem, Chip, Menu } from "@material-ui/core"
import React, { useState } from "react"
import AddIcon from "@material-ui/icons/AddCircleOutlined"
import { ProjectTag, TaskType } from "../redux/projectSlice/projectSlice"
import TagMenuItem from "./menuItems/tagMenuItem"

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
      <ListItem>
        <Chip
          icon={<AddIcon />}
          component="button"
          label="Tags"
          size="small"
          color="primary"
          onClick={handleClick}
        />
        {task.tags.map(tag => (
          <Chip size="small" key={Math.random()} label={tag.tagName} />
        ))}
      </ListItem>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {tags?.map(tag => (
          <TagMenuItem
            task={task}
            key={Math.random()}
            tag={tag}
            taskId={task.taskId}
            closeMenu={handleClose}
          />
        ))}
      </Menu>
    </>
  )
}

export default TagBar
