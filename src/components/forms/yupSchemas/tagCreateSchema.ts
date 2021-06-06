import * as Yup from "yup"

const tagCreateSchema = Yup.object().shape({
  name: Yup.string().required("Required").max(30, "Name is too long"),
  color: Yup.string().required("Select a color"),
})

export default tagCreateSchema
