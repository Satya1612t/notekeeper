import React, { useState } from 'react'

function Navigation({ setSearchTerm }) {
    const [isOpen, setIsOpen] = useState(false);
    
    const handleNoteSearch = (e) => {
        setSearchTerm(e.target.value);
    }


    return (
        <nav className='py-2'>
            <div className="w-full px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-12">
                    <div className="flex items-center">
                        <div className="flex-shrink-0 lg:hidden">
                            <button className='px-3 py-2 rounded-md  hover:bg-slate-100' onClick={() => setIsOpen(!isOpen)}>
                                <i className='ri-menu-line text-black text-xl'></i>
                                <span className="sr-only">Open main menu</span>
                            </button>
                        </div>
                        <div className="flex-shrink-0 flex items-center">
                            <a href="/" className="flex items-center">
                                <span className="text-2xl font-bold text-gray-900">KeepNote</span>
                            </a>
                        </div>
                    </div>
                    <div className="hidden sm:block flex-grow mx-4">
                        <div className="flex items-center justify-center">
                            <div className="w-full max-w-lg">
                                <form className="relative">
                                    <input
                                        onChange={handleNoteSearch}
                                        type="search"
                                        placeholder="Select tag to search accordingly..."
                                        className="w-full pl-10 pr-4 py-2 focus:outline-none rounded-lg border text-black border-gray-300 "
                                    />
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <i className='ri-search-line text-xl text-gray-400' ></i>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>

            {/* mobile */}
            <div className={`sm:hidden ${isOpen ? "block" : "hidden"}`}>
                <div className="px-2 pt-2 pb-3 space-y-1">
                    <form className="mb-4 relative">
                        <input
                            onChange={handleNoteSearch}
                            type="search"
                            placeholder="Search..."
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <i className='ri-search-line text-xl text-gray-400' ></i>
                        </div>
                    </form>
                </div>
            </div>
        </nav>
    )
}

export default Navigation