import React from 'react'

function DesignLogo() {
    return (
        <>
        <div className='flex absolute top-1/3 left-1/3 -translate-x-1/3 -translate-y-1/3 md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 opacity-60'>
            <div className='group relative '>
                <div className={`relative  -rotate-12 bg-pink-300 border-black rounded-2xl border-2 pl-2 pr-4 py-3 overflow-x-auto text-black h-40 scrollbar-none w-32 `}>
                    <h1 className='text-md text-wrap font-etruscoM leading-tight'>this is a mockup note</h1>
                    <h6 className='text-xs text-wrap text-gray-600 mt-1'>27th July 2024</h6>
                    <p className=' text-gray-600 text-wrap text-xs mt-5 font-etruscoL'>Lorem ipsum dolor sit amet </p>
                    <i className={`absolute  text-sm bottom-2 ri-bubble-chart-fill `}></i>
                    <i className='ri-pushpin-fill text-xs absolute top-2 right-2'></i>
                </div>
            </div>
            <div className='group relative  '>
                <div className={`absolute  -left-10 rotate-12 bg-[#D1FF85] border-black rounded-2xl border-2 pl-2 pr-4 py-3 overflow-x-auto text-black h-40 scrollbar-none w-32 `}>
                    <h1 className='text-md text-wrap font-etruscoM leading-tight'>Save the imp thing TODO!</h1>
                    <h6 className='text-xs text-wrap text-gray-600 mt-1'>27th July 2024</h6>
                    <p className=' text-gray-600 text-wrap text-xs mt-5 font-etruscoL'>Lorem ipsum dolor sit amet</p>
                    <i className={`absolute  text-sm bottom-2 ri-bubble-chart-fill `}></i>
                    <i className='ri-pushpin-fill text-xs absolute top-2 right-2'></i>
                    <i className='ri-more-2-fill text-xs absolute bottom-2 right-2'></i>
                </div>
            </div>
        </div>
        <h1 className='mt-5  top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 absolute text-slate-500 whitespace-nowrap md:left-[53%] md:-translate-x-1/2 md:top-2/3 text-2xl font-normal' >create your first note! <i className='ri-more-2-fill text-xs absolute bottom-2 right-2'></i> </h1>
        </>
    )
}

export default DesignLogo