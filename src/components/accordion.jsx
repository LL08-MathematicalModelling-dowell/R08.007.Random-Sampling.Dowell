/* eslint-disable react/prop-types */

import { useState } from "react"

const Accordion = ({children}) => {
    const [isAccordionOpen, setIsAccordionOpen] = useState(false);
    const toggleAccordion = () => {
        setIsAccordionOpen(!isAccordionOpen);
    };

    return (
        <div className="rounded-t-lg bg-white mt-3">
          <h2 className="mb-0" id="headingOne">
            <button
              className="group relative flex w-full items-center rounded-t-[15px] border-0 text-white px-5 py-4 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none [&:not([data-te-collapse-collapsed])]:text-primary [&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(229,231,235)] bg-[#005734]"
              type="button"
              onClick={toggleAccordion}
              aria-expanded={isAccordionOpen}
              aria-controls="collapseOne"
            >
            {/* {formData?.length ? formData.length : "1"}  */}
             Show Form
              <span className="ml-auto h-5 w-5 shrink-0 rotate-[-180deg] fill-[#005734] transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:rotate-0 group-[[data-te-collapse-collapsed]]:fill-[#212529] motion-reduce:transition-none dark:fill-blue-300 dark:group-[[data-te-collapse-collapsed]]:fill-white">
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
            {children}
          </div>
        </div>
  )
}

export default Accordion