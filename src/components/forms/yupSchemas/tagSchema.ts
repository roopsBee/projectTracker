import * as Yup from "yup"

const tagSchema = Yup.object().shape({
  name: Yup.string().required("Required").max(20, "Name is too long"),
  color: Yup.string().required("Select a color"),
})

export default tagSchema
