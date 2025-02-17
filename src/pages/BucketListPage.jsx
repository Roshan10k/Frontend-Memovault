import React from "react";
import BucketList from "../component/BucketList";
import bucketBg from "../assets/backgroundBucket.png"

const BucketListPage = () => {
  return (
    <div style={{ backgroundImage: `url(${bucketBg})`, backgroundSize: "cover", minHeight: "100vh" }}>
      
      <BucketList />
    </div>
  );
};

export default BucketListPage;
