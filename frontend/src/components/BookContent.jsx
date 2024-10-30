

// BookContent.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './BookContent.css';

function BookContent() {
    const { bookId } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState(null);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/books/${bookId}`);
                const data = await res.json();
                setBook(data);
            } catch (error) {
                console.error("Error fetching book:", error);
            }
        };

        fetchBook();
    }, [bookId]);

    if (!book) {
        return <p>Loading book content...</p>;
    }

    return (
        <div className="book-content">
            <h1>{book.title || book.name}</h1>
            <h3>by {book.author}</h3>
            <p>{book.story || book.content}</p>
            <button className="back-button" onClick={() => navigate(-1)}>
                Back
            </button>
        </div>
    );
}

export default BookContent;




