import { useEffect, useRef, useState } from 'react';
import Canvas from '../components/Canvas'
import Chart from '../components/Canvas';
import styled from 'styled-components';

// Creating a styled component
export const Button = styled.button`
  display: inline-block;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  background-color: #4CAF50;
  color: #FFFFFF;
  border-radius: 4px;
  border: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }

  &:focus {
    outline: none;
  }

  &:active {
    background-color: #3e8e41;
  }
`;
const FieldRandomPoints = () => {
const [t,setT] = useState(false)
const side=useRef();
const selection=useRef();
const choice= useRef();
const value= useRef();
const [data,setData]=useState([])
const handleSubmit = (e) => {
e.preventDefault();
console.log("ss")
const cho=choice.current.value
const sel= selection.current.value
const sid= side.current.value
const val = value.current.value

if (!sid || !sel || !val || !cho)
alert("All Fields are mandatory!")
else
setT(true)
}
useEffect(()=>{
if(data)
console.log(data)
},[data])
	return (
		<>
			<table className="p-5 m-5" onSubmit={handleSubmit}>
				<tbody>
					<tr>
						<td>
							<h2 className="text-2xl py-4 font-semibold text-justify">Field Random Points</h2>
						</td>
					</tr>

					<tr className="my-2">
						<td className="text-justify">Enter Side</td>
						<td>
							<input type="number" name="side" ref={side} className="form-control" />
						</td>
					</tr>
					<tr>
						<td className="text-justify">What do you want to Enter?</td>
						<td>
							<select ref={choice} className="form-select" name="choice">
								<option  value="0"> Number of Points </option>
								<option value="1"> Radius </option>
							</select>
						</td>
					</tr>

					<tr>
						<td className="text-justify">Enter Radius or N</td>
						<td>
							<input className="form-control" type="number" name="value" ref={value} />
						</td>
					</tr>

					<tr>
						<td className="text-justify">Select Starting Point</td>
						<td>
							<select className="form-select" name="selection" ref={selection}>
								<option value="1">1. Start from center </option>
								<option value="2">2. Start from top left </option>
								<option value="3">3. Start from extreme left </option>
								<option value="4">4. Start from bottom left </option>
								<option value="5">5. Start from the bottom </option>
								<option value="6">6. Start from bottom right </option>
								<option value="7">7. Start from extreme right </option>
								<option value="8">8. Start from top right </option>
								<option value="9">9. Start from the top</option>
							</select>
						</td>
					</tr>

					<tr>
						<td className="flex justify-start">
							<Button 
							onClick={handleSubmit}>Submit</Button>
							{/* <input type="submit" className="form-submit my-4" /> */}
						</td>
					</tr>
				</tbody>
			</table>
			{/* {!data ? 
		<h2>loading...</h2>	: */}
		{t && 
		<Canvas side={side.current.value} selection={selection.current.value} choice={choice.current.value} value={value.current.value} />}
		{/* } */}
			
			
		</>
	)
}

export default FieldRandomPoints;