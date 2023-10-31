import React from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import DynamicForm from "./DynamicForm";
import { toast } from "react-toastify";
import { FaFileExcel } from "react-icons/fa";
import FileUpload from "./Upload";

const Home = () => {
  const [userInfo, setUserInfo] = useState();
  const [params, setSearchParams] = useSearchParams();
  const session_id = params.get("session_id");
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
      const contentDisposition = response.headers["content-disposition"];

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
    <div className="w-full h-full bg-slate-100">
      <div className="container mx-auto  overflow-hidden  bg-white max-w-[800px] ">
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
          Dowell Email Extractor{" "}
        </div>

        {/*  About Email Extractor */}
        <div className="mx-auto my-6  max-w-[700px]">
          Introducing the ultimate form extraction and submission tool. Extract
          forms from any webpage instantly. Fill them out directly or download
          as Excel for offline editing. Effortlessly submit forms at their
          original location. Simplify your form interaction today !
        </div>

        {/* Link Form and 2 Buttons */}
        <div className="flex justify-around my-10">
          <div className="flex-grow ml-6">
            <input
              id="my-input"
              onChange={(e) => setLink(e.target.value)}
              placeholder="Enter the Website Url or Link Here"
              className="border block w-full p-2.5 border-black rounded-md focus:outline-none focus:green-500 focus:border-green-500"
            />
          </div>

          <div className="mx-2">
            <button
              onClick={handleScrapeForm}
              disabled={!link || loadingCreate}
              className="bg-blue-700 px-3 py-2 text-white rounded-lg mr-2"
            >
              {!link
                ? "Enter Web Url"
                : loadingCreate
                ? "Scraping Forms..."
                : "Scrap Form"}
            </button>

            <button
              onClick={handleDownLoadFile}
              disabled={!link || loadingDownload}
              className="bg-green-700 px-3 py-2 text-white rounded-lg"
            >
              <FaFileExcel />
              {!link ? "" : loadingDownload ? "Downloading" : ""}
            </button>
          </div>
        </div>
      </div>

      {/* Additional section */}
      {loadingCreate ? (
        <div className="">
          Loading ... 
        </div>
      ) : (
        <div className="container">
          {Array.isArray(formData) ? (
            formData.map((data, index) => (
              <div key={index} className="flex flex-row justify-center">
                <div >
                  <DynamicForm formData={data} webUrl={link} />
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-row justify-center">
              <div >
                <DynamicForm formData={formData} webUrl={link} />
              </div>
            </div>
          )}
        </div>
      )}

      <FileUpload url={link} />
    </div>
  );
};

export default Home;
