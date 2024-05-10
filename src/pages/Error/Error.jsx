import React from "react";
import { Link } from "react-router-dom";
import error from '../../assets/404.svg'

const Error = () => {
  return (
    <div className="flex items-center justify-center md:my-16">
      <section className="flex items-center h-full sm:p-16 dark:bg-gray-50 dark:text-gray-800">
        <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8 space-y-8 text-center sm:max-w-md">
          <img src={error} alt="404 error" />
          <p className="text-2xl md:text-3xl text-nowrap font-semibold">
            Sorry, we couldn't find this page.
          </p>
          <p className="text-lg text-gray-500">
            But don't worry, you can find plenty of other things on our
            homepage.
          </p>
          <Link
            to={"/"}
            rel="noopener noreferrer"
            href="#"
            className="px-8 py-3 font-semibold rounded 
            bg-violet-500
            text-white
            dark:bg-violet-600 dark:text-gray-50"
          >
            Back to homepage
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Error;
