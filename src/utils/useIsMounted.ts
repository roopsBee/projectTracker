import { useEffect, useState } from "react"

const useHasMounted = () => {
  const [isMounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  return isMounted
}
export default useHasMounted
