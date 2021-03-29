import { useEffect, useState } from "react"

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<[number, number]>([0, 0])

  useEffect(() => {
    function handleResize() {
      setWindowSize([window.innerWidth, window.innerHeight])
    }
    window.addEventListener("resize", handleResize)
    handleResize()
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return windowSize
}
export default useWindowSize
