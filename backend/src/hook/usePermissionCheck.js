import { useSelector } from 'react-redux'

const usePermissionCheck = () => {
  const auth = useSelector((state) => state.auth)

  if (auth?.user && auth?.accessToken && auth?.user?.role === 'admin') {
    return true
  } else {
    return false
  }
}

export default usePermissionCheck
