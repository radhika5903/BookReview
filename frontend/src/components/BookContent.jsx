import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './BookContent.css';

function BookContent() {
    const { bookId } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState(null);
    const [rating, setRating] = useState(0); // State to manage star rating
    const [showFeedbackBox, setShowFeedbackBox] = useState(false); // State to control feedback box visibility
    const [feedback, setFeedback] = useState(''); // State for feedback text

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

    // Function to toggle feedback box visibility
    const handleFeedbackButtonClick = () => {
        setShowFeedbackBox(!showFeedbackBox);
    };

    // Function to handle feedback submission
    const handleSubmitFeedback = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/books/${bookId}/feedback`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': localStorage.getItem('token'), // Include token for authorization
                },
                body: JSON.stringify({ rating, feedback }), // Send rating and feedback
            });
            if (response.ok) {
                alert("Feedback submitted successfully!");
                setFeedback(''); // Clear feedback input
                setShowFeedbackBox(false); // Hide feedback box
                setRating(0); // Reset rating after submission
            } else {
                alert("Error submitting feedback.");
            }
        } catch (error) {
            console.error("Error submitting feedback:", error);
            alert("Error submitting feedback.");
        }
    };

    // Function to handle star click
    const handleStarClick = (value) => {
        setRating(value);
    };

    if (!book) {
        return <p>Loading book content...</p>;
    }

    return (
        <div className="book-content">
            <h1>{book.title || book.name}</h1>
            <h3>by {book.author}</h3>
            <p>{book.story || book.content}</p>
            <div className="star-rating">
                {[1, 2, 3, 4, 5].map((star) => (
                    <span
                        key={star}
                        className={`star ${star <= rating ? 'filled' : ''}`}
                        onClick={() => handleStarClick(star)}
                    >
                        &#9733;
                    </span>
                ))}
                <p>{rating}/5</p>
            </div>

            {/* Feedback button and box */}
            <button className="feedback-button" onClick={handleFeedbackButtonClick}>
                Feedback
            </button>
            {showFeedbackBox && (
                <div className="feedback-box">
                    <textarea
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        placeholder="Write your feedback here..."
                    />
                    <button className="submit-feedback-button" onClick={handleSubmitFeedback}>
                        Submit
                    </button>
                </div>
            )}

            <button className="back-button" onClick={() => navigate(-1)}>
                Back
            </button>
        </div>
    );
}

export default BookContent;




