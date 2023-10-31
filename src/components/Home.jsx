import axios from "axios";
import { useState } from "react";
import DynamicForm from "./DynamicForm";
import { toast } from "react-toastify";
import { FaFileExcel } from "react-icons/fa";
import FileUpload from "./Upload";
import Accordion from "./accordion";
import Spinner from "./spinner";

const Home = () => {
  const [formData, setFormData] = useState();
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [loadingDownload, setLoadingDownload] = useState(false);
  const [link, setLink] = useState("");

  const handleScrapeForm = async () => {
    try {
      setLoadingCreate(true);
      const response = await axios.post(
        `https://www.uxlive.me/api/contact-us-extractor/`,
        {
          page_link: link,
        }
      );

      setFormData(response?.data);
      setLoadingCreate(false);
    } catch (error) {
      setLoadingCreate(false);
      console.log(error);
      if (error?.response?.data?.page_link) {
        toast.error("Enter a valid URL");
      } else {
        toast.error(error?.message);
      }
    }
  };

  const handleDownLoadFile = async () => {
    try {
      setLoadingDownload(true);
      const response = await axios.get(
        `https://www.uxlive.me/api/download-csv/?web_url=${link}&file_type=xlsx`,
        { responseType: "blob" }
      );

      // Extract the filename from the Content-Disposition header
      // const contentDisposition = response.headers["content-disposition"];

      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "filename.xlsx"; // Use the extracted filename
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);

      toast.success("File downloaded successfully");
      setLoadingDownload(false);
    } catch (error) {
      setLoadingDownload(false);
      console.log(error);
      if (error?.response?.data?.error) {
        toast.error(error?.response?.data?.error);
      } else {
        toast.error(error?.message);
      }
    }
  };

  return (
    <div className="ml-2 mr-2 h-full bg-slate-100 bg-white bg-slate-100">
      <div className="mx-auto overflow-hidden max-w-[800px]">
        {/* Logo */}
        <div className="flex justify-center my-4">
          <img
            src="https://www.uxlivinglab.org/wp-content/uploads/2023/10/image_1-3.png"
            className="flex justify-center"
            alt="Dowell Logo"
          />
        </div>

        {/* Email Extractor Title */}
        <div className="text-center font-bold text-[#005734] text-5xl">
          {" "}
          Dowell Contact Us Form Extractor{" "}
        </div>

        {/*  About Email Extractor */}
        <div className="mt-5 mb-3">
          <p>
            Introducing the ultimate form extraction and submission tool. Extract
            forms from any webpage instantly. Fill them out directly or download
            as Excel for offline editing. Effortlessly submit forms at their
            original location. Simplify your form interaction today !
          </p>
        </div>

        {/* Link Form and 2 Buttons */}
        <div className="flex flex-col items-center mt-4">
          <div className="flex-grow w-full mb-4">
            <input
              id="my-input"
              onChange={(e) => setLink(e.target.value)}
              placeholder="Enter the Website Url or Link Here"
              className="border block w-full p-2.5 border-black rounded-md focus:outline-none focus:green-500 focus:border-green-500"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleScrapeForm}
              disabled={!link || loadingCreate}
              className="bg-green-700 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            >
              {!link ? "Enter Web Url" : loadingCreate ? "Scraping Forms..." : "Scrap Form"}
            </button>

            <button
              onClick={handleDownLoadFile}
              disabled={!link || loadingDownload}
              className="bg-green-700 hover:bg-green-600 text-white font-bold py-2 px-4 rounded flex items-center"
            >
              <FaFileExcel /> 
              <p>{!link ? "Download Excel" : loadingDownload ? 
              <Spinner /> : "Download Excel"}</p>
              
            </button>
          </div>
        </div>

      </div>

      {/* Additional section */}
      {loadingCreate ? (
        <div className="text-center mt-5">
          <div className="inline-block h-8 w-8 animate-spin rounded-full text-[#005734] border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
          </div>
        </div>
      
      ) : formData && (
          
          <div className="container mx-auto overflow-hidden max-w-[800px]">
            <Accordion formData={formData}>
            {Array.isArray(formData) ? (
              formData.map((data, index) => (
                <div key={index}>
                  <DynamicForm formData={data} webUrl={link} />
                </div>
              ))
            ) : (
              <div>
                  <DynamicForm formData={formData} webUrl={link} />
              </div>
            )}
            </Accordion>
          </div>

        )}
       

      <FileUpload url={link} />
    </div>
  );
};

export default Home;
