import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ReaderSection.css';

function ReaderSection() {
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/books');
            const data = await res.json();
            setBooks(data);
        } catch (error) {
            console.error("Error fetching books:", error);
        }
    };

    const handleReadMeClick = (bookId) => {
        navigate(`/book/${bookId}`);
    };

    return (
        <div className="reader-section">
            {books.map((book) => (
                <div className="book-box" key={book._id}>
                    <img src={`http://localhost:5000/${book.coverImage}`} alt={`${book.title} cover`} className="book-image" />
                    <h3 className="book-title">{book.title}</h3>
                    <p className="book-author">by {book.author}</p>
                    <button onClick={() => handleReadMeClick(book._id)} className="read-button">Read Me</button>
                </div>
            ))}
        </div>
    );
}

export default ReaderSection;

