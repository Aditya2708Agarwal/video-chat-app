import { useState } from 'react'
import './App.css'
import toast, {Toaster} from 'react-hot-toast';

function App() {
  const [count, setCount] = useState(0)
  const notifu = () => toast('here is your toast',{
    duration:1000
  });

  return (
    <div>
      <button onClick={notifu}>onclick</button>
      <Toaster/>
    </div>
  )
}

export default App
