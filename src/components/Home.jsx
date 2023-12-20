import GraphInfo from "./GraphInfo";

const Home = () => {
  return (
    <div className="page-container">
      <div className="mx-auto overflow-hidden max-w-[800px]">
        {/* Logo */}
        <div className="flex justify-center my-4">
          <img
            src="https://www.uxlivinglab.org/wp-content/uploads/2023/10/image_1-3.png"
            className="flex justify-center"
            alt="Dowell Logo"
          />
        </div>

        <hr className="col-md-10 pb-3"/>

        {/* Email Extractor Title */}
        <h1 className="text-center text-3xl font-bold text-[#005734]" >
          {" "}
          DoWell &quot;Random Graph&quot; Generator{" "}
        </h1>
        <GraphInfo/>
      </div>
      
      </div>
  );
};

export default Home;
