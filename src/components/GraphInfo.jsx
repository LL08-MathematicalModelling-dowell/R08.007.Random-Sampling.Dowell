import { useState } from 'react';
import RandomGraph from './RandomGraph';
import axios from 'axios';
import Spinner from './spinner';
Spinner
const GraphInfo = () => {
  const [side, setSide] = useState(100);
  const [choice, setChoice] = useState(0);
  const [value, setValue] = useState(10);
  const [selection, setSelection] = useState(5);
  const [show, setShow] = useState(false);
  const [generating,setGenerating]=useState(false);
  const [data, setData] = useState(null);
  const [error,setError]=useState(false);
  const handleButtonClick =  async () => {
    setGenerating(true);
   
    try {
      const response = await axios.post('http://100022.pythonanywhere.com/fieldrp', 
        {
          side: side,
          selection: selection,
          choice:choice,
          value: value
        });
        console.log("data",response.data);
        console.log("data points",response.data.listOfPoints);
      setGenerating(false);
      setData(response.data.listOfPoints);
      setShow(true);
    } catch (error) {
      setError(true);
      setGenerating(false);
    }
  };


    //console.log('Current values:', side, selection, choice, value);
    // You can perform any other actions with the values here
  

  return (
    <div className='flex justify-evenly'>
    <div className="max-w-sm mx-left mt-8 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Graph Information</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Side:</label>
        <input
          type="number"
          className="mt-1 p-2 border rounded-md w-full"
          value={side}
          onChange={(e) => setSide(Number(e.target.value))}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Selection:</label>
        <input
          type="number"
          className="mt-1 p-2 border rounded-md w-full"
          value={selection}
          onChange={(e) => setSelection(Number(e.target.value))}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Choice:</label>
        <input
          type="number"
          className="mt-1 p-2 border rounded-md w-full"
          value={choice}
          onChange={(e) => setChoice(Number(e.target.value))}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Value:</label>
        <input
          type="number"
          className="mt-1 p-2 border rounded-md w-full"
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
        />
      </div>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full"
        onClick={handleButtonClick}
      >
        Generate Random Graph
      </button>
      <p>{generating ? 
                <><Spinner/> <span className='text-green-400'>generating...</span></>  : ""}</p>
    </div>
    <div className='max-w-sm mx-right mt-8 flex-1 p-6 bg-white rounded-md'>
     {!show && <RandomGraph data={data}/>}
     {error && <p className='text-green-300'>Couldn &apos;t generate the graph </p>}
    </div>
    </div>
    
  );
      }

export default GraphInfo;
