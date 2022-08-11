import React, { useEffect } from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { GoogleOAuthProvider } from '@react-oauth/google';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';

function App() {
  return (
    <GoogleOAuthProvider clientId="677242722279-47253m161b2ev6na98tuhcjhq6irctui.apps.googleusercontent.com">
      <BrowserRouter>
        <Container maxwidth="lg">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
