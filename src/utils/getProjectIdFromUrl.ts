const getProjectIdFromUrl = () => {
  const url = typeof window !== "undefined" ? window.location.pathname : ""
  const urlArr = url.split("/")
  if (urlArr.length > 2) {
    return urlArr[3]
  } else {
    return ""
  }
}

export default getProjectIdFromUrl
