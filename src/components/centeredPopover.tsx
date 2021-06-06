import { Popover } from "@material-ui/core"
import useWindowResize from "../utils/useWindowResize"

import React, { useState } from "react"

export const usePopoverState = () => {
  const [isPopoverOpen, setPopoverOpen] = useState(false)
  const closePopover = () => setPopoverOpen(false)
  const openPopover = () => setPopoverOpen(true)
  const props = { isPopoverOpen, closePopover }
  return [closePopover, openPopover, props] as const
}

interface Props {
  id: string
  isPopoverOpen: boolean
  closePopover: () => void
}

const CenteredPopover: React.FC<Props> = ({
  children,
  id,
  isPopoverOpen,
  closePopover,
}) => {
  const [width, height] = useWindowResize()

  return (
    <Popover
      anchorReference="anchorPosition"
      anchorPosition={{
        top: (typeof window !== "undefined" && height && height / 2) || 0,
        left: (typeof window !== "undefined" && width && width / 2) || 0,
      }}
      transformOrigin={{
        vertical: "center",
        horizontal: "center",
      }}
      id={isPopoverOpen ? id : undefined}
      open={isPopoverOpen}
      onClose={closePopover}
    >
      {children}
    </Popover>
  )
}

export default CenteredPopover
