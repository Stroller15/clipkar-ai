"use client"
import React, { useState } from 'react'
import SelectTopic from './_components/SelectTopic';
import SelectStyle from './_components/SelectStyle';

const CreatePage = () => {
  const [formData, setFormData] = useState({});

  const onHandleInputChange = (fieldName: string, fieldValue: string) => {
    const newFormData = { ...formData, [fieldName]: fieldValue };
    setFormData(newFormData);
  };
  
  return (
    <div className="p-6 md:p-10">
      <h2 className="font-bold text-center text-primary md:text-4xl">
        Create New Short Video{" "}
      </h2>
      <div className='mt-5 shadow-md p-5 md:mt-10 md:shadow-md md:p-10'>
        {/* select topic */}
        <SelectTopic onUserSelect={onHandleInputChange}/>
        
        {/* select style */}
        <SelectStyle />
        {/* duration */}

        {/* create button */}
      </div>
    </div>
  );
}

export default CreatePage