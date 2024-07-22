import React from 'react'
import { Navigate } from 'react-router-dom' 
import { useSelector } from 'react-redux'

const withAuth = (WrappedComponent) => {
  const authHOC = (props) => {
    const isAuth = useSelector((state) => state.auth.isAuthenticated)
    console.log(isAuth)

    if (!isAuth) {
      return <Navigate to="/login" />
    }

    return <WrappedComponent {...props} />
  }

  return authHOC
}

export default withAuth
