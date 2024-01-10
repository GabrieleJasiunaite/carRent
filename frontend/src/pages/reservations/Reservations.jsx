import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from '../../hooks/useAuthContext';
import './reservations.css';

// Reservations component for displaying a list of reservations
const Reservations = () => {
    // State for storing reservations
    const [reservations, setReservations] = useState([]);
    // State for handling errors
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true)

    // Accessing user information from the authentication context
    const { user } = useAuthContext();

    // Fetch reservations data when the component mounts
    useEffect(() => {
        const fetchReservations = async () => {
            setIsLoading(true)
            try {
                // Fetch reservations from the server using the user's token for authorization
                const response = await fetch("http://localhost:8000/api/reservations", {
                    headers: { 'Authorization': `Bearer ${user.token}` }
                });

                if (response.status === 500) {
                    setError('Užklausa buvo nesėkminga');
                    return;
                };

                const json = await response.json();
                if (response.ok) {
                    setReservations(json);
                    setError(null);
                };

            } catch (err) {
                setError(err);
            }

            setIsLoading(false)
        };

        fetchReservations();

    }, [])

    const handleDelete = () => {

    };

    return (
        <div className="container">
            <div className="reservations">
                <h2>Visos rezervacijos</h2>
                {error && <div className="error">{error}</div>}
                {reservations.length === 0 && <div>Rezervacijų nėra</div>}
                {isLoading ? (
                    <div className="loading-modal">
                        <div className="loading-content">
                            <p className="loading-text">Kraunasi...</p>
                        </div>
                    </div>
                ) : (
                    <div className="reservations-grid">{
                        reservations.map((reservation) => (
                            <div className={user.isAdmin ? "row-admin" : "row"} key={reservation._id}>
                                {user.isAdmin && <div className="col">{reservation.email}</div>}
                                <div className="col">{reservation.carTitle}</div>
                                <div className="col"><strong>Nuo: </strong>{reservation.dateRented.slice(0, 10)}</div>
                                <div className="col"><strong>Iki: </strong>{reservation.dateReturned.slice(0, 10)}</div>
                                <div className={"col status" + " " + reservation.status}>{reservation.status}</div>
                                {(reservation.status !== "įvykdyta" || reservation.status !== "atšaukta") ? (
                                    <div className="col"><Link to={`/reservations/edit/${reservation._id}`} state={reservation}><button className="edit">Redaguoti</button></Link></div>
                                ) : (
                                    <div className="col"><button onClick={handleDelete} className="edit">Ištrinti</button></div>
                                )}
                            </div>
                        ))
                    }</div>
                )}
            </div>
        </div>
    );
};

export default Reservations;