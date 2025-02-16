import React, { useState, useEffect } from "react";
import {createMemory,getMemories} from "../Api/Api"
import "../styles/memories.css";

function Memories() {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);
  const [dateCreated, setDate] = useState("");
  const [openDate, setOpenDate] = useState("");
  const [previewURL, setPreviewURL] = useState("");
  const [memories, setMemories] = useState([]);
  const [now, setNow] = useState(new Date());
  const [selectedMemory, setSelectedMemory] = useState(null); // For modal

  // Update the current time every second for the countdown timers
  useEffect(() => {
    const intervalId = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  // Fetch memories from backend on component mount
  useEffect(() => {
    fetchMemories();
  }, []);

  const fetchMemories = async () => {
    try {
      const res = await getMemories();
      setMemories(res.data);
    } catch (err) {
      console.error("Error fetching memories:", err);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewURL(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create form data to include image and text fields
    const formData = new FormData();
    formData.append("title", title);
    formData.append("message", message);
    formData.append("image", image);
    formData.append("dateCreated", dateCreated);
    formData.append("openDate", openDate);

    try {
      const response = await createMemory(formData)
        
      // After successful submission, reset the form
      setTitle("");
      setMessage("");
      setImage(null);
      setDate("");
      setOpenDate("");
      setPreviewURL("");
      setShowForm(false); // Hide the form

      fetchMemories(); // Refresh the list of memories
    } catch (error) {
      console.error("Error creating memory:", error);
    }
  };
  
  const handleAddMemoryClick = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setPreviewURL(""); // Clear preview when closing form
  };

  // Helper function to calculate the countdown string from a given open date
  const getCountdownString = (openDateTime) => {
    const diff = openDateTime - now;
    if (diff <= 0) return "Memory is open!";
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  // Handle clicking on a memory card.
  // If the memory is open, show the modal with its secret message.
  const handleCardClick = (memory) => {
    const openDateTime = new Date(memory.openDate);
    console.log("Card clicked:", memory);
    console.log("Memory openDate:", openDateTime, "Current time:", now);

    if (openDateTime > now) {
      alert("This memory is not open yet!");
      return;
    }
    setSelectedMemory(memory);
  };

  // Function to close the modal
  const closeModal = () => {
    setSelectedMemory(null);
  };

  return (
    <div className="memories__container">
      <h2>Your Memories</h2>
      {/* When form is NOT open, show the memories list and the add memory card */}
      {!showForm && (
        <div className="memories__list">
          <div className="memories__add-card" onClick={handleAddMemoryClick}>
            <div className="memories__plus">+</div>
            <h2>Add a New Memory</h2>
          </div>

          <div className="memories__cards">
            {memories.length > 0 ? (
              memories.map((memory) => {
                const openDateTime = new Date(memory.openDate);
                const isOpen = openDateTime <= now;
                return (
                  <div
                    key={memory.id}
                    className="memories__card"
                    onClick={() => handleCardClick(memory)}
                    style={{ cursor: isOpen ? "pointer" : "default" }}
                  >
                    <h3>{memory.title}</h3>
                    <img
                      src={`http://localhost:8080/uploads/${memory.imageUrl}`}
                      alt="Memory"
                    />
                    <p>
                    
                      {isOpen
                        ? "Memory is open! Click to view your message."
                        : `Opens in: ${getCountdownString(openDateTime)}`}
                    </p>
                  </div>
                );
              })
            ) : (
              <p>No memories found.</p>
            )}
          </div>
        </div>
      )}

      {/* Modal for displaying the memory message */}
      {selectedMemory && (
  <div className="memories-modal" onClick={closeModal}>
    <div className="memories-modal-content" onClick={(e) => e.stopPropagation()}>
      <button className="memories-close-modal" onClick={closeModal}>
        &times;
      </button>
      <h2>{selectedMemory.title}</h2>
      <img
        src={`http://localhost:8080/uploads/${selectedMemory.imageUrl}`}
        alt="Memory"
      />
      <p>{selectedMemory.message}</p>
    </div>
  </div>
)}

      {/* When form is open, display the new memory form only */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className={`memories__form ${showForm ? "show" : ""}`}
        >
          <button
            type="button"
            className="memories__close-btn"
            onClick={handleCloseForm}
          >
            &times;
          </button>
          <h1>Create a Memory</h1>
          <div className="memories__input-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
              required
            />
          </div>
          <div className="memories__input-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter your secret message"
              required
            />
          </div>
          <div className="memories__input-group">
            <label htmlFor="image">Image</label>
            <input
              type="file"
              id="image"
              onChange={handleImageChange}
              accept="image/*"
            />
          </div>
          {previewURL && (
            <div className="memories__image-preview">
              <img src={previewURL} alt="Memory preview" />
            </div>
          )}
          <div className="memories__input-group">
            <label htmlFor="date">Created Date</label>
            <input
              type="date"
              id="date"
              value={dateCreated}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className="memories__input-group">
            <label htmlFor="openDate">Open Date</label>
            <input
              type="date"
              id="openDate"
              value={openDate}
              onChange={(e) => setOpenDate(e.target.value)}
            />
          </div>
          <button type="submit" className="memories__submit-btn">
            Save Memory
          </button>
        </form>
      )}
    </div>
  );
}

export default Memories;
