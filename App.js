import React from 'react';
import { AuthProvider } from './scr/context/AuthContext';
import Navigation from './scr/components/Navigation';

function App() {
  return (
    <AuthProvider>
      <Navigation/>
    </AuthProvider>
  );
}

export default App;