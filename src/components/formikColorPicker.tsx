/** @jsx jsx */
import React from "react"
import { useField } from "formik"
import { CirclePicker } from "react-color"
import { Button, ButtonBase } from "@material-ui/core"
import { jsx } from "@emotion/react"

interface Props {
  name: string
}

const FormikColorPicker: React.FC<Props> = ({ name }) => {
  const [field, meta, helpers] = useField(name)
  const { setValue } = helpers

  return (
    <>
      <Button
        style={{
          borderRadius: "50%",
          width: "35px",
          height: "35px",
          minWidth: 0,
        }}
        variant="contained"
      />
      <CirclePicker onChangeComplete={color => setValue(color.hex)} />
    </>
  )
}

export default FormikColorPicker
