import React, { useEffect, useState } from "react"
import { useField } from "formik"
import { CirclePicker, ColorChangeHandler } from "react-color"
import CenteredPopover, { usePopoverState } from "./centeredPopover"
import BrushIcon from "@material-ui/icons/BrushOutlined"
import IconButton from "./iconButton"

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  name: string
  initialColor?: string
}

const FormikColorPicker: React.FC<Props> = ({
  name,
  initialColor,
  ...props
}) => {
  const [buttonColor, setButtonColor] = useState("")
  const [closePopover, openPopover, pProps] = usePopoverState()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [field, meta, helpers] = useField(name)
  const { setValue } = helpers

  useEffect(() => {
    if (initialColor) {
      setButtonColor(initialColor)
      setValue(initialColor)
    }
  }, [])

  const handleSelectColor: ColorChangeHandler = color => {
    setValue(color.hex)
    setButtonColor(color.hex)
    closePopover()
  }

  return (
    <>
      <IconButton
        icon={<BrushIcon />}
        onClick={openPopover}
        color={buttonColor}
        {...props}
      />
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
          onChangeComplete={handleSelectColor}
        />
      </CenteredPopover>
    </>
  )
}

export default FormikColorPicker
