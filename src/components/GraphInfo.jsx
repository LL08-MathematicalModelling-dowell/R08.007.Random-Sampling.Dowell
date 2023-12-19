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
  const [selectedOption, setSelectedOption] = useState('fieldrp');
  console.log("option",selectedOption)
  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const handleButtonClick =  async () => {
    setGenerating(true);
   
    try {
      let response=null;
      if(selectedOption==='fieldrp'){
      response = await axios.post('http://100022.pythonanywhere.com/fieldrp/', 
        {
          side: side,
          selection: selection,
          choice:choice,
          value: value
        });
      } else{
        response = await axios.post('http://100022.pythonanywhere.com/excelrp/', 
        {
          side: side,
          selection: selection,
          
        });
      }
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
      <h2 className="text-2xl text-[#005734] font-semibold mb-4">Graph Information</h2>
      <div className='flex justify-between w-full mb-2 mt-1'>
      <label>
        <input type="radio" className={`border-none checked:bg-green-500 text-green-300`}
         checked={selectedOption === 'fieldrp'}
        name="fileType" value="fieldrp" onChange={handleRadioChange}
/> Field RP
      </label>
      <label>
        <input type="radio" className={`border-none checked:bg-green-500 text-green-300`} name="fileType" value="exelrp" 
        checked={selectedOption === 'exelrp'}
        onChange={handleRadioChange}
/> Excel RP
      </label>
    </div>


      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Side:</label>
        <input
          type="number"
          className="mt-1 p-1 border rounded-md w-full  border-gray-300 flex mb-3 bg-gray-50 focus:outline-none text-gray-900 focus:border-[#005734]"
          value={side}
          onChange={(e) => setSide(Number(e.target.value))}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Selection:</label>
        <input
          type="number"
          className="mt-1 p-1 border rounded-md w-full  border-gray-300 flex mb-3 bg-gray-50 focus:outline-none text-gray-900 focus:border-[#005734]"
          value={selection}
          onChange={(e) => setSelection(Number(e.target.value))}
        />
      </div>

      {selectedOption !== 'exelrp' && (<div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Choice:</label>
        <input
          type="number"
          className="mt-1 p-1 border rounded-md w-full  border-gray-300 flex mb-3 bg-gray-50 focus:outline-none text-gray-900 focus:border-[#005734]"
          value={choice}
          onChange={(e) => setChoice(Number(e.target.value))}
        />
      </div>)}

      {selectedOption !== 'exelrp' &&(<div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Value:</label>
        <input
          type="number"
          className="mt-1 p-1 border rounded-md w-full  border-gray-300 flex mb-3 bg-gray-50 focus:outline-none text-gray-900 focus:border-[#005734]"
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
        />
      </div>)}

      <button
        className="bg-green-700 hover:bg-green-600 text-white px-4 py-2 rounded-md mt-2 w-full"
        onClick={handleButtonClick}
      >
        Generate Random Graph
      </button>
      <p>{generating ? 
                <><Spinner/> <span className='text-green-400'>generating...</span></>  : ""}</p>
    </div>
    <div className='max-w-sm mx-right mt-8 flex-1 p-3 bg-white rounded-md'>
     {show && <RandomGraph data={data}/>}
     {error && <p className='text-green-300'>Couldn &apos;t generate the graph </p>}
    </div>
    </div>

  );
      }

export default GraphInfo;
