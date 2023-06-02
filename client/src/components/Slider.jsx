import { useCallback, useEffect, useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

export default function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const imgs = [
    {
      id: 0,
      img: "https://images.pexels.com/photos/13991662/pexels-photo-13991662.jpeg",
    },
    {
      id: 1,
      img: "https://images.pexels.com/photos/757279/pexels-photo-757279.jpeg",
    },
    {
      id: 2,
      img: "https://images.pexels.com/photos/11302429/pexels-photo-11302429.jpeg",
    },
  ];

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? 2 : (prev) => prev - 1);
  };
  const nextSlide = useCallback(() => {
    setCurrentSlide(currentSlide === imgs.length - 1 ? 0 : (prev) => prev + 1);
  }, [currentSlide, imgs.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <div className="relative overflow-hidden h-[92vh] w-full">
      <div
        className="flex transition-all overflow-hidden duration-300 ease-in-out w-[300vw] h-full"
        style={{ transform: `translateX(-${currentSlide * 100}vw)` }}
      >
        {imgs.map((img) => (
          <img
            key={img.id}
            src={img.img}
            className="w-[100vw] h-full object-cover"
          />
        ))}
      </div>
      <div className="flex text-5xl gap-4 absolute text-white bottom-10 w-fit cursor-pointer m-auto left-0 right-0">
        <AiOutlineArrowLeft className="border p-3" onClick={prevSlide} />
        <AiOutlineArrowRight className="border p-3" onClick={nextSlide} />
      </div>
    </div>
  );
}
