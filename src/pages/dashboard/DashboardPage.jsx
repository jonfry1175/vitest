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
          <div>
            <div className="text-center display-2 margin: 1rem margin-bottom: 5rem">
            <h1>Dashboard Page</h1>
            </div>
            <br/>
            <br/>
            <br/>
            <div className='text-center'>
            <h1 className='text-primary'>Welcome Admin!</h1>
            <ul className='list-unstyled text-left'>
              <li>Kemudahan pembayaran</li>
              <li>Kemudahan dalam mengelola laporan keuangan</li>
              <li>Kemudahan Marketing</li>
              <li>Kelancaran bertransaksi</li>
              <li>Kemudahan penulisan produk serta data kustomer hanya di 1 perangkat</li>
            </ul>
            </div>
          </div>
        </div>
      </div>


    </div>
  )
}

export default withAuth(DashboardPage)