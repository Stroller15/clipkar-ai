import Header from '@/components/custom/Header'
import Sidebar from '@/components/custom/Sidebar'
import React from 'react'

const dashboardLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div>
      <div className="hidden md:block h-screen fixed  w-64">
        <Sidebar />
      </div>
      <div>
        <Header />
        <div className='md:ml-64'>{children}</div>
      </div>
    </div>
  );
}

export default dashboardLayout