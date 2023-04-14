import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { userLoggOut, userLoggedIn } from '../features/auth/authSlice'
import useCheckToken from './useCheckToken'

export default function useAuthCheck() {
  const dispatch = useDispatch()
  const [authChecked, setAuthChecked] = useState(false)
  useEffect(() => {
    const localAuth = localStorage?.getItem('auth')
    if (localAuth) {
      const auth = JSON.parse(localAuth)
      if (auth?.accessToken && auth?.user) {
        const isTokenValid = useCheckToken({ token: auth.accessToken })
        if (isTokenValid) {
          dispatch(
            userLoggedIn({
              accessToken: auth.accessToken,
              user: auth.user,
            })
          )
        } else {
          userLoggOut()
        }
      }
    }
    setAuthChecked(true)
  }, [dispatch, setAuthChecked])

  return authChecked
}
