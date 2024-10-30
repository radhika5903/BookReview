

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import './ReaderSection.css';

// Import Swiper core and required modules
import { EffectCoverflow, Pagination } from 'swiper/modules';

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
            <Swiper
                modules={[EffectCoverflow, Pagination]}
                effect="coverflow"
                grabCursor={true}
                centeredSlides={true}
                slidesPerView="auto"
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }}
                pagination={{ clickable: true }}
            >
                {books.map((book) => (
                    <SwiperSlide key={book._id}>
                        <div className="book-box">
                            <img
                                src={`http://localhost:5000/${book.coverImage}`}
                                alt={`${book.title} cover`}
                                className="book-image"
                            />
                            <h3 className="book-title">{book.title}</h3>
                            <p className="book-author">by {book.author}</p>
                            <button className="read-me-button" onClick={() => handleReadMeClick(book._id)}>
                                Read Me
                            </button>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default ReaderSection;
