"use client"

import Header from '@/components/custom/Header'
import Sidebar from '@/components/custom/Sidebar'
import { useState } from 'react'
import { videoDataContext } from '../../_context/videoDataContext';
import { VideoData } from '@/types';


const DashboardLayout = ({children}: {children: React.ReactNode}) => {
  const [videoData, setVideoData] = useState<VideoData>({})
  
  return (
    <videoDataContext.Provider value={{videoData, setVideoData}} >
    <div>
      <div className="hidden md:block h-screen fixed  w-64">
        <Sidebar />
      </div>
      <div>
        <Header />
        <div className='md:ml-64'>{children}</div>
      </div>
    </div>
    </videoDataContext.Provider>
  );
}

export default DashboardLayout