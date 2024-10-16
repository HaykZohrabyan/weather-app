import React from 'react';
import Header from './components/UI/header';
import AppRouter from './components/app-router';

const App = () => {
  return (
    <main className="page-wrapper">
      <Header/>
      <AppRouter/>
    </main>
  );
};

export default App;