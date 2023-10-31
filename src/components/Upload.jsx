import React from "react";

const Upload = () => {

  return (

    <div className="w-full h-full bg-slate-100">   
    <div className="container mx-auto    bg-white max-w-[800px]">
      <label
        class="block mb-4 font-bold  ml-3 text-xl text-gray-900 dark:text-white"
        for="file_input"
      >
        Upload file
      </label>
      <input
        class="block w-full text-sm text-black font-bold border border-gray-300 rounded-lg cursor-pointer bg-gray-100 "
        id="file_input"
        type="file"
      />
    </div>
    
    </div>
  );
};

export default Upload;
