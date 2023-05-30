import { useCallback, useEffect, useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

export default function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const imgs = [
    {
      id: 0,
      img: "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg",
    },
    {
      id: 1,
      img: "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg",
    },
    {
      id: 2,
      img: "https://images.pexels.com/photos/991202/pexels-photo-991202.jpeg",
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
    <div className="relative overflow-hidden h-[calc(100vh_-_80px] w-full">
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
