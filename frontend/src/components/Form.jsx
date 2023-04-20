import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Form = () => {
	const navigate = useNavigate()
	const [selectedValue, setSelectedValue] = useState("field_random_points")

	const handleSelectChange = (event) => {
		setSelectedValue(event.target.value)
	}

	const handleSubmit = (event) => {
		event.preventDefault()
		navigate(`/${selectedValue}`)
	}

	return (
		<>
			<h1 className="text-3xl font-semibold pt-4 pb-2 text-center">Choose Function Type</h1>
			<form className="px-2 justify-center flex" onSubmit={handleSubmit}>
				<table>
					<tbody>
						<tr className="gap-2 flex items-center">
							<td>
								<select
									name="type" id=""
									className="form-select"
									value={selectedValue}
									onChange={handleSelectChange}
								>
									<option value="field_random_points">Field Random Points Program</option>
									<option value="excel_random_points">Excel Random Points Program</option>
								</select>
							</td>

							<td>
								<input
									type="submit"
									value="Submit"
									className="form-submit"
								/>
							</td>
						</tr>
					</tbody>
				</table>
			</form>
		</>
	)
}

export default Form;
