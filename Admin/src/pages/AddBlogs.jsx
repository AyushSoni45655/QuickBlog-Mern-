

import React, { useContext, } from 'react';
import { assets, blogCategories } from '../assets/assets';
import { AppContext } from '../Contexts/Context';

const AddBlogs = () => {
  
  const {handlerAddBlogSubmitter,handleRemoveImage,setAddBlogData,handlerAddBlogOnChange,addBlogData} = useContext(AppContext)

  return (
    <div className="w-full h-fit md:p-6 p-2">
      <form
        onSubmit={handlerAddBlogSubmitter}
        className="flex flex-col gap-6 p-4 w-full max-w-3xl mx-auto bg-gray-200 rounded-lg shadow-md"
      >
        {/* Image Upload */}
        <label
          htmlFor="image"
          className="h-24 w-28 cursor-pointer flex items-center justify-center border-2 border-dashed border-gray-400 rounded-md hover:border-blue-400 transition"
        >
          <img
            src={addBlogData.image || assets.upload_area}
            className="h-20 w-24 object-cover object-center rounded-md"
            alt="upload area"
          />
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            hidden
            onChange={handlerAddBlogOnChange}
          />
        </label>

        {/* Remove Image Button */}
        {addBlogData.image && (
          <button
            type="button"
            className="text-sm text-red-500 font-semibold underline w-fit"
            onClick={handleRemoveImage}
          >
            Remove Image
          </button>
        )}

        {/* Title */}
        <div className="flex flex-col w-full">
          <label htmlFor="title" className="font-bold text-black text-md tracking-wide">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={addBlogData.title}
            onChange={handlerAddBlogOnChange}
            placeholder="Enter title"
            className="outline-none pl-2 py-1 border-2 border-gray-700 rounded-md w-full"
          />
        </div>

        {/* Subtitle */}
        <div className="flex flex-col w-full">
          <label htmlFor="subTitle" className="font-bold text-black text-md tracking-wide">
            Subtitle
          </label>
          <input
            type="text"
            name="subTitle"
            value={addBlogData.subTitle}
            onChange={handlerAddBlogOnChange}
            placeholder="Enter subtitle"
            className="outline-none pl-2 py-1 border-2 border-gray-700 rounded-md w-full"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col w-full">
          <label htmlFor="description" className="font-bold text-black text-md tracking-wide">
            Description
          </label>
          <input
            type="text"
            name="description"
            value={addBlogData.description}
            onChange={handlerAddBlogOnChange}
            placeholder="Enter description"
            className="outline-none pl-2 py-1 border-2 border-gray-700 rounded-md w-full"
          />
        </div>

        {/* Blog Category */}
        <div className="flex flex-col w-fit">
          <label htmlFor="category" className="font-bold text-black text-md tracking-wide">
            Blog Category
          </label>
          <select
            name="category"
            value={addBlogData.category}
            onChange={handlerAddBlogOnChange}
            id="category"
            className="border-2 border-green-400 rounded-md p-2 font-bold w-full"
          >
            {blogCategories.map((val, id) => (
              <option key={id} value={val}>
                {val}
              </option>
            ))}
          </select>
        </div>

        {/* Publish Now */}
        <div className="flex flex-row gap-4 items-center w-fit h-fit font-bold text-black">
          <h4>Publish Now</h4>
          <input
            type="checkbox"
            name="isPublished"
            checked={addBlogData.isPublished}
            onChange={handlerAddBlogOnChange}
            className="h-4 w-4 rounded-md"
          />
        </div>

        {/* Submit button */}
        <input
          type="submit"
          value="Submit"
          className="px-6 py-2 font-bold text-md text-white bg-blue-500 hover:bg-blue-600 w-fit h-fit rounded-md cursor-pointer"
        />
      </form>
    </div>
  );
};

export default AddBlogs;
