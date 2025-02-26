import React, { useState, useEffect } from "react";
import { createLetter, getLetters, deleteLetter, updateLetter } from "../Api/Api";
import "../styles/LetterToSelf.css";

const LetterToSelf = () => {
  const [isWriting, setIsWriting] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // Track if we are editing a letter
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [content, setContent] = useState("");
  const [letters, setLetters] = useState([]);
  const [selectedLetter, setSelectedLetter] = useState(null);

  useEffect(() => {
    fetchLetters();
  }, []);

  const fetchLetters = async () => {
    try {
      const response = await getLetters();
      setLetters(response.data);
    } catch (error) {
      console.error("Error fetching letters:", error);
      alert("Failed to fetch letters");
    }
  };

  const handleSave = async () => {
    if (!content.trim()) {
      alert("Letter content cannot be empty!");
      return;
    }

    if (isEditing) {
      // Update the existing letter
      try {
        await updateLetter(selectedLetter.id, { title, date, content });
        alert("Letter updated successfully!");
        setIsEditing(false);
        setIsWriting(false);
        setSelectedLetter(null);
        fetchLetters(); // Refresh list
      } catch (error) {
        console.error("Error updating letter:", error);
        alert("Failed to update letter");
      }
    } else {
      // Create a new letter
      try {
        await createLetter({ title, date, content });
        alert("Letter saved successfully!");
        setIsWriting(false);
        setTitle("");
        setDate(new Date().toISOString().split("T")[0]);
        setContent("");
        fetchLetters(); // Refresh list
      } catch (error) {
        console.error("Error saving letter:", error);
        alert("Failed to save letter");
      }
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this letter?")) return;
    try {
      await deleteLetter(id);
      alert("Letter deleted successfully!");
      fetchLetters(); // Refresh list
    } catch (error) {
      console.error("Error deleting letter:", error);
      alert("Failed to delete letter");
    }
  };

  const handleEdit = (letter) => {
    setIsEditing(true);
    setIsWriting(true); // Switch to writing mode
    setSelectedLetter(letter);
    setTitle(letter.title);
    setDate(letter.date);
    setContent(letter.content);
  };

  return (
    <div className="letter-container">
      <h2>Your Letters</h2>
      {isWriting ? (
        <div className="letter-form">
          <h2>{isEditing ? "Edit Your Letter" : "Write a Letter to Your Future Self"}</h2>
          <input
            type="text"
            placeholder="Title (optional)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="letter-title"
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="letter-date"
          />
          <textarea
            placeholder="Write your letter here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="letter-content"
          ></textarea>
          <button onClick={handleSave} className="save-button">
            {isEditing ? "Update Letter" : "Save Letter"}
          </button>
          <button onClick={() => setIsWriting(false)} className="cancel-button">
            Cancel
          </button>
        </div>
      ) : selectedLetter ? (
        <div className="letter-format">
          <div className="letter-paper">
            <h2>{selectedLetter.title || "Untitled Letter"}</h2>
            <p><strong>Date:</strong> {selectedLetter.date}</p>
            <p className="letter-content-view">{selectedLetter.content}</p>
          </div>
          <button onClick={() => handleDelete(selectedLetter.id)} className="delete-button">Delete</button>
          <button onClick={() => setSelectedLetter(null)} className="back-button">Back to Envelopes</button>
          <button onClick={() => handleEdit(selectedLetter)} className="edit-button">Edit</button> {/* Edit Button */}
        </div>
      ) : (
        <div>
          <div className="start-card" onClick={() => setIsWriting(true)}>
            <div className="plus-symbol">+</div> Write a new letter
          </div>
          <div className="envelope-list">
            {letters.map((letter) => (
              <div key={letter.id} className="envelope" onClick={() => setSelectedLetter(letter)}>
                <div className="envelope-flap"></div>
                <div className="envelope-body">
                  <p>{letter.title || "Untitled Letter"}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LetterToSelf;
