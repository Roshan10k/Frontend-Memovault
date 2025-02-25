import { useState, useEffect } from "react";
import { FaTrophy, FaGraduationCap, FaRunning, FaPlane, FaPiggyBank, FaUsers } from "react-icons/fa";
import { createAchievement, getAchievements } from "../Api/Api"; // Import the APIs
import '../styles/Achievements.css';

const Achievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [newAchievement, setNewAchievement] = useState({
    date: "",
    title: "",
    category: "Personal Growth",
    description: "",
    reflection: "",
  });
  const [showForm, setShowForm] = useState(false); // Toggle form visibility

  const categories = [
    { name: "Personal Growth", icon: <FaTrophy /> },
    { name: "Career & Education", icon: <FaGraduationCap /> },
    { name: "Health & Fitness", icon: <FaRunning /> },
    { name: "Social & Relationships", icon: <FaUsers /> },
    { name: "Travel & Experiences", icon: <FaPlane /> },
    { name: "Finance & Savings", icon: <FaPiggyBank /> },
  ];

  useEffect(() => {
    // Fetch existing achievements on component mount
    const fetchAchievements = async () => {
      try {
        const response = await getAchievements();
        setAchievements(response.data);
      } catch (error) {
        console.error("Failed to fetch achievements:", error);
      }
    };
    fetchAchievements();
  }, []);

  const handleChange = (e) => {
    setNewAchievement({ ...newAchievement, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newAchievement.title && newAchievement.date) {
      try {
        await createAchievement(newAchievement);
        setAchievements([...achievements, newAchievement]);
        setNewAchievement({ date: "", title: "", category: "Personal Growth", description: "", reflection: "" });
        setShowForm(false); // Hide form after submission
      } catch (error) {
        console.error("Failed to create achievement:", error);
      }
    }
  };

  return (
    <div className="achievements-container">
      <h2>Achievements</h2>

      {/* Achievements Section */}
      {achievements.length > 0 ? (
        <div className="achievement-list">
          <div className="achievement-cards-container">
            {achievements.map((ach, index) => {
              const category = categories.find((cat) => cat.name === ach.category);
              return (
                <div className="achievement-card" key={index}>
                  <div className="achievement-card-header">
                    <div className="achievement-category-icon">{category.icon}</div>
                    <div className="achievement-card-title">{ach.title}</div>
                  </div>
                  <div className="achievement-card-body">
                    <div className="achievement-date">{ach.date}</div>
                    <p>{ach.description}</p>
                    <div className="achievement-reflection">Reflection: {ach.reflection}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <p>No achievements added yet.</p>
      )}

      {/* Button to Show/Hide Form */}
      <button className="toggle-form-btn" onClick={() => setShowForm(!showForm)}>
        {showForm ? "Cancel" : "Add New Achievement"}
      </button>

      {/* Achievement Form (Rendered when showForm is true) */}
      {showForm && (
        <form className="achievement-form show" onSubmit={handleSubmit}>
          <input type="date" name="date" value={newAchievement.date} onChange={handleChange} required />
          <input type="text" name="title" placeholder="Achievement Title" value={newAchievement.title} onChange={handleChange} required />
          <select name="category" value={newAchievement.category} onChange={handleChange}>
            {categories.map((cat, index) => (
              <option key={index} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
          <textarea name="description" placeholder="Short description" value={newAchievement.description} onChange={handleChange}></textarea>
          <textarea name="reflection" placeholder="How did you feel?" value={newAchievement.reflection} onChange={handleChange}></textarea>
          <button type="submit">Add Achievement</button>
        </form>
      )}
    </div>
  );
};

export default Achievements;
