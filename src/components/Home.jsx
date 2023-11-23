import axios from "axios";
import { useState } from "react";
import DynamicForm from "./DynamicForm";
import { toast } from "react-toastify";
import { FaFileExcel } from "react-icons/fa";
import { v4 as uuidv4 } from 'uuid';
import FileUpload from "./Upload";
import Accordion from "./accordion";
import Spinner from "./spinner";

const Home = () => {
  const [formData, setFormData] = useState();
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [loadingDownload, setLoadingDownload] = useState(false);
  const [link, setLink] = useState({});
  const [linksUrl,setLinksUrl]=useState([]);
  //const [showDelete,setShowDelete]=useState(null);
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
      console.log("formData", formData)
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
  const handleInputLinks = (event) => {
   
    if(event.target.value[event.target.value.length-1]===" " && link.item.trim()!==''){
     
      setLinksUrl([...linksUrl,link]);
      setLink({});
      event.target.value="";
     
     
   } else{
    setLink({id:`${uuidv4()}`,item:event.target.value});
  
   }   
  };

const handleDeleteLink=(itemId)=>{
  setLinksUrl(linksUrl.filter(({id})=>id!==itemId));
}

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
          <div tabIndex={0} className="flex-grow focus:outline-none w-full mb-4 border p-2.5 rounded-md  focus:border-green-400 focus-within:border-green-300 border-black">
           
            {linksUrl.map(({item,id})=>(
              <button key={id} onClick={()=>handleDeleteLink(id)}
             
            // onMouseEnter={()=>setShowDelete(id)} 
            // onMouseLeave={()=>setShowDelete(null)} 
             className="border border-0.15 rounded-md p-1 hover:bg-green-500 text-white bg-green-400 mr-1">{item}{ (<small className="text-red-500 text-md m-2 mr-0.5 rounded-full bg-green-200 p-0.5 px-2 font-semibold" >X</small>)}</button>
            ))}
            <input
              id="my-input"
              onChange={handleInputLinks}
              placeholder="Enter the Website Url or Link Here"
              className="border-none focus:border-none focus:outline-none"
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
