"use client";

import CustomButton from "./CustomButton";
import Image from "next/image";

const Hero = () => {
  const handleScroll = () => {};
  return (
    <div className="hero">
      <div className="flex-1 pt-36  padding-x">
        <h1 className="text-yellow-300  hero__title">
          Smarter Learning. AI Powered
        </h1>
        <p className="hero__subtitle">
          Learn whatever you want with a tutor beside you!
        </p>

        <CustomButton
          title="Explore Courses"
          containerStyles="bg-primary-blue text-white rounded-full mt-10"
          handleClick={handleScroll}
        />
      </div>
      <div className="hero__image-container">
        <div className="hero__image">
          <Image
            src="/SmartLink.png"
            alt="hero"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
