import React from "react";

const Card = ({ email, name, post }) => (
  <div className="bg-[#22223b] rounded-lg p-5 transition-all duration-300 hover:scale-105 hover:shadow-lg w-[300px] text-gray-300">
    <span className="block text-sm text-[#9046cf] mb-2.5">{email}</span>
    <h4 className="text-2xl mb-2.5">{name}</h4>
    <p className="text-xs text-left">{post}</p>
  </div>
);

const ExamplePage = () => {
  const cards = Array(5).fill({
    email: "VincentCode0@gmail.com",
    name: "VinJex",
    post: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere accusamus adipisci eius soluta reiciendis modi numquam quibusdam corporis voluptas omnis? Expedita illo magnam obcaecati fugiat modi sed cupiditate. Aut, minima?",
  });

  return (
    <div className="min-h-screen bg-[#909590]">
      <div className="max-w-[1000px] mx-auto px-2.5 py-5">
        <h1 className="text-center text-4xl font-bold text-[#22223b] mb-5">
          Welcome to Example Website!
        </h1>

        <div className="flex justify-center flex-wrap mt-2.5 gap-7">
          {cards.map((card, index) => (
            <Card key={index} {...card} />
          ))}
        </div>

        <div className="flex justify-center items-center mt-10">
          <button className="bg-[#9046cf] text-white px-5 py-2.5 rounded hover:bg-[#8614ea] transition-colors mx-2.5">
            Prev
          </button>
          <span className="text-base font-semibold text-[#22223b]">
            Page 1 of 10
          </span>
          <button className="bg-[#9046cf] text-white px-5 py-2.5 rounded hover:bg-[#8614ea] transition-colors mx-2.5">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExamplePage;
