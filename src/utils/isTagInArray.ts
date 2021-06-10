import { ProjectTag } from "../redux/projectSlice/projectSlice"

export default (tag: ProjectTag, array: ProjectTag[]): boolean => {
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
