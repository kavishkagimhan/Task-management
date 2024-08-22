import React from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import Content from '../components/dashboard/Content'


const Dashboard = () => {


  return (
    <div className="flex bg-[#f6f5f5] w-screen h-screen">
      <div className="flex-none">
        <Sidebar />
      </div>
      <div className="flex flex-col flex-grow overflow-y-scroll">
        <Navbar />
        <h4 className='font-semibold text-[20px] cursor-pointer p-2'>Dashboard</h4>
        <div className="p-2 w-[100%]">
          <Content />
        </div>
      </div>
    </div>
  )
}

export default Dashboard