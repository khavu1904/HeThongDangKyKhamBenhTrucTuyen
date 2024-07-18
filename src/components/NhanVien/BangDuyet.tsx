import React, { useState } from 'react';
import '../../css/BangDuyet.css';

interface Patient {
  id: number;
  name: string;
  phoneNumber: string;
  email: string;
  update: string;
  status: 'needConfirmation' | 'confirmed' | 'cancelled';
}

const BangDuyet: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<'needConfirmation' | 'confirmed' | 'cancelled'>('needConfirmation');

  const patients: Patient[] = [
    {
      id: 6,
      name: 'eric pham',
      phoneNumber: '0321456789',
      email: 'haryphamdev@gmail.com',
      update: '24/11/2020, 21:01 PM',
      status: 'needConfirmation',
    },
    // Add more patients here if needed
  ];

  const filteredPatients = patients.filter(patient => patient.status === currentTab);

  return (
    <div className="manage-patients">
      <div className="header">
        <button onClick={() => setCurrentTab('needConfirmation')}>Need confirmation(1)</button>
        <button onClick={() => setCurrentTab('confirmed')}>Confirmed (2)</button>
        <button onClick={() => setCurrentTab('cancelled')}>Cancelled (0)</button>
      </div>
      <table className="patients-table">
        <thead>
          <tr>
            <th>ID - Name</th>
            <th>Phone number</th>
            <th>Email</th>
            <th>Update</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredPatients.map((patient) => (
            <tr key={patient.id}>
              <td>{patient.id} - {patient.name}</td>
              <td>{patient.phoneNumber}</td>
              <td>{patient.email}</td>
              <td>{patient.update}</td>
              <td>
                {currentTab === 'needConfirmation' && (
                  <>
                    <button className="confirm" onClick={() => handleAction(patient.id, 'confirmed')}>Confirm</button>
                    <button className="cancel" onClick={() => handleAction(patient.id, 'cancelled')}>Cancel</button>
                  </>
                )}
                {currentTab === 'confirmed' && <span>Confirmed</span>}
                {currentTab === 'cancelled' && <span>Cancelled</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  function handleAction(id: number, status: 'confirmed' | 'cancelled') {
    // Here you would normally update the patient's status in the state or backend
    console.log(`Patient ${id} status changed to ${status}`);
    // For simplicity, this example just logs the action
  }
};

export default BangDuyet;
