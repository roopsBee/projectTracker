import { ProjectTag } from "../redux/projectSlice/projectSlice"

type Args = {
  tag: ProjectTag
  array: ProjectTag[]
}

export default ({ tag, array }: Args) => {
  const foundTag = array.find(arrayTag => {
    if (
      tag.tagName === arrayTag.tagName &&
      tag.tagColor === arrayTag.tagColor
    ) {
      return true
    }
  })
  if (foundTag) {
    return true
  } else {
    return false
  }
}
