import React, { useState, useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";
import "../styles/bucketList.css";
import { GiEmptyMetalBucketHandle, GiPartyPopper } from "react-icons/gi";
import Confetti from "react-confetti";
import { getBucketList, addBucketTask, completeBucketTask } from "../Api/Api"; 

const BucketList = () => {
  const [toDoList, setToDoList] = useState([]); // Initialize as empty array
  const [doneList, setDoneList] = useState([]); // Initialize as empty array
  const [newToDo, setNewToDo] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const fetchBucketList = async () => {
      try {
        const response = await getBucketList();
        const todos = response.data.filter(item => item.status === "to-do");
        const dones = response.data.filter(item => item.status === "done");
        setToDoList(todos);
        setDoneList(dones);
      } catch (error) {
        console.error("Error fetching bucket list:", error);
      }
    };
    fetchBucketList();
  }, []);

  const moveItemToDone = async (id) => {
    try {
      await completeBucketTask(id); 
  
     
      const response = await getBucketList();
      setToDoList(response.data.filter(item => item.status === "to-do"));
      setDoneList(response.data.filter(item => item.status === "done"));
  
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
    } catch (error) {
      console.error("Error completing task:", error);
    }
  };
  

  const handleAddToDo = async () => {
    if (newToDo.trim()) {
      try {
        const response = await addBucketTask({ content: newToDo });

        setToDoList([...toDoList, response.data]);
        setNewToDo("");
      } catch (error) {
        console.error("Error adding task:", error);
      }
    }
  };

  const [, dropDone] = useDrop(() => ({
    accept: "ITEM",
    drop: (draggedItem) => {
      moveItemToDone(draggedItem.id); // Corrected here to use draggedItem.id
    },
  }));

  return (
    <div className="bucket-list">
      {showConfetti && <Confetti />} {/* Confetti animation */}

      {/* To-Do Section */}
      <div className="todo-box">
        <h3>
          <GiEmptyMetalBucketHandle /> Fill the Bucket
        </h3>
        <div className="add-todo">
          <input
            type="text"
            value={newToDo}
            onChange={(e) => setNewToDo(e.target.value)}
            placeholder="Wish into the bucket"
          />
          <button onClick={handleAddToDo}>Add</button>
        </div>

        <div className="task-list">
          {toDoList.map((item) => (
            <BucketItem key={item.id} item={item} />  
          ))}
        </div>
      </div>

      {/* Completed Section */}
      <div className="done-box" ref={dropDone}>
        <h3>
          <GiPartyPopper /> Out Of the Bucket
        </h3>

        {/* Progress Bar */}
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${
                (doneList.length / (toDoList.length + doneList.length)) * 100 || 0
              }%`,
            }}
          ></div>
        </div>

        <div className="task-list">
          {doneList.map((item) => (
            <div key={item.id} className="done-item">
              {item.content} {/* Render content of the item */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const BucketItem = ({ item }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "ITEM",
    item: { id: item.id }, // Pass the ID for reference
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className="bucket-item"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      {item.content}
    </div>
  );
};

export default BucketList;
