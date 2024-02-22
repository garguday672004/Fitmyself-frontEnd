// EntryExitPage.js
import React, { useState, useEffect } from 'react';
import annyang from 'annyang';
import './VoiceCheckIn.css'; // Import CSS file for styling

const VoiceCheckIn = () => {
  const [entryRecords, setEntryRecords] = useState([]);
  const [exitRecords, setExitRecords] = useState([]);

  useEffect(() => {
    if (annyang) {
      const commands = {
        'gym aage': enterGym,
        'aag lgadenge aag': enterGym,
        'sunny deol c body re': enterGym,
        'gym entered': enterGym,
        'gym exited': exitGym,
        'gym krli oye': exitGym,
      };

      annyang.addCommands(commands);
      annyang.start();

      return () => {
        annyang.removeCommands();
      };
    }
  }, []);

  const enterGym = () => {
    const entryTime = new Date().toLocaleTimeString();
    setEntryRecords([...entryRecords, entryTime]);
  };

  const exitGym = () => {
    const exitTime = new Date().toLocaleTimeString();
    setExitRecords([...exitRecords, exitTime]);
  };

  return (
    <div className="entry-exit-container">
      <h1 className='ee' id='hd'>FitMyself - Entry/Exit Page</h1>
      <br></br><br></br>
      <p id='vc'>Voice commands: ["gym aage", "aag lgadenge aag", "sunny deol c body re", "gym entered"], ["gym exited", "gym krli oye"]</p>
      <div className="record-section">
        <h2 className='ee'>Entry Records:</h2>
        <ul className="record-list entry-record-list">
          {entryRecords.map((entryTime, index) => (
            <li key={index} className="record-item">
              <p className='time'>{entryTime}</p>
              <p className="action-entered">Entered</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="record-section">
        <h2 className='ee'>Exit Records:</h2>
        <ul className="record-list exit-record-list">
          {exitRecords.map((exitTime, index) => (
            <li key={index} className="record-item">
              <p className='time'>{exitTime}</p>
              <p className="action-exited">Exited</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default VoiceCheckIn;