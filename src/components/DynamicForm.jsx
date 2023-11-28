/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const DynamicForm = ({ formData, webUrl }) => {
  const [formValues, setFormValues] = useState({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Set the form value directly
    const updatedFormValues = {
      ...formValues,
      [name]: value,
      form_index: formData?.form_index,
    };

    setFormValues(updatedFormValues);
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Form val", formValues);
    console.log("Form data", formData);

    // Prepare the data to send
    const dataToSend = {
      page_links: webUrl,
      form_data: [formValues],
    };

    // Send the data to the API using Axios
    setLoading(true);
    axios
      .post("https://www.uxlive.me/api/submit-contact-form/", dataToSend)
      .then((response) => {
        setLoading(false);
        toast.success(JSON.stringify(response?.data?.success));
        console.log("Form data submitted successfully.");
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error ? error?.response?.data?.error : error?.message);
        console.error("Form data submission failed:", error);
      });
  };

  return (
    <section className="container">
      <div className="container mx-auto">
            <form onSubmit={handleSubmit} className="space-y-8">
              {formData &&
                Object?.keys(formData)?.map((fieldName, index) =>
                  fieldName !== "submit" ? (
                    <div key={index}>
                      {formData[fieldName] !== "hidden" &&
                        fieldName !== "form_index" && (
                          <label
                            htmlFor={fieldName}
                            className="block mb-1 font-medium text-dark-600"
                          >
                            {fieldName}
                          </label>
                        )}

                      {fieldName === "form_index" ? (
                        <input
                          type="hidden"
                          name={fieldName}
                          value={formData[fieldName]}
                        />
                      ) : formData[fieldName] === "textarea" ? (
                        <textarea
                          id="message"
                          rows="3"
                          className="block p-3 w-full text-lg text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:outline-[#005734]"
                          placeholder="Leave Your Message Here."
                        ></textarea>
                      ) : (
                        <input
                          type={formData[fieldName]}
                          id="text"
                          name={fieldName}
                          value={formValues[fieldName] || ""}
                          onChange={handleInputChange}
                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-[#005734] w-full p-2.5"
                          placeholder={`Enter ${fieldName}`}
                          required
                        />
                      )}
                    </div>
                  ) : null
                )}

              <button
                type="submit"
                className="bg-green-700 hover:bg-green-600 text-white font-bold py-2 px-4 rounded flex items-center"
                disabled={loading}
              >
                {loading ? "Submitting Form..." : "Submit"}
              </button>
            </form>
      </div>
    </section>
  );
};

export default DynamicForm;
