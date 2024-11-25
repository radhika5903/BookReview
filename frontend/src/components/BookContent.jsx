// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import './BookContent.css';

// function BookContent() {
//     const { bookId } = useParams();
//     const navigate = useNavigate();
//     const [book, setBook] = useState(null);
//     const [rating, setRating] = useState(0); // State to manage star rating
//     const [showFeedbackBox, setShowFeedbackBox] = useState(false); // State to control feedback box visibility
//     const [feedback, setFeedback] = useState(''); // State for feedback text

//     useEffect(() => {
//         const fetchBook = async () => {
//             try {
//                 const res = await fetch(`http://localhost:5000/api/books/${bookId}`);
//                 const data = await res.json();
//                 setBook(data);
//             } catch (error) {
//                 console.error("Error fetching book:", error);
//             }
//         };

//         fetchBook();
//     }, [bookId]);

//     // Function to toggle feedback box visibility
//     const handleFeedbackButtonClick = () => {
//         setShowFeedbackBox(!showFeedbackBox);
//     };

//     // Function to handle feedback submission
//     const handleSubmitFeedback = async () => {
//         try {
//             const response = await fetch(`http://localhost:5000/api/books/${bookId}/feedback`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'x-auth-token': localStorage.getItem('token'), // Include token for authorization
//                 },
//                 body: JSON.stringify({ rating, feedback }), // Send rating and feedback
//             });
//             if (response.ok) {
//                 alert("Feedback submitted successfully!");
//                 setFeedback(''); // Clear feedback input
//                 setShowFeedbackBox(false); // Hide feedback box
//                 setRating(0); // Reset rating after submission
//             } else {
//                 alert("Error submitting feedback.");
//             }
//         } catch (error) {
//             console.error("Error submitting feedback:", error);
//             alert("Error submitting feedback.");
//         }
//     };

//     // Function to handle star click
//     const handleStarClick = (value) => {
//         setRating(value);
//     };

//     if (!book) {
//         return <p>Loading book content...</p>;
//     }

//     return (
//         <div className="book-content">
//             <h1>{book.title || book.name}</h1>
//             <h3>by {book.author}</h3>
//             <p>{book.story || book.content}</p>
//             <div className="star-rating">
//                 {[1, 2, 3, 4, 5].map((star) => (
//                     <span
//                         key={star}
//                         className={`star ${star <= rating ? 'filled' : ''}`}
//                         onClick={() => handleStarClick(star)}
//                     >
//                         &#9733;
//                     </span>
//                 ))}
//                 <p>{rating}/5</p>
//             </div>

//             {/* Feedback button and box */}
//             <button className="feedback-button" onClick={handleFeedbackButtonClick}>
//                 Feedback
//             </button>
//             {showFeedbackBox && (
//                 <div className="feedback-box">
//                     <textarea
//                         value={feedback}
//                         onChange={(e) => setFeedback(e.target.value)}
//                         placeholder="Write your feedback here..."
//                     />
//                     <button className="submit-feedback-button" onClick={handleSubmitFeedback}>
//                         Submit
//                     </button>
//                 </div>
//             )}

//             <button className="back-button" onClick={() => navigate(-1)}>
//                 Back
//             </button>
//         </div>
//     );
// }

// export default BookContent;







// // BookContent.jsx
// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import './BookContent.css';

// function BookContent() {
//     const { bookId } = useParams();
//     const navigate = useNavigate();
//     const [book, setBook] = useState(null);
//     const [rating, setRating] = useState(0);
//     const [showFeedbackBox, setShowFeedbackBox] = useState(false);
//     const [showFeedbackList, setShowFeedbackList] = useState(false); // New state for feedback list
//     const [feedback, setFeedback] = useState('');
//     const [feedbacks, setFeedbacks] = useState([]); // New state to store all feedbacks

//     useEffect(() => {
//         const fetchBook = async () => {
//             try {
//                 const res = await fetch(`http://localhost:5000/api/books/${bookId}`);
//                 const data = await res.json();
//                 setBook(data);
//             } catch (error) {
//                 console.error("Error fetching book:", error);
//             }
//         };

//         fetchBook();
//     }, [bookId]);

//     // New function to fetch feedbacks
//     const fetchFeedbacks = async () => {
//         try {
//             const response = await fetch(`http://localhost:5000/api/books/${bookId}/feedback`);
//             const data = await response.json();
//             setFeedbacks(data);
//         } catch (error) {
//             console.error("Error fetching feedbacks:", error);
//         }
//     };

//     // Function to toggle feedback list visibility
//     const handleSeeFeedbackClick = async () => {
//         if (!showFeedbackList) {
//             await fetchFeedbacks();
//         }
//         setShowFeedbackList(!showFeedbackList);
//     };

//     const handleFeedbackButtonClick = () => {
//         setShowFeedbackBox(!showFeedbackBox);
//     };

//     const handleSubmitFeedback = async () => {
//         try {
//             const response = await fetch(`http://localhost:5000/api/books/${bookId}/feedback`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'x-auth-token': localStorage.getItem('token'),
//                 },
//                 body: JSON.stringify({ rating, feedback }),
//             });
//             if (response.ok) {
//                 alert("Feedback submitted successfully!");
//                 setFeedback('');
//                 setShowFeedbackBox(false);
//                 setRating(0);
//                 // Refresh feedbacks if the feedback list is currently shown
//                 if (showFeedbackList) {
//                     fetchFeedbacks();
//                 }
//             } else {
//                 alert("Error submitting feedback.");
//             }
//         } catch (error) {
//             console.error("Error submitting feedback:", error);
//             alert("Error submitting feedback.");
//         }
//     };

