import { createContext, useContext, useState } from "react";

const PopupContext = createContext();

function PopupProvider({ children }) {
    const [activePopup, setActivePopup] = useState(null);
    const [popupContent, setPopupContent] = useState(null);

    const openPopup = (popupName, content = null) => {
        setPopupContent(content);
        setActivePopup(popupName);
    };

    const closePopup = () => {
        setPopupContent(null);
        setActivePopup(null);
    };

    return (
        <PopupContext.Provider value={{ openPopup, closePopup, activePopup, popupContent }}>
            {children}
        </PopupContext.Provider>
    );
}

export default PopupProvider;

export const usePopup = () => useContext(PopupContext);
