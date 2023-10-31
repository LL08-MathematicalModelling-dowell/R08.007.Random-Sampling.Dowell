import React from "react";

const DynamicForm = () => {
  return (
    <section class="w-full  h-full bg-slate-100">
      <div class=" mx-auto py-16 bg-white max-w-[800px]">
        <form action="#" class="space-y-8">

          <div>
            <label
              for="text"
              class="block ml-3  mb-3 text-lg font-medium text-gray-900 dark:text-gray-300"
            >
              Title
            </label>

            <input
              type="text"
              id="text"
              class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
              placeholder="Enter Title Here "
              required
            />

          </div>

          <div class="sm:col-span-2">
            <label
              for="message"
              class="block ml-3 mb-3 text-lg font-medium text-gray-900 dark:text-gray-400 "
            >
              Enter Your message Here
            </label>
            <textarea
              id="message"
              rows="3"
              class="block p-3   w-full text-lg text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Leave Your Message Here."
            ></textarea>
          </div>

          <div>
            <label
              for="email"
              class="block ml-3 mb-3 text-lg font-medium text-gray-900 dark:text-gray-300"
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
              placeholder="Enter Your Email Here"
              required
            />
          </div>

          <button
            type="submit"
            class="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Send message
          </button>
        </form>
      </div>
    </section>
  );
};

export default DynamicForm;
