import React, { useEffect, useState, useRef } from 'react'
import Note from './Note'
import { usePopup } from '../contexts/PopupProvider'
import Popup from './Popup';
import Noteform from './Noteform';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase'
import DesignLogo from './DesignLogo';
import { motion } from 'framer-motion'
import toast from 'react-hot-toast';
import Message from './Message';

function Body({ searchTerm }) {
    const { openPopup } = usePopup();
    const [notes, setNotes] = useState([]);
    const [activeTag, setActiveTag] = useState('all');
    const [pinnedPage, setPinnedPage] = useState(1);
    const [unPinnedPage, setUnpinnedPage] = useState(1);
    const itemPerPage = 6;

    useEffect(() => {
        const collectionRef = collection(db, 'notes');
        const detach = onSnapshot(collectionRef, (snapshot) => {
            const data = snapshot.docs.map((doc) => {
                const noteData = doc.data();
                const createdAt = noteData?.createdAt?.toDate();
                return {
                    id: doc.id,
                    pinned: noteData.pinned,
                    tagLine: noteData.tagLine,
                    createdAt,
                    ...noteData
                };
            });
            setNotes(data);
        });

        return () => detach();
    }, [])

    const filteredNotes = notes.filter(note => {
        const matchesSearch = searchTerm ? note.title.toLowerCase().includes(searchTerm.toLowerCase()) || note.tagLine?.toLowerCase().includes(searchTerm.toLowerCase()) || note.note?.toLowerCase().includes(searchTerm.toLowerCase()) : true;
        const matchesTag = activeTag !== "all" ? note.tagLine?.toLowerCase() === activeTag.toLowerCase() : true;
        return matchesSearch && matchesTag;
    });

    const pinnedNotes = notes.filter(note => note.pinned);
    const unPinnedNotes = notes.filter(note => !note.pinned);

    const paginatedPinned = pinnedNotes.slice(
        (pinnedPage - 1) * itemPerPage,
        pinnedPage * itemPerPage
    );

    const unpaginatedPinned = unPinnedNotes.slice(
        (unPinnedPage - 1) * itemPerPage,
        unPinnedPage * itemPerPage
    )

    const handleNotify = () => {
        toast.success('in working...')
    }

    return (
        <>
        <div>
        <img src="1.jpg" alt="" />
        <img src="2.jpg" alt="" />
        <img src="3.jpg" alt="" />
        <img src="2.1.jpg" alt="" />
        <img src="3.1.jpg" alt="" />
        <img src="3.2.jpg" alt="" />
        <img src="3.3.jpg" alt="" />
        <img src="4.1.jpg" alt="" />
        <img src="4.1.2.jpg" alt="" />
      </div>
            <main style={{ height: 'calc(100vh - 100px)' }} className='w-full relative h-screen'>
                {pinnedNotes < 1 && unPinnedNotes < 1 && <DesignLogo />}
                <aside className='border-t sm:flex justify-center items-start w-[20%] lg:w-[15%] hidden lg:flex float-left '>
                    <ul className='text-base font-semibold space-y-2 mt-5 w-[95%] tracking-tight cursor-pointer flex items-center flex-col'>
                        <li className='p-1 border-b hover:bg-slate-50 shadow-sm w-full text-center rounded-md'>
                            <button onClick={() => openPopup("Add Note", <Noteform noteProps={{ setNoteData: setNotes, isNewNote: true }} />)} >CreateNote<i className='ri-sticky-note-add-fill ml-2'></i></button>
                        </li>
                        <li className='p-1 border-b hover:bg-slate-50 shadow-sm w-full text-center rounded-md'><button onClick={() => openPopup('add Lable', <Message />)}>AddLabel <i className='ri-price-tag-3-fill ml-2'></i></button></li>
                        <li className='p-1 border-b hover:bg-slate-50 shadow-sm w-full text-center rounded-md'><button onClick={handleNotify}>Trash <i className='ri-delete-bin-7-fill ml-2'></i></button></li>
                    </ul>
                </aside>
                <div className='text-black border-l h-full px-2  w-full sm:w-[80%] lg:w-[85%] float-left '>
                    <div className='border px-5 py-2 flex md:justify-center justify-between items-center gap-5 mb-5'>
                        <h1 className='tracking-tighter font-light mb-1 text-5xl text-black'>Your Notes </h1>
                        <button onClick={() => openPopup("add Note", <Noteform noteProps={{ setNoteData: setNotes, isNewNote: true }} />)} className='text-2xl border-2 md:mr-36 border-black rounded-md px-3 py-2 text-center'>+</button>
                    </div>
              

                    <TagFilter setActiveTag={setActiveTag} activeTag={activeTag} notes={notes} />


                    {/* filterNotes */}

                    {searchTerm || activeTag !== "all" ?
                        (<>
                            {filteredNotes.length > 0 && <h1 className='font-etruscoL text-sm font-semibold'>Filtered <i className='ri-sticky-note-fill'></i></h1>}
                            <div className='flex gap-2 py-2 flex-wrap '>
                                {filteredNotes.length > 0 &&
                                    filteredNotes.map(note => (
                                        <Note key={note.id} notes={note} onClick={() => openPopup(note ? 'edit note' : 'add note', <Noteform noteProps={{ setNoteData: setNotes, noteData: note || null, isNewNote: false, }} />)} />
                                    ))}
                            </div>
                        </>)
                        :
                        (<>
                            {paginatedPinned.length > 0 ? <h1 className='font-etruscoL text-sm font-semibold'>Pinned <i className='ri-pushpin-2-fill'></i></h1> : ''}
                            <div className='relative'>
                                <div className={`flex gap-2 py-2 flex-wrap `} >
                                    {paginatedPinned.length > 0 &&
                                        paginatedPinned.map(note => (
                                            <Note key={note.id} notes={note} onClick={() => openPopup(note ? 'edit note' : 'add note', <Noteform noteProps={{ setNoteData: setNotes, noteData: note || null, isNewNote: false, }} />)} />
                                        ))}

                                </div>
                                {pinnedPage > 1 && <button onClick={() => setPinnedPage((prev) => Math.max(prev - 1, 1))} disabled={pinnedPage === 1} className={` absolute border px-1 bg-slate-100 font-light top-1/2 left-2 -translate-y-1/2 rounded-full hover:bg-blue-700 hover:text-white`}><i className='ri-arrow-left-fill text-2xl'></i></button>}
                                {pinnedPage * itemPerPage < pinnedNotes.length && <button onClick={() => setPinnedPage((prev) => prev + 1)} disabled={pinnedPage * itemPerPage >= pinnedNotes.length} className='absolute border  rounded-full hover:bg-blue-700 hover:text-white px-1  bg-slate-100 font-light top-1/2 right-2 -translate-y-1/2'><i className='ri-arrow-right-fill text-2xl'></i></button>}
                                {pinnedNotes > 0 && <hr className='my-2' />}
                            </div>

                            {/* //other */}
                            {unpaginatedPinned.length > 0 && <h1 className='font-etruscoL text-sm font-semibold'>Other <i className='ri-sticky-note-fill'></i></h1>}
                            <div className='relative'>
                                <div className={`flex gap-2 py-2 flex-wrap`}>
                                    {unpaginatedPinned.length > 0 &&
                                        unpaginatedPinned.map(note => (
                                            <Note key={note.id} notes={note} onClick={() => openPopup(note ? 'edit note' : 'add note', <Noteform noteProps={{ setNoteData: setNotes, noteData: note || null, isNewNote: false, }} />)} />
                                        ))}
                                </div>
                                {unPinnedPage > 1 && <button onClick={() => setUnpinnedPage((prev) => Math.max(prev - 1, 1))} disabled={unPinnedPage === 1} className={` absolute border px-1 bg-slate-100 font-light top-1/2 left-2 -translate-y-1/2 rounded-full hover:bg-blue-700 hover:text-white`}><i className='ri-arrow-left-fill text-2xl'></i></button>}
                                {unPinnedPage * itemPerPage < unPinnedNotes.length && <button onClick={() => setUnpinnedPage((prev) => prev + 1)} disabled={unPinnedPage * itemPerPage >= unPinnedNotes.length} className='absolute border  rounded-full hover:bg-blue-700 hover:text-white px-1  bg-slate-100 font-light top-1/2 right-2 -translate-y-1/2'><i className='ri-arrow-right-fill text-2xl'></i></button>}
                            </div>
                        </>)}
                </div>
                <Popup />
            </main>
        </>
    )
}

