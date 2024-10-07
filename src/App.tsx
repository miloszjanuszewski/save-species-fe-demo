
import React from 'react';
import {Footer, MainContent, NavigationBar} from './containers';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="app-container">
      <NavigationBar />
      <div className="app-content">
        <MainContent />
      </div>
      <Footer />
    </div>
  );
};

export default App;
