import { Routes, Route } from 'react-router-dom'

import ExcelRandomPoints from './pages/ExcelRandomPoints'
import FieldRandomPoints from './pages/FieldRandomPoints'

import Form from './components/Form'

import Canvas from './components/Canvas'

function App() {

	return (
		<>
			<div className="text-center justify-center flex flex-col max-w-4xl mx-auto pt-4">

				<Routes>
					<Route path="/" element={<Form />} />

					<Route path="/excel_random_points" element={<ExcelRandomPoints />} />
					<Route path="/field_random_points" element={<FieldRandomPoints />} />
				</Routes>
				<Canvas />
			</div>
		</>
	)
}

export default App
