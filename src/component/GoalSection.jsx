import React, { useState, useEffect } from 'react';
import '../styles/GoalSection.css';
import { 
  getYearlyGoals, 
  addYearlyGoal, 
  updateYearlyGoal, 
  completeYearlyGoal, 
  addRemarksToGoal 
} from '../Api/Api';

const GoalSection = () => {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    // Fetch goals from the backend
    const fetchGoals = async () => {
      try {
        const response = await getYearlyGoals();
        let fetchedGoals = response.data;
        // Create default goals for all months
        const defaultGoals = months.map(createGoalEntry);
        // Merge default goals with fetched goals:
        // If a fetched goal exists for a month, use it; otherwise, keep the default.
        const mergedGoals = defaultGoals.map(defaultGoal => {
          const found = fetchedGoals.find(goal => goal.month === defaultGoal.month);
          return found || defaultGoal;
        });
        setGoals(mergedGoals);
      } catch (error) {
        console.error("Error fetching goals:", error);
        // Fallback to default goals if there is an error
        setGoals(months.map(createGoalEntry));
      }
    };
    fetchGoals();
  }, []);

  const handleGoalChange = async (id, value) => {
    const currentGoal = goals.find((goal) => goal.id === id);
    if (!currentGoal) return;

    if (currentGoal.isNew) {
      // If the goal is new (unsaved), add it to the backend
      try {
        const response = await addYearlyGoal({ 
          month: currentGoal.month, 
          goal: value 
        });
        // Replace the temporary goal with the one returned from the backend (with a real ID)
        setGoals(goals.map((goal) =>
          goal.id === id ? { ...response.data, isNew: false } : goal
        ));
      } catch (error) {
        console.error("Error adding new goal:", error);
      }
    } else {
      // If the goal exists in the backend, update it
      try {
        await updateYearlyGoal(id, { goal: value });
      } catch (error) {
        console.error("Error updating goal:", error);
      }
      setGoals(goals.map((goal) =>
        goal.id === id ? { ...goal, goal: value } : goal
      ));
    }
  };

  const handleToggleComplete = async (id) => {
    try {
      await completeYearlyGoal(id);
    } catch (error) {
      console.error("Error completing goal:", error);
    }
    setGoals(goals.map((goal) =>
      goal.id === id ? { ...goal, completed: !goal.completed } : goal
    ));
  };

  const handleRemarksChange = async (id, value) => {
    try {
      await addRemarksToGoal(id, value);
    } catch (error) {
      console.error("Error updating remarks:", error);
    }
    setGoals(goals.map((goal) =>
      goal.id === id ? { ...goal, remarks: value } : goal
    ));
  };

  const completedGoals = goals.filter((goal) => goal.completed);
  const incompleteGoals = goals.filter((goal) => !goal.completed);

  return (
    <div className="goal-section">
      <header className="progress-header">
        <h2>Yearly Goals Tracker</h2>
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${(completedGoals.length / goals.length) * 100}%` }}
          ></div>
        </div>
        <div className="progress-stats">
          {completedGoals.length} of {goals.length} months completed
        </div>
      </header>

      <div className="goals-container">
        <section className="active-goals">
          <h3>Active Goals</h3>
          <div className="goals-list">
            {incompleteGoals.map((goal) => (
              <GoalCard
                key={goal.id}
                goal={goal}
                onGoalChange={handleGoalChange}
                onToggleComplete={handleToggleComplete}
              />
            ))}
          </div>
        </section>

        <section className="completed-goals">
          <h3>Completed Goals</h3>
          <div className="goals-list">
            {completedGoals.map((goal) => (
              <CompletedGoalCard
                key={goal.id}
                goal={goal}
                onRemarksChange={handleRemarksChange}
                onToggleComplete={handleToggleComplete}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

// Sub-component for active goals (inline editing)
const GoalCard = ({ goal, onGoalChange, onToggleComplete }) => (
  <div className={`goal-card ${!goal.goal ? 'empty' : ''}`}>
    <div className="card-header">
      <h4>{goal.month}</h4>
      <button 
        className={`toggle-btn ${goal.completed ? 'complete' : 'incomplete'}`}
        onClick={() => onToggleComplete(goal.id)}
        aria-label={goal.completed ? 'Mark as incomplete' : 'Mark as complete'}
        disabled={!goal.goal}
      >
        {goal.completed ? '✓' : 'Done'}
      </button>
    </div>
    <textarea
      className="goal-input"
      placeholder="What's your goal for this month?"
      value={goal.goal}
      onChange={(e) => onGoalChange(goal.id, e.target.value)}
    />
  </div>
);

// Sub-component for completed goals
const CompletedGoalCard = ({ goal, onRemarksChange, onToggleComplete }) => (
  <div className="goal-card completed">
    <div className="card-header">
      <h4>{goal.month}</h4>
      <button 
        className="toggle-btn complete"
        onClick={() => onToggleComplete(goal.id)}
        aria-label="Mark as incomplete"
      >
        ✓
      </button>
    </div>
    <div className="completed-goal">{goal.goal}</div>
    <textarea
      className="remarks-input"
      placeholder="Add reflections or lessons learned..."
      value={goal.remarks || ""}
      onChange={(e) => onRemarksChange(goal.id, e.target.value)}
      maxLength="200"
    />
    <div className="character-count">
      {200 - (goal.remarks ? goal.remarks.length : 0)} characters remaining
    </div>
  </div>
);



// Helper function and constants (at the bottom of your file)
const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const createGoalEntry = (month) => ({
  id: `${month}-${Date.now()}`, // temporary client-side ID
  month,
  goal: '',
  completed: false,
  remarks: '',
  isNew: true, // mark as not yet saved to the backend
});


export default GoalSection;
