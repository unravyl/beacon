import React from 'react'

function Description() {
    const description = [{title:'Position Title', info: 'Job Position Title'}, {title:'Description', info: 'sdfsadfsadfsdafsadf dsf dsf sdf sdf sdf sdfsd fds fds fds fds fds fadskfawek nadsnk aslfnasdl;knf lasd'},
    {title:'Salary:', info: '1-2'},{title:'Top Companies Hiring', info: 'Hqzen Scalema'},
    {title:'Qualification', info: 'Loewr kadsngk;adngkl ajdklfha sdklf kladshfklad sflk; sdf dsf sdf dsf dsfd sf sdf dsf sdf dsf dsf ds dsahfk ljads '}]
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