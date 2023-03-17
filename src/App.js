import './App.css';
import Navbar from './components/nav';
import { Button } from "@nextui-org/react";
function App() {
  return (
    <div>
      <Navbar />
      <div className='h-[100dvh] grid grid-cols-2'>
        <div>
          <div className='mx-8 flex pb-48 justify-center flex-col h-[100%]'>
            <h1 className="text-[30px] font-bold text-[#18113D]">RewordMe - Sentence Rephraser AI</h1>
            <span className='text-[15px] pt-4 font-bold text-[#4F4F4F]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam laoreet mi eros, eget lacinia massa pulvinar in. Sed luctus est sit amet volutpat dictum.</span>
            <div>
              <Button className='mt-6' color={"secondary"} shadow>TRY IT OUT</Button>
            </div>
          </div>
        </div>

        <div></div>
      </div>
    </div>
  );
}

export default App;

