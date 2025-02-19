import React from "react";
import LetterToSelf from "../component/LetterToSelf";
import LetterBg from "../assets/backgroundLetter.png"

const LetterToSelfPage = () => {
  return (
    <div style={{ backgroundImage: `url(${LetterBg})`, backgroundSize: "cover", minHeight: "100vh" }}>
      
      <LetterToSelf />
    </div>
  );
};

export default LetterToSelfPage;
