import jwt_decode from 'jwt-decode'

const useCheckToken = ({ token }) => {
  try {
    const decoded = jwt_decode(token)
    const currentTime = Date.now() / 1000 // Convert to seconds
    return decoded.exp > currentTime // Check if token is not expired
  } catch (error) {
    console.log('token_check_error', error)
    return false
  }
}

export default useCheckToken
