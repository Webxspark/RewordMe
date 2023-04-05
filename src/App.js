import './App.css';
import Navbar from './components/nav';
import { BrowserRouter } from "react-router-dom";
import {Routes, Route} from "react-router-loading";
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
            <Route loading path='/reword-me/' element={<Landing />} />
            <Route loading path='/reword-me/contact-us' element={<ContactUs />} />
            <Route loading path='/reword-me/feedback' element={<ContactUs />} />
            <Route loading path='/reword-me/api' element={<ApiInfo />} />
          </Routes>
        </div>
      </BrowserRouter>
    </LoginStatusProvider>
  );
}

export default App;

