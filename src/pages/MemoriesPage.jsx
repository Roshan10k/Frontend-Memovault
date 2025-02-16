import React from "react";
import Memories from "../component/memories";
import memoriesBg from "../assets/backgroundMemo.png"; 

const MemoriesPage = () => {
  return (
    <div style={{ backgroundImage: `url(${memoriesBg})`, backgroundSize: "cover", minHeight: "100vh" }}>
      
      <Memories />
    </div>
  );
};

export default MemoriesPage;
