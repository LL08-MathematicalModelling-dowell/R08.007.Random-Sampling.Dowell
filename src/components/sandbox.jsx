import axios from "axios";
import { useState } from "react";
import DynamicForm from "./DynamicForm";
import { toast } from "react-toastify";
import { FaFileExcel } from "react-icons/fa";
import FileUpload from "./Upload";

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
          page_link: link
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
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
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
    <div className="container pt-5 mb-3">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h1 className="d-flex mb-3 justify-content-center align-items-center">
            Welcome To Contact Us Api
          </h1>

          <div className="input-group col-md-8">
            <input
              type="text"
              onChange={(e) => setLink(e.target.value)}
              className="form-control"
              placeholder="Enter Web Url"
            />
            <div className="input-group-append">
              <button
                className="btn btn-primary ml-2"
                onClick={handleScrapeForm}
                disabled={!link || loadingCreate}
              >
                {!link
                  ? "Enter Web Url"
                  : loadingCreate
                  ? "Scraping Forms..."
                  : "Scrap Form"}
              </button>
            </div>

            <button
              onClick={handleDownLoadFile}
              disabled={!link || loadingDownload}
            >
              <FaFileExcel />
              {!link ? "" : loadingDownload ? "Downloading" : ""}
            </button>
          </div>
        </div>
      </div>

      {/* ///////////////////////// */}

      {loadingCreate ? (
        <div className="d-flex mt-3 justify-content-center align-items-center">
          <div className="spinner-border" role="status"></div>
        </div>
      ) : (
        <div className="container">
          {Array.isArray(formData) ? (
            formData.map((data, index) => (
              <div key={index} className="row justify-content-center">
                <div className="col-md-6">
                  <DynamicForm formData={data} webUrl={link} />
                </div>
              </div>
            ))
          ) : (
            <div className="row justify-content-center">
              <div className="col-md-6">
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


