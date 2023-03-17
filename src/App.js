import './App.css';
import Navbar from './components/nav';
function App() {
  return (
    <div>
      <Navbar />
      <div className='w-screen h-screen grid grid-cols-2'>
        <div>
          <div className='text-2xl font-bold'>
            <h1>RewordMe - Sentence Rephraser AI</h1>
            <p className='text-sm'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam laoreet mi eros, eget lacinia massa pulvinar in. Sed luctus est sit amet volutpat dictum.</p>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default App;

