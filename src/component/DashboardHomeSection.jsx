import React, { useEffect, useState } from 'react';
import { getCurrentUser, getRecentMemories, getBucketList, getAchievements, getYearlyGoals, getRecentLetters } from '../Api/Api';
import '../styles/DashboardHome.css';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [recentMemories, setRecentMemories] = useState([]);
  const [bucketList, setBucketList] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [yearlyGoals, setYearlyGoals] = useState([]);
  const [recentLetters, setRecentLetters] = useState([]);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  // Fetch data from API and set states
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await getCurrentUser();
        setUsername(userResponse.data?.username || "Guest");

        const memoriesResponse = await getRecentMemories();
        setRecentMemories(memoriesResponse.data || []);

        const bucketResponse = await getBucketList();
        setBucketList(bucketResponse.data || []);

        const achievementsResponse = await getAchievements();
        setAchievements(achievementsResponse.data || []);

        const goalsResponse = await getYearlyGoals();
        setYearlyGoals(goalsResponse.data || []);

        const lettersResponse = await getRecentLetters();
        setRecentLetters(lettersResponse.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Update the current time every second for countdowns
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer); // Clean up interval on component unmount
  }, []);

  // Function to calculate the countdown
  const getCountdownString = (openDateTime) => {
    const diff = openDateTime - currentDateTime;
    if (diff <= 0) return "Memory is open!";
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container-fluid memo-home-section">
      <div className="row">
        <div className="col-md-9">
          {/* Welcome Section */}
          <div className="card p-4 mb-3 memo-welcome-card">
            <h2>Hi, {username}! 👋</h2>
            <p>Welcome back! Capture your memories and set new goals.</p>
          </div>

          {/* Recent Achievements */}
          <div>
            <h5 className="mb-3 memo-section-title">🏆 Achievements</h5>
            <div className="memo-section">
              {achievements.map((achievement, index) => (
                <div key={index} className="card memo-item">{achievement.title}</div>
              ))}
            </div>
          </div>

          {/* Yearly Goals Chart (Placeholder) */}
          <div className="card p-4 mt-3 memo-analytics-card">
            <h5>📊 Yearly Goals Progress</h5>
            <p>Visualization of goals progress (Chart will be added)</p>
          </div>
        </div>

        {/* Sidebar Widgets */}
        <div className="col-md-3">
          <h5 className="mb-3 memo-section-title">🕰️ Recent Memories</h5>
          <div className="memo-section">
            {recentMemories.map((memory, index) => {
              const openDateTime = new Date(memory.openDate); // Assuming openDate is in the memory object
              return (
                <div key={index} className="card memo-item">
                  <p>{memory.title}</p>
                  <p>Countdown: {getCountdownString(openDateTime)}</p>
                </div>
              );
            })}
          </div>

          {/* Recent Letters Created */}
          <div>
            <h5 className="mb-3 memo-section-title">✉️ Recent Letters</h5>
            <div className="memo-section">
              {recentLetters.map((letter, index) => (
                <div key={index} className="card memo-item">{letter.title}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
