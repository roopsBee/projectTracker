/** @jsx jsx */
import React from "react"
import { useField } from "formik"
import { CirclePicker } from "react-color"
import { Button } from "@material-ui/core"
import { jsx } from "@emotion/react"
import CenteredPopover, { usePopoverState } from "./centeredPopover"
import BrushIcon from "@material-ui/icons/BrushOutlined"
interface Props {
  name: string
}

const FormikColorPicker: React.FC<Props> = ({ name, ...props }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [closePopover, openPopover, pProps] = usePopoverState()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [field, meta, helpers] = useField(name)
  const { setValue } = helpers

  return (
    <>
      <Button
        style={{
          borderRadius: "5px",
          width: "39px",
          height: "39px",
          minWidth: 0,
          border: "1px solid black",
        }}
        variant="contained"
        onClick={openPopover}
        {...props}
      >
        <BrushIcon />
      </Button>
      <CenteredPopover
        {...pProps}
        id="edit-tags-popover"
        paperProps={{
          style: {
            borderRadius: "5px",
            paddingLeft: "14px",
            paddingTop: "14px",
            border: "1px solid black",
          },
        }}
      >
        <CirclePicker
          styles={{
            default: {
              card: { margin: 0, alignItems: "center", justifyItems: "center" },
            },
          }}
          onChangeComplete={color => setValue(color.hex)}
        />
      </CenteredPopover>
    </>
  )
}

export default FormikColorPicker
