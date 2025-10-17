import React from "react";

const Card = ({data}) => {
  return (
    <div className="w-full sm:w-72 md:w-80 lg:w-96 flex flex-col rounded-xl overflow-hidden bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
      {/* Image Box */}
      <div className="h-44 w-full overflow-hidden">
        <img
          // src="https://images.pexels.com/photos/15721596/pexels-photo-15721596.jpeg"
          src={data.image}
          alt="blog"
          className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Content Box */}
      <div className="flex flex-col gap-2 px-4 py-3">
        {/* Category Tag */}
        <span className="inline-block bg-blue-100 text-blue-600 font-semibold text-xs px-3 py-1 rounded-full w-fit">
          {data.category}
        </span>

        {/* Title */}
        <h3 className="font-bold text-gray-900 text-base md:text-lg tracking-tight line-clamp-2 leading-snug">
          {data.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm md:text-[15px] tracking-tight line-clamp-3 leading-relaxed">
          {data.description}
        </p>
      </div>
    </div>
  );
};

export default Card;
