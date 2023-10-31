import React from "react";
import PageRouter from "./components/PageRouter";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <PageRouter />
    </>
  );
};

export default App;



// import React from "react";
// import ContactUs from "./components/ExtractorForm";
// import DynamicForm from "./components/DynamicForm";
// import Upload from "./components/Upload";
// import Home from "./components/Home";

// const App = () => {
//   return (
//     <>
//     {/* <ContactUs/>
//     <Upload/> */}
//     {/* <DynamicForm/> */}
//     <Home/>
    
//     </>
//   );
// };

// export default App;
