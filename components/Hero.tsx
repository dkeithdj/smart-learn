"use client";

import CustomButton from "./CustomButton";
import Image from "next/image";

const Hero = () => {
  const handleScroll = () => {};
  return (
    <div className="hero">
      <div className="flex-1 pt-36  padding-x">
        <h1 className="hero__title">Learn at your own pace</h1>
        <p className="hero__subtitle">Explore well-made courses for you</p>

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