//     const handleStarClick = (value) => {
//         setRating(value);
//     };

//     if (!book) {
//         return <p>Loading book content...</p>;
//     }

//     return (
//         <div className="book-content">
//             <h1>{book.title || book.name}</h1>
//             <h3>by {book.author}</h3>
//             <p>{book.story || book.content}</p>
//             <div className="star-rating">
//                 {[1, 2, 3, 4, 5].map((star) => (
//                     <span
//                         key={star}
//                         className={`star ${star <= rating ? 'filled' : ''}`}
//                         onClick={() => handleStarClick(star)}
//                     >
//                         &#9733;
//                     </span>
//                 ))}
//                 <p>{rating}/5</p>
//             </div>

//             <button className="feedback-button" onClick={handleFeedbackButtonClick}>
//                 Feedback
//             </button>

//             {/* New See Feedback button */}
//             <button className="see-feedback-button" onClick={handleSeeFeedbackClick}>
//                 See Feedback
//             </button>

//             {showFeedbackBox && (
//                 <div className="feedback-box">
//                     <textarea
//                         value={feedback}
//                         onChange={(e) => setFeedback(e.target.value)}
//                         placeholder="Write your feedback here..."
//                     />
//                     <button className="submit-feedback-button" onClick={handleSubmitFeedback}>
//                         Submit
//                     </button>
//                 </div>
//             )}

//             {/* New Feedback List Box */}
//             {showFeedbackList && (
//                 <div className="feedback-list-box">
//                     <h4>Book Reviews</h4>
//                     {feedbacks.length > 0 ? (
//                         feedbacks.map((feedback, index) => (
//                             <div key={index} className="feedback-item">
//                                 <div className="feedback-header">
//                                     <span className="feedback-username">{feedback.user.username}</span>
//                                     <div className="feedback-rating">
//                                         {Array(5).fill(null).map((_, i) => (
//                                             <span
//                                                 key={i}
//                                                 className={`star ${i < feedback.rating ? 'filled' : ''}`}
//                                             >
//                                                 ★
//                                             </span>
//                                         ))}
//                                     </div>
//                                 </div>
//                                 <p className="feedback-text">{feedback.feedback}</p>
//                             </div>
//                         ))
//                     ) : (
//                         <p>No feedbacks yet.</p>
//                     )}
//                 </div>
//             )}

//             <button className="back-button" onClick={() => navigate(-1)}>
//                 Back
//             </button>
//         </div>
//     );
// }

// export default BookContent;









import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './BookContent.css';

function BookContent() {
    const { bookId } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState(null);
    const [rating, setRating] = useState(0);
    const [showFeedbackBox, setShowFeedbackBox] = useState(false);
    const [feedback, setFeedback] = useState('');
    const [feedbackList, setFeedbackList] = useState([]); // State to manage feedback list
    const [showFeedbackList, setShowFeedbackList] = useState(false); // State to control feedback list visibility

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/books/${bookId}`);
                const data = await res.json();
                setBook(data);
                // Fetch feedback for the book
                const feedbackRes = await fetch(`http://localhost:5000/api/books/${bookId}/feedback`, {
                    headers: {
                        'x-auth-token': localStorage.getItem('token'), // Include token for authorization
                    },
                });
                const feedbackData = await feedbackRes.json();
                setFeedbackList(feedbackData);
            } catch (error) {
                console.error("Error fetching book:", error);
            }
        };

        fetchBook();
    }, [bookId]);

    const handleFeedbackButtonClick = () => {
        setShowFeedbackBox(!showFeedbackBox);
    };

    const handleSubmitFeedback = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/books/${bookId}/feedback`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': localStorage.getItem('token'),
                },
                body: JSON.stringify({ rating, feedback }),
            });
            if (response.ok) {
                alert("Feedback submitted successfully!");
                setFeedback('');
                setShowFeedbackBox(false);
                setRating(0);
                // Fetch updated feedback list
                const feedbackRes = await fetch(`http://localhost:5000/api/books/${bookId}/feedback`, {
                    headers: {
                        'x-auth-token': localStorage.getItem('token'),
                    },
                });
                const feedbackData = await feedbackRes.json();
                setFeedbackList(feedbackData);
            } else {
                alert("Error submitting feedback.");
            }
        } catch (error) {
            console.error("Error submitting feedback:", error);
            alert("Error submitting feedback.");
        }
    };

    const handleStarClick = (value) => {
        setRating(value);
    };

    const handleSeeFeedbackClick = () => {
        setShowFeedbackList(!showFeedbackList);
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

            <button className="see-feedback-button" onClick={handleSeeFeedbackClick}>
                See Feedback
            </button>
            {showFeedbackList && (
                <div className="feedback-list">
                    <h4>Feedback:</h4>
                    {feedbackList.length > 0 ? (
                        feedbackList.map((item) => (
                            <div key={item._id} className=" feedback-item">
                                <p><strong>{item.user.username}</strong>: {item.feedback} (Rating: {item.rating}/5)</p>
                            </div>
                        ))
                    ) : (
                        <p>No feedback available for this book.</p>
                    )}
                </div>
            )}

            <button className="back-button" onClick={() => navigate(-1)}>
                Back
            </button>
        </div>
    );
}

export default BookContent;