import React from 'react'
import withAuth from '../../hoc/withAuth'
import Sidebar from '../../components/Sidebar'

const DashboardPage = () => {
  return (
    <div>
      <div className="row">
        <div className="col-auto">
          <Sidebar />
        </div>
        <div className="col">
          <div className="text-center">
            <h1>Dashboard Page</h1>
            
            
          </div>
        </div>
      </div>


    </div>
  )
}

export default withAuth(DashboardPage)