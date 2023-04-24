import {Route, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

const ProtectedRoute = props => {
  const getToken = Cookies.get('jwt_token')
  console.log(getToken)
  if (getToken === undefined) {
    return <Redirect to="/login" />
  }
  return <Route {...props} />
}

export default ProtectedRoute
