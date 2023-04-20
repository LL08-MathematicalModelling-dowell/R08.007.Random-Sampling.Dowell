const FieldRandomPoints = () => {
	return (
		<>
			<table className="p-5 m-5">
				<tbody>
					<tr>
						<td>
							<h2 className="text-2xl py-4 font-semibold text-justify">Field Random Points</h2>
						</td>
					</tr>

					<tr className="my-2">
						<td className="text-justify">Enter Side</td>
						<td>
							<input type="text" name="side" className="form-control" />
						</td>
					</tr>
					<tr>
						<td className="text-justify">What do you want to Enter?</td>
						<td>
							<select className="form-select" name="choice">
								<option value="0"> Number of Points </option>
								<option value="1"> Radius </option>
							</select>
						</td>
					</tr>

					<tr>
						<td className="text-justify">Enter Radius or N</td>
						<td>
							<input className="form-control" type="text" name="value" />
						</td>
					</tr>

					<tr>
						<td className="text-justify">Select Starting Point</td>
						<td>
							<select className="form-select" name="selection">
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
							<input type="submit" className="form-submit my-4" />
						</td>
					</tr>
				</tbody>
			</table>
		</>
	)
}

export default FieldRandomPoints;