import { useState } from 'react';
import RandomGraph from './RandomGraph';
import axios from 'axios';
import Spinner from './spinner';
//import Charts from './Chart';

//import useGoogleCharts from './useGoogleCharts';
const GraphInfo = () => {
  //const google=useGoogleCharts();
  const [side, setSide] = useState(100);
  const [choice, setChoice] = useState(0);
  const [value, setValue] = useState(10);
  const [selection, setSelection] = useState(5);
  const [show, setShow] = useState(false);
  const [generating,setGenerating]=useState(false);
  const [data, setData] = useState(null);
  const [error,setError]=useState(false);
  const [selectedOption, setSelectedOption] = useState('fieldrp');
  // console.log("data=",data)
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
      setGenerating(false);
      setData(response.data);
      console.log("Hello", response.data.input_data.side )
      setShow(true);
    } catch (error) {
      setError(true);
      setGenerating(false);
    }
  };

  return (
      <div className='flex flex-col md:flex-row'>
        {/* image */}
        <div className="my-4 md:fixed md:p-2 md:h-full bg-white">
          
          <div className="flex justify-center items-center">
            <img
              src="https://www.uxlivinglab.org/wp-content/uploads/2023/10/image_1-3.png"
              className=""
              alt="Dowell Logo"
              style={{height: "auto", width: "100px", alignSelf: "center"}}
            />
          </div>
        

          <div className="flex justify-center text-center font-bold text-[#005734]">
            DoWell &quot;Random Graph&quot; Generator{" "}
          </div>

          <div className='flex justify-evenly flex-col m-auto'>
            <div className="flex flex-col mt-1 mb-2 w-full md:w-64 h-fit">
              {/* <h2 className="text-xl text-[#005734] font-semibold mb-4">Graph Information</h2> */}
              
              <div className='flex justify-center p-2 items-center mb-2 gap-4 mt-1'>
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
                  <div className='flex flex-row p-2 gap-3 h-fit md:flex-col'>
                    <label className="block text-sm font-medium text-gray-600">Side:
                    <input
                      type="number"
                      className="mt-1 p-1 border rounded-md w-full  border-gray-300 flex mb-3 bg-gray-50 focus:outline-none text-gray-900 focus:border-[#005734]"
                      value={side}
                      onChange={(e) => setSide(e.target.value)}
                    />
                    </label>

                    <label className=" text-sm font-medium text-gray-600">Selection:
                    <input
                      type="number"
                      className="mt-1 p-1 border w-full rounded-md border-gray-300 flex mb-3 bg-gray-50 focus:outline-none text-gray-900 focus:border-[#005734]"
                      value={selection}
                      onChange={(e) => setSelection(e.target.value)}
                    />
                    </label>

                    {selectedOption !== 'exelrp' && 
                    // (<div className="mb-4">
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

                    {selectedOption !== 'exelrp' &&(<>
                      <label className="block text-sm font-medium text-gray-600">Value:
                      <input
                        type="number"
                        className="mt-1 p-1 border rounded-md w-full border-gray-300 flex mb-3 bg-gray-50 focus:outline-none text-gray-900 focus:border-[#005734]"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                      />
                      </label>
                    </>)}
                  </div>
                    
                    <button
                      className="bg-green-700 flex justify-center hover:bg-green-600 mx-auto text-white px-4 py-2  rounded-md w-auto"
                      type='submit'
                    >
                      Generate Random Graph
                    </button>
                
              </div>
            </form>
            <p>{generating ? <><Spinner/> <span className='text-green-400'>generating...</span></>  : ""}</p>
          
          </div>
          
        </div>
      </div>

      <div className='flex justify-center h-screen w-full mt-3 flex-1 pl-10 bg-white rounded-md md:ml-64'>
        {show &&<RandomGraph data={data}/>  }
        {error ? <p className='text-green-300'>Couldn &apos;t generate the graph </p>:''}
      </div>

    </div>

  );
}

export default GraphInfo;
