const getProjectIdFromUrl = () => {
  const url = typeof window !== "undefined" ? window.location.pathname : ""
  const urlArr = url.split("/")
  if (urlArr.length > 2) {
    return urlArr[3]
  } else {
    console.log("Project Id is not in url")
    return null
  }
}

export default getProjectIdFromUrl
