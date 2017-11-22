import React from 'react';
import '../styles/App.css';

import PodcastList from './podcast_list';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Podcasters</h1>
      </header>
      <PodcastList />
    </div>
  );
}

export default App;
