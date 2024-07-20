import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminDashboard() {
  const [grids, setGrids] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [coordinates, setCoordinates] = useState([]);
  const [row, setRow] = useState('');
  const [column, setColumn] = useState('');
  const [character, setCharacter] = useState('');

  useEffect(() => {
    const fetchGrids = async () => {
      const response = await axios.get('/api/grids', { headers: { 'Authorization': localStorage.getItem('token') } });
      setGrids(response.data);
    };
    fetchGrids();
  }, []);

  const handleAddCoordinate = () => {
    setCoordinates([...coordinates, { row, column, character }]);
    setRow('');
    setColumn('');
    setCharacter('');
  };

  const handleSubmit = async () => {
    const grid = { name, description, coordinates };
    await axios.post('/api/grids', grid, { headers: { 'Authorization': localStorage.getItem('token') } });
    setGrids([...grids, grid]);
    setName('');
    setDescription('');
    setCoordinates([]);
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <div>
        <h2>Create New Grid</h2>
        <input
          type="text"
          placeholder="Grid Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          placeholder="Grid Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div>
          <input
            type="text"
            placeholder="Row"
            value={row}
            onChange={(e) => setRow(e.target.value)}
          />
          <input
            type="text"
            placeholder="Column"
            value={column}
            onChange={(e) => setColumn(e.target.value)}
          />
          <input
            type="text"
            placeholder="Character"
            value={character}
            onChange={(e) => setCharacter(e.target.value)}
          />
          <button onClick={handleAddCoordinate}>Add Coordinate</button>
        </div>
        <button onClick={handleSubmit}>Save Grid</button>
      </div>
      <div>
        <h2>Existing Grids</h2>
        <ul>
          {grids.map((grid) => (
            <li key={grid.id}>
              {grid.name} - {grid.description}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AdminDashboard;
