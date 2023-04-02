import './App.css';
import Navbar from './components/nav';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from './pages/Landing';
import ContactUs from './pages/contact-us';
import ApiInfo from './pages/api';
import { LoginStatusProvider } from './components/LoginContext';
function App() {
  return (
    <LoginStatusProvider>
      <BrowserRouter>
        <div>
          <Navbar />
          <Routes>
            <Route path='/reword-me/' element={<Landing />} />
            <Route path='/reword-me/contact-us' element={<ContactUs />} />
            <Route path='/reword-me/feedback' element={<ContactUs />} />
            <Route path='/reword-me/api' element={<ApiInfo />} />
          </Routes>
        </div>
      </BrowserRouter>
    </LoginStatusProvider>
  );
}

export default App;

