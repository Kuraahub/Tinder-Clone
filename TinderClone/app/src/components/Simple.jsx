import React, { useState, useEffect } from 'react';
import TinderCard from 'react-tinder-card';
import './Simple.css'; // Importation du fichier CSS pour les styles personnalisés

function Simple() {
  const [profiles, setProfiles] = useState([]);
  const [lastDirection, setLastDirection] = useState();

  useEffect(() => {
    // Utilisation de fetch pour appeler votre API Flask et récupérer les profils
    fetch('http://127.0.0.1:5000/profiles')
      .then(response => response.json())
      .then(data => {
        setProfiles(data);
      })
      .catch(error => {
        console.error('Error fetching profiles:', error);
      });
  }, []);

  const swiped = (direction, nameToDelete) => {
    console.log('removing: ' + nameToDelete);
    setLastDirection(direction);
  }

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!');
  }

  return (
    <div className="app">
      <link href='https://fonts.googleapis.com/css?family=Damion&display=swap' rel='stylesheet' />
      <link href='https://fonts.googleapis.com/css?family=Alatsi&display=swap' rel='stylesheet' />
      <h1 className="app-title">Tinder Card</h1>
      <div className='cardContainer'>
        {profiles.map((profile, index) => (
          <TinderCard
            className='swipe'
            key={index}
            onSwipe={(dir) => swiped(dir, profile.name)}
            onCardLeftScreen={() => outOfFrame(profile.name)}
          >
            <div className='card' style={{ backgroundImage: `url(${profile.photo})` }}>
              <div className="profile-info">
                <h3>{profile.name}, {profile.age}</h3>
                <p>{profile.city}, {profile.country}</p>
                <p>{profile.bio}</p>
              </div>
            </div>
          </TinderCard>
        ))}
      </div>
      {lastDirection ? <h2 className='infoText'>You swiped {lastDirection}</h2> : <h2 className='infoText' />}
    </div>
  );
}

export default Simple;
