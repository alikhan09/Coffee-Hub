import React from "react";

const CategoryCard = ({ category, onClick }) => {
  return (
    <div
      className="bg-white shadow-lg rounded-lg p-4 cursor-pointer hover:scale-105 transition"
      onClick={onClick}
    >
      <img src={category.image} alt={category.name} className="w-full h-full object-cover rounded-lg" />
      <h2 className="text-xl font-semibold text-center mt-2">{category.name}</h2>
    </div>
  );
};

export default CategoryCard;
