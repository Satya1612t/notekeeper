import { collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react'
import { db } from '../firebase';

function Note({ notes, onClick }) {
    if (!notes) {
        return <h1>Error: Note is missing</h1>
    }
    const dropDownRef = useRef(null);
    const data = notes?.note;
    const note = data.split(' ');
    const [colors, setColors] = useState('');
    const [icon, setIcon] = useState('');
    const [activeDropdown, setActiveDropdown] = useState(null)

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropDownRef.current && !dropDownRef.current.contains(e.target))
                setActiveDropdown(null);
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.addEventListener('mousedown', handleClickOutside);
        };

    }, [])

    const randomColorAndIcon = function () {
        const colors = ['bg-sky-200', 'bg-orange-200', 'bg-purple-400', 'bg-yellow-200', 'bg-slate-300', 'bg-[#D1FF85]'];
        const iconClass = ['ri-command-fill', 'ri-bubble-chart-fill', 'ri-stack-fill', 'ri-double-quotes-r', 'ri-bnb-fill', 'ri-claude-line'];
        let randomIndex = Math.floor(Math.random() * colors.length);
        setColors(colors[randomIndex]);
        setIcon(iconClass[randomIndex]);
    };

    const handleDropdownToggle = (id) => {
        setActiveDropdown((prev) => (prev === id ? null : id));
    }

    const handlePinnedNote = async (id, currentPinnedState) => {
        try {
            const noteRef = await doc(db, 'notes', id);
            await updateDoc(noteRef, { pinned: !currentPinnedState });
        } catch (error) {
            console.log(error);
        };
    };

    useEffect(() => {
        randomColorAndIcon()
    }, []);

    return (
        <div className='group relative '>
            <div onClick={onClick} className={`relative ${colors} border-black rounded-2xl border-2 pl-2 pr-4 py-3 overflow-x-auto text-black h-56  w-40 `}>
                <h1 className='text-xl text-wrap font-etruscoM leading-tight'>{notes?.title || 'title undefined'}</h1>
                <h4 className='text-sm font-semibold text-gray-800 mt-2 tracking-tighter'>{'#'+notes?.tagLine}</h4>
                <h6 className='text-xs text-gray-600 mt-1'>{notes?.createdAt ? notes.createdAt.toDate().toDateString() : "..."}</h6>
                <p className=' text-gray-600 text-xs mt-5 font-etruscoL'>{note.slice(0, 17).join(' ') + '.'}</p>
                <i className={`absolute  text-xl bottom-2 ${icon}`}></i>
            </div>
            <i onClick={() => handlePinnedNote(notes.id, notes.pinned)} className='ri-pushpin-fill absolute top-2 right-2 sm:hidden group-hover:flex group-hover:text-lg'></i>
            <div className='group relative'>
                <i onClick={() => handleDropdownToggle(notes.id)} className='ri-more-2-fill absolute bottom-2 right-2 sm:hidden group-hover:flex group-hover:text-lg'></i>
                {activeDropdown === notes.id && <div ref={dropDownRef}><DropDown notes={notes} /> </div>}
            </div>
        </div>
    )
}

function DropDown({ notes }) {
    const handleDeleteNote = async (id) => {
        console.log(id);
        
        try {
            const noteRef = doc(db, 'notes', id);
            await deleteDoc(noteRef);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <ul className='bg-black cursor-pointer text-xs opacity-90 z-50 text-white p-3 rounded-md space-y-3 -top-2 right-2 absolute whitespace-nowrap'>
                <li ><button onClick={() => handleDeleteNote(notes?.id)}>Delete</button> <hr className='mt-1' /></li>
                <li>Add Label <hr className='mt-1' /></li>
            </ul>
        </>
    )
}

export default Note