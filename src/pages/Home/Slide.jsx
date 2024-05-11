import { Link } from "react-router-dom";

const Slide = ({ image, text }) => {
  return (
    <div
      className="w-full bg-center bg-cover bg-no-repeat md:h-[40rem] h-[15rem]"
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      <div className="flex items-center justify-center w-full h-full bg-gray-900/70">
        <div className="text-center">
          <h1 className="md:text-3xl font-semibold text-white lg:text-4xl">
            {text}
          </h1>
          <br />
          <Link
            to={"/"}
            className="btn  border-blue-400 bg-blue-400 text-white hover:btn-outline hover:border-none text-lg font-semibold"
          >
            Become a Donator
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Slide;
