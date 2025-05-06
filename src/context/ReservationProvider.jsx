import {createContext, useState} from 'react';

export const ReservationContext = createContext();

function ReservationContextProvider({children}) {
    const [reservationList, setReservationList] = useState([]);

    const addToReservation = (book) => {
        setReservationList((prevList) => [...prevList, book])
        localStorage.setItem("reservation", book);
    };

    const clearReservation = () => {
        setReservationList([]);
    }

    const contextValue = {
        reservationList,
        setReservationList,
        addToReservation,
        clearReservation
    }

    return (
        <ReservationContext.Provider value={contextValue}>
            {children}
        </ReservationContext.Provider>
    );
}

export default ReservationContextProvider;