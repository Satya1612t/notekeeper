import React, { useEffect, useState } from 'react'
import { db } from '../firebase';
import { addDoc, doc, collection, serverTimestamp, updateDoc } from 'firebase/firestore';

function Noteform({ noteProps }) {

    const { noteData = null, setNoteData, isNewNote } = noteProps;

    const [formData, setFormData] = useState({
        title: noteData?.title || "",
        note: noteData?.note || "",
        tagLine: noteData?.tagLine || "",
    })

    const [saving, setSaving] = useState(false);


    useEffect(() => {
        const delayBounceFn = setTimeout(() => {
            handleAutoSave()
        }, 1100)

        return () => clearTimeout(delayBounceFn)
    }, [formData])

    useEffect(() => {
        if (noteData) {
            setFormData({
                title: noteData.title,
                note: noteData.note,
                tagLine: noteData.tagLine,
            });
        }
    }, [noteData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const handleAutoSave = async () => {
        if (!formData.title.trim() && !formData.note.trim()) return;

        try {
            setSaving(true);
            if (isNewNote) {
                // Create new note
                const docRef = await addDoc(collection(db, "notes"), {
                    ...formData,
                    pinned: false,
                    createdAt: serverTimestamp(),
                });

                console.log("New note added with ID:", docRef.id);

                setNoteData((prevNotes) => [
                    ...prevNotes,
                    { id: docRef.id, ...formData },
                ]);

                noteProps.noteData = { id: docRef.id, ...formData };
                noteProps.isNewNote = false;
            } else {
                const noteRef = doc(db, "notes", noteData.id);
                await updateDoc(noteRef, {
                    ...formData,
                });
                console.log("Note updated with ID:", noteData.id);

                setNoteData((prevNotes) =>
                    prevNotes.map((note) =>
                        note.id === noteData.id ? { ...note, ...formData } : note
                    )
                );
            }
        } catch (error) {
            console.log(error);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className='text-black w-full'>
            <form action="" className='space-y-1 flex flex-col items-center justify-center' >
                <input type="text" name='title' required placeholder='Write a title...' onChange={handleInputChange} value={formData.title} className='border-b-[1px] w-full px-2 py-1 mt-5 border-black placeholder:text-black placeholder:font-light placeholder:text-lg focus:outline-none text-sm font-normal' />
                <input type="text" name='tagLine' required placeholder='Your tagline' onChange={handleInputChange} value={formData.tagLine || ''} className='border-b-[1px] w-full px-2 py-2 mt-5 border-black placeholder:text-black placeholder:font-light placeholder:text-base focus:outline-none text-sm font-normal' />
                <textarea type='text' name="note" value={formData.note} onChange={handleInputChange} className='w-full placeholder:text-black placeholder:font-light text-sm font-normal border-b-[1px] border-black resize-none h-72 px-2 py-1 focus:outline-none scrollbar-none' placeholder='Take a note...'></textarea>
                {saving && <p className="text-xs left-2 bottom-0 -translate-x-1/2 -translate-y-0 text-gray-500">saving...</p>}
            </form>
        </div>
    )
}

export default Noteform