function TagFilter({ activeTag, setActiveTag, notes }) {
    const [highlightStyle, setHighlightStyle] = useState({ width: 0, left: 0 })
    const containerRef = useRef(null)   

    const uniqueTags = ["all", ...new Set(notes.map((note) => note.tagLine || ""))];

    useEffect(() => {
        if (!activeTag || !uniqueTags.includes(activeTag)) {
            setActiveTag("all");
        }
    }, [activeTag, uniqueTags]);

    useEffect(() => {
        const activeButton = containerRef.current?.querySelector(`[data-tag="${activeTag}"]`)
        if (activeButton) {
            const containerRect = containerRef.current.getBoundingClientRect()
            const buttonRect = activeButton.getBoundingClientRect()
            setHighlightStyle({
                width: buttonRect.width,
                left: buttonRect.left - containerRect.left,
            })
        }
    }, [activeTag])

    return (
        <div className="w-full max-w-full p-4">
            <div className="flex flex-wrap gap-2 relative " ref={containerRef}>
                {uniqueTags.map((tag) => (
                    <motion.button
                        key={tag}
                        layout
                        data-tag={tag}
                        onClick={() => setActiveTag(tag)}
                        className={`px-4 py-[6px] rounded-full border text-sm font-medium transition-colors relative z-10 ${activeTag === tag ? 'text-gray-900' : 'bg-white hover:bg-gray-50 text-gray-600'
                            }`}
                        aria-pressed={activeTag === tag}
                    >
                        #{tag || ''}
                    </motion.button>
                ))}
                <motion.div
                    className="absolute  rounded-full z-0"
                    initial={false}
                    animate={{
                        width: highlightStyle.width,
                        left: highlightStyle.left,
                        height: '34px',
                        top: '0px',
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                    }}
                />
            </div>
        </div>
    )
}

export default Body