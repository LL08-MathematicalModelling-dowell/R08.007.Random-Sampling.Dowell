import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const DynamicForm = ({ formData, webUrl }) => {
  const [formValues, setFormValues] = useState({});
  const [submissionStatus, setSubmissionStatus] = useState(false);
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

    console.log("Foem val", formValues);
    console.log("Foem data", formData);
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
        setSubmissionStatus(true);
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error ? error?.response?.data?.error : error?.message);
        console.error("Form data submission failed:", error);
        setSubmissionStatus(false);
      });
  };

  // if (!formData) {
  //   return null;
  // }

  return (
    <section class="w-full  h-full bg-slate-100">
      <div class=" mx-auto py-16 bg-white max-w-[800px]">
        <form onSubmit={handleSubmit} class="space-y-8">
          {Object?.keys(formData)?.map(
            (fieldName, index) =>
              fieldName !== "submit" && (
                <div key={index}>
                  {formData[fieldName] !== "hidden" &&
                    fieldName !== "form_index" && (
                      <label
                        for="{fieldName}"
                        class="block ml-3  mb-3 text-lg font-medium text-gray-900 dark:text-gray-300"
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
                      class="block p-3   w-full text-lg text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Leave Your Message Here."
                    ></textarea>
                  ) : (
                    <input
                      type="formData[fieldName]"
                      id="text"
                      name={fieldName}
                      value={formValues[fieldName] || ""}
                      onChange={handleInputChange}
                      class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                      placeholder={`Enter ${fieldName}`}
                      required
                    />
                  )}
                </div>
              )
          )}

          <button
            type="submit"
            class="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
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

// <div>
// <label
//   for="text"
//   class="block ml-3  mb-3 text-lg font-medium text-gray-900 dark:text-gray-300"
// >
//   Title
// </label>

// <input
//   type="text"
//   id="text"
//   class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
//   placeholder="Enter Title Here "
//   required
// />
// </div>

// <div class="sm:col-span-2">
// <label
//   for="message"
//   class="block ml-3 mb-3 text-lg font-medium text-gray-900 dark:text-gray-400 "
// >
//   Enter Your message Here
// </label>
// <textarea
//   id="message"
//   rows="3"
//   class="block p-3   w-full text-lg text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
//   placeholder="Leave Your Message Here."
// ></textarea>
// </div>

// <div>
// <label
//   for="email"
//   class="block ml-3 mb-3 text-lg font-medium text-gray-900 dark:text-gray-300"
// >
//   Your email
// </label>
// <input
//   type="email"
//   id="email"
//   class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
//   placeholder="Enter Your Email Here"
//   required
// />
// </div>
