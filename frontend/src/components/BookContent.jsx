import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function BookContent() {
    const { bookId } = useParams();
    const [book, setBook] = useState(null);

    useEffect(() => {
        fetchBook();
    }, []);

    const fetchBook = async () => {
        try {
            const res = await fetch(`http://localhost:5000/api/books/${bookId}`);
            const data = await res.json();
            setBook(data);
        } catch (error) {
            console.error("Error fetching book:", error);
        }
    };

    return (
        <div className="book-content">
            {book ? (
                <>
                    <h1>{book.title}</h1>
                    <h3>by {book.author}</h3>
                    <p>{book.story}</p>
                </>
            ) : (
                <p>Loading book content...</p>
            )}
        </div>
    );
}

export default BookContent;

