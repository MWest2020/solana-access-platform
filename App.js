import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [courseName, setCourseName] = useState('');
  const [ownerPublicKey, setOwnerPublicKey] = useState('');
  const [price, setPrice] = useState(0);
  const [coursePublicKey, setCoursePublicKey] = useState('');
  const [buyerPublicKey, setBuyerPublicKey] = useState('');
  const [newProfitPercentage, setNewProfitPercentage] = useState(0);

  const mintCourse = async () => {
    const result = await axios.post('/mint', { courseName, ownerPublicKey, price });
    console.log(result.data);
  };

  const buyCourse = async () => {
    const result = await axios.post('/buy', { coursePublicKey, buyerPublicKey });
    console.log(result.data);
  };

  const adjustProfit = async () => {
    const result = await axios.post('/adjust-profit', { ownerPublicKey, newProfitPercentage });
    console.log(result.data);
  };

  return (
    <div className="App">
      <h1>Solana Access Platform</h1>
      <div>
        <h2>Mint a new course</h2>
        <input type="text" placeholder="Course Name" onChange={e => setCourseName(e.target.value)} />
        <input type="text" placeholder="Owner Public Key" onChange={e => setOwnerPublicKey(e.target.value)} />
        <input type="number" placeholder="Price" onChange={e => setPrice(e.target.value)} />
        <button onClick={mintCourse}>Mint Course</button>
      </div>
      <div>
        <h2>Buy a course</h2>
        <input type="text" placeholder="Course Public Key" onChange={e => setCoursePublicKey(e.target.value)} />
        <input type="text" placeholder="Buyer Public Key" onChange={e => setBuyerPublicKey(e.target.value)} />
        <button onClick={buyCourse}>Buy Course</button>
      </div>
      <div>
        <h2>Adjust profit percentage</h2>
        <input type="text" placeholder="Owner Public Key" onChange={e => setOwnerPublicKey(e.target.value)} />
        <input type="number" placeholder="New Profit Percentage" onChange={e => setNewProfitPercentage(e.target.value)} />
        <button onClick={adjustProfit}>Adjust Profit</button>
      </div>
    </div>
  );
}

export default App;
</h2></button>