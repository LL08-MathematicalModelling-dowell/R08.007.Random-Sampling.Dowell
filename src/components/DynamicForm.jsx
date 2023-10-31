/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const DynamicForm = ({ formData, webUrl }) => {
  const [formValues, setFormValues] = useState({});
  const [loading, setLoading] = useState(false);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

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

  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Form val", formValues);
    console.log("Form data", formData);

    // Prepare the data to send
    const dataToSend = {
      page_link: webUrl,
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
      <div className="container mx-auto py-5">
        <div className="rounded-t-lg border border-neutral-200 bg-white">
          <h2 className="mb-0" id="headingOne">
            <button
              className="group relative flex w-full items-center rounded-t-[15px] border-0 bg-white px-5 py-4 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white [&:not([data-te-collapse-collapsed])]:bg-white [&:not([data-te-collapse-collapsed])]:text-primary [&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:[&:not([data-te-collapse-collapsed])]:bg-neutral-800 dark:[&:not([data-te-collapse-collapsed])]:text-primary-400 dark:[&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]"
              type="button"
              onClick={toggleAccordion}
              aria-expanded={isAccordionOpen}
              aria-controls="collapseOne"
            >
              {formData.length} Form(s)
              <span className="ml-auto h-5 w-5 shrink-0 rotate-[-180deg] fill-[#336dec] transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:rotate-0 group-[[data-te-collapse-collapsed]]:fill-[#212529] motion-reduce:transition-none dark:fill-blue-300 dark:group-[[data-te-collapse-collapsed]]:fill-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </span>
            </button>
          </h2>
          <div
            id="collapseOne"
            className={`px-5 py-4 ${isAccordionOpen ? "" : "!hidden"}`}
            data-te-collapse-item
            data-te-collapse-show
            aria-labelledby="headingOne"
            data-te-parent="#accordionExample"
          >
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
                          className="block p-3 w-full text-lg text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                          placeholder="Leave Your Message Here."
                        ></textarea>
                      ) : (
                        <input
                          type={formData[fieldName]}
                          id="text"
                          name={fieldName}
                          value={formValues[fieldName] || ""}
                          onChange={handleInputChange}
                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 w-full p-2.5"
                          placeholder={`Enter ${fieldName}`}
                          required
                        />
                      )}
                    </div>
                  ) : null
                )}

              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                disabled={loading}
              >
                {loading ? "Submitting Form..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DynamicForm;
