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
  const handleButtonClick =  async (e) => {
    e.preventDefault()
    setGenerating(true);
   
    try {
      let response=null;
      if(selectedOption==='fieldrp'){
      response = await axios.post('https://100022.pythonanywhere.com/fieldrp/', 
        {
          side: Number(side),
          selection:Number(selection),
          choice:Number(choice),
          value: Number(value)
        });
      } else{
        response = await axios.post('https://100022.pythonanywhere.com/excelrp/', 
        {
          side: Number(side),
          selection: Number(selection),
          
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
    <div className='flex justify-evenly flex-col w-full items-center m-auto'>
      
      <div className="flex flex-col items-center mt-8 pb-2 w-full h-fit">
        {/* <h2 className="text-xl text-[#005734] font-semibold mb-4">Graph Information</h2> */}
        
        <div className='flex justify-center p-2 items-center gap-4 mb-2 mt-1'>
          <label>
            <input type="radio" className={`border-none outline-none `}
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


        <form onSubmit={handleButtonClick}>
          <div className="form-group">
            <div className='flex p-2 gap-3 h-fit items-center sm:flex-col md:flex-row'>
              <div>
                <label className="block text-sm font-medium text-gray-600">Side:
                <input
                  type="number"
                  className="mt-1 p-1 border rounded-md w-full  border-gray-300 flex mb-3 bg-gray-50 focus:outline-none text-gray-900 focus:border-[#005734]"
                  value={side}
                  onChange={(e) => setSide(e.target.value)}
                />
                </label>
              </div>

              <label className=" text-sm font-medium text-gray-600">Selection:
              <input
                type="number"
                className="mt-1 p-1 border w-full rounded-md border-gray-300 flex mb-3 bg-gray-50 focus:outline-none text-gray-900 focus:border-[#005734]"
                value={selection}
                onChange={(e) => setSelection(e.target.value)}
              />
              </label>


              {selectedOption !== 'exelrp' && 
                <>
                  <label className="block text-sm font-medium text-gray-600">Choice:
                  <input
                    type="number"
                    className="mt-1 p-1 border rounded-md w-full  border-gray-300 flex mb-3 bg-gray-50 focus:outline-none text-gray-900 focus:border-[#005734]"
                    value={choice}
                    onChange={(e) => setChoice(e.target.value)}
                  />
                  </label>
                </>
              }

              {selectedOption !== 'exelrp' &&(<div>
                <label className="block text-sm font-medium text-gray-600">Value:
                <input
                  type="number"
                  className="mt-1 p-1 border rounded-md w-full border-gray-300 flex mb-3 bg-gray-50 focus:outline-none text-gray-900 focus:border-[#005734]"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
                </label>
              </div>)}
            </div>
            <div className='flex justify-center items-center'>
              <button
                className="bg-green-700 hover:bg-green-600 text-white px-4 py-2 rounded-md mt-2 w-auto"
                type='submit'
              >
                Generate Random Graph
              </button>
            </div>
          </div>
        </form>
    

        <p>{generating ?  <><Spinner/> <span className='text-green-400'>generating...</span></>  : ""}</p>
      </div>
     
      <div className='mx-right w-full flex-1 p-2'>
        {show && <RandomGraph data={data}/>}
        {error ? <p className='text-green-300'>Couldn &apos;t generate the graph </p>:''}
      </div>
  </div>

  );
      }

export default GraphInfo;
