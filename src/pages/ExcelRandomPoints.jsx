const ExcelRandomPoints = () => {
	return (
		<>
			<table className="p-5 m-5">
				<tbody>
					<tr>
						<td>
							<h1 className="text-2xl font-semibold py-4 text-justify ">Excel Random Points</h1>
						</td>
					</tr>

					<tr>
						<td className="text-justify">Enter Side</td>
						<td>
							<input className="form-control" type="text" name="side" />
						</td>
					</tr>

					<tr>
						<td className="text-justify">
							<p>
								For Sequential/Ordered Selection, <br /> Enter "0"
								For Random Selection, <br />Enter the Column for First Point
							</p>
						</td>
						<td>
							<input className="form-control" type="text" name="selection" />
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

export default ExcelRandomPoints;