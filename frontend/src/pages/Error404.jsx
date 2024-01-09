import { Link } from 'react-router-dom';

const Error404 = () => {
    return (
        <div className="notfound">
            <h1>Oops!</h1>
            <h2>404 - Puslapis nerastas</h2>
            <p>Puslapis, kurio ieškote, galėjo būti pašalintas, jei pasikeitė jo pavadinimas arba jis laikinai nepasiekiamas.</p>
            <Link to="/">
                Grįžti į pagrindinį
            </Link>
        </div>
    );
};

export default Error404;