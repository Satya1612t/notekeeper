import React from "react";
import { usePopup } from "../contexts/PopupProvider";

function Popup() {
    const { activePopup, popupContent, closePopup } = usePopup();
    if (!activePopup) return null; 

    return (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50" onClick={closePopup}>
            <div className="bg-white px-4 py-2 rounded-2xl sm:max-w-sm w-[80%] shadow-lg" onClick={(e) => e.stopPropagation()} >
                <h1 className=" text-center font-light text-5xl tracking-tighter border-b  border-black ">{activePopup}</h1>
                {popupContent}
                <button onClick={closePopup} className="border bg-white rounded-sm border-black px-2  absolute top-2 right-2 text-black ">
                    <span>x</span>
                </button>
            </div>
        </div>
    );
}

export default Popup;
