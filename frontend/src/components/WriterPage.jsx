/*import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const WriterPage = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [story, setStory] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); // Assuming you store the token after login
    try {
      const res = await fetch('http://localhost:5000/api/books/publish', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
        body: JSON.stringify({ title, author, coverImage, story }),
      });
      const data = await res.json();
      if (res.ok) {
        alert('Book published successfully!');
        navigate('/mybooks'); // Redirect to the user's book list page after publishing
      } else {
        alert(data.msg);
      }
    } catch (error) {
      console.error('Publish error:', error);
    }
  };

  return (
    <div>
      <h2>Write Your Book</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Author:</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Cover Image URL:</label>
          <input
            type="text"
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
          />
        </div>
        <div>
          <label>Story:</label>
          <textarea
            value={story}
            onChange={(e) => setStory(e.target.value)}
            required
          />
        </div>
        <button type="submit">Publish</button>
      </form>
    </div>
  );
};

export default WriterPage;*/

/*import React, { useState } from 'react';

const WriterPage = () => {
  const [bookTitle, setBookTitle] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [storyText, setStoryText] = useState('');
  const [bookCover, setBookCover] = useState(null);

  const handleFileChange = (e) => {
    setBookCover(e.target.files[0]);
  };

  const publishBook = async () => {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage

    if (!token) {
      alert('No token found, please log in again.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('title', bookTitle);
      formData.append('author', authorName);
      formData.append('story', storyText);
      formData.append('image', bookCover);

      const res = await fetch('http://localhost:5000/api/books', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}` // Attach token here
        },
        body: formData
      });

      const data = await res.json();
      if (res.ok) {
        alert('Book published successfully!');
      } else {
        alert(data.msg);
      }
    } catch (error) {
      console.error('Error publishing book:', error);
    }
  };

  return (
    <div>
      <h2>Write and Publish a Book</h2>
      <form>
        <div>
          <label htmlFor="title">Book Title:</label>
          <input
            type="text"
            id="title"
            value={bookTitle}
            onChange={(e) => setBookTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="author">Author Name:</label>
          <input
            type="text"
            id="author"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="story">Story:</label>
          <textarea
            id="story"
            value={storyText}
            onChange={(e) => setStoryText(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="cover">Book Cover:</label>
          <input type="file" id="cover" onChange={handleFileChange} />
        </div>
        <button type="button" onClick={publishBook}>Publish</button>
      </form>
    </div>
  );
};

export default WriterPage;*/

// src/components/WriterPage.jsx
/*import React, { useState } from 'react';



const WriterPage = () => {
  const [title, setTitle] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [coverImage, setCoverImage] = useState(null);
  const [story, setStory] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('authorName', authorName);
    formData.append('coverImage', coverImage);
    formData.append('story', story);

    try {
      const res = await fetch('http://localhost:5000/api/books/publish', {
        method: 'POST',
        headers: {
          'x-auth-token': localStorage.getItem('token'), // Ensure you have the token
        },
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        alert('Book published successfully!');
        // Optionally clear the form or navigate elsewhere
      } else {
        alert(data.msg);
      }
    } catch (error) {
      console.error('Error publishing book:', error);
    }
  };

  return (
    <div>
      <h2>Publish Your Book</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label style={{ color: 'white' }}>Book Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label  style={{ color: 'white' }}>Author Name:</label>
          <input type="text" value={authorName} onChange={(e) => setAuthorName(e.target.value)} required />
        </div>
        <div>
          <label  style={{ color: 'white' }}>Cover Image:</label>
          <input type="file" accept="image/*" onChange={(e) => setCoverImage(e.target.files[0])} required />
        </div>
        <div>
          <label  style={{ color: 'white' }}>Story:</label>
          <textarea value={story} onChange={(e) => setStory(e.target.value)} required />
        </div>
        <button type="submit">Publish</button>
      </form>
    </div>
  );
};

export default WriterPage;*/




import React, { useState } from 'react';
import './WriterPage.css';

const WriterPage = () => {
    const [image, setImage] = useState(null);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [story, setStory] = useState('');

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file)); // Create a URL for the uploaded image
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission logic here (e.g., send data to API)
        console.log('Book published:', { title, author, story, image });
    };

    return (
        <div className="writer-page">
            <h1 className="page-title">Publish Your Book</h1>
            <form className="writer-form" onSubmit={handleSubmit}>
                <div className="upload-container">
                    <div className="upload-image-container">
                    {image ? (
                            <img src={image} alt="Uploaded" className="uploaded-image"  />
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
                        />
                        <input
                            type="text"
                            className="input-box"
                            placeholder="Author Name"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                        />
                    </div>
                </div>
                <div className="story-container">
                    <textarea
                        className="story-box"
                        placeholder="Write your story here..."
                        value={story}
                        onChange={(e) => setStory(e.target.value)}
                    />
                </div>
                <button type="submit" className="submit-button">Publish Book</button>
            </form>
        </div>
    );
};

export default WriterPage;;



