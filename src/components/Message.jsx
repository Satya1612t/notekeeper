import React from 'react'
import { usePopup } from '../contexts/PopupProvider'
import toast from 'react-hot-toast'

function Message() {

    const { closePopup } = usePopup()

    const handleSubmit = () => {
        closePopup();
        toast.success('functionality will be active soon...');
    }

    return (
        <div className='w-full h-28 flex items-center gap-10 justify-center whitespace-nowrap'>
            <input type="text" name='title' required placeholder='Write a label...' className='border-b-[1px] w-full px-2 py-1  border-black placeholder:text-black placeholder:font-light placeholder:text-lg focus:outline-none text-sm font-normal' />
            <button onClick={handleSubmit} className='tracking-tighter text-sm font-semibold hover:bg-slate-200 rounded-md border py-2 px-5'>Done</button>
        </div>
    )
}

export default Message