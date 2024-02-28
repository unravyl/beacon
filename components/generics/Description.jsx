import React from 'react'

function Description({details}) {

    const description = [{title:'Position Title', info: details.title}, {title:'Description', info: details.description},
    {title:'Salary:', info: details.salary},{title:'Top Companies Hiring', info: details.companies.join(', ')},
    {title:'Qualification', info: details.qualifications.join(', ')}]
  return (
    <div className='flex flex-1 flex-col p-3 overflow-y-auto'>
        {description.map((item, index) => (
        <div key={index} className=' flex text-[#0c1323] pt-4 items-center justify-start w-full pb-8 border-b-2 border-[#0c1323]'>
            <h1 className='font-bold  h-full w-[30%]'>{item.title}:</h1>
            <p className='pl-2 text-2px w-[70%]'>{item.info}</p>
        </div>
        ))}
    </div>

  )
}

export default Description
