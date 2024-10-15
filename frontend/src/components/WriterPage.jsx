// WriterPage.jsx
import React, { useState } from 'react';
import './WriterPage.css';

const WriterPage = () => {
    const [image, setImage] = useState(null);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [story, setStory] = useState('');
    const [file, setFile] = useState(null); // To store the selected file

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFile(file);
            setImage(URL.createObjectURL(file)); // Preview the uploaded image
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('author', author);
        formData.append('story', story);
        formData.append('coverImage', file); // Append the image file

        try {
            const response = await fetch('http://localhost:5000/api/books/publish', {
                method: 'POST',
                headers: {
                    'x-auth-token': localStorage.getItem('token'), // Pass the token for authentication
                },
                body: formData // Send the form data
            });

            const data = await response.json();

            if (response.ok) {
                alert('Book published successfully!');
                // Clear the form fields
                setTitle('');
                setAuthor('');
                setStory('');
                setImage(null);
                setFile(null);
            } else {
                alert(data.message || 'Failed to publish the book');
            }
        } catch (error) {
            console.error('Error publishing book:', error);
            alert('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="writer-page">
            <h1 className="page-title">Publish Your Book</h1>
            <form className="writer-form" onSubmit={handleSubmit}>
                <div className="upload-container">
                    <div className="upload-image-container">
                        {image ? (
                            <img src={image} alt="Uploaded" className="uploaded-image" />
                        ) : (
                            <span>Upload Book Cover</span>
                        )}

                        <input
                            type="file"
                            className="image-upload"
                            accept="image/*"
                            onChange={handleImageUpload}
                        />
                    </div>
                    <div className="book-details">
                        <input
                            type="text"
                            className="input-box"
                            placeholder="Book Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            className="input-box"
                            placeholder="Author Name"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="story-container">
                    <textarea
                        className="story-box"
                        placeholder="Write your story here..."
                        value={story}
                        onChange={(e) => setStory(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="submit-button">Publish Book</button>
            </form>
        </div>
    );
};

export default WriterPage;




