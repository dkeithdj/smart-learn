import { useState } from "react";
import Image from "next/image";
import { generateRandomNumber } from "@/utils";
import CustomButton from "./CustomButton";
import Link from "next/link";

interface Props {
  id: number;
  course_name: string;
  course_instructor: string;
  course_url: string;
}

const CourseCard = ({ course }: { course: Props }) => {
  const { course_name, course_instructor, course_url } = course;
  // const carRent = calculateCarRent(city_mpg, year);

  const range = generateRandomNumber(0, 100);

  return (
    <div className="car-card group">
      <div className="car-card__content">
        <h2 className="car-card__content-title">{course_name}</h2>
      </div>

      <p className="flex mt-6 text-[32px] font-extrabold">
        {/* <span className="self-start text-[14px] font-semibold">$</span> */}
        <span
          className={`${range >= 90 ? "text-green-700" : "text-orange-600"}`}
        >
          {range}
        </span>
        <span className="self-start text-[14px] font-medium">%</span>
      </p>

      <div className="relative w-full h-40 my-3 object-contain">
        <Image
          src="/SmartLink.png"
          alt="car model"
          fill
          priority
          className="object-contain"
        />
      </div>

      <div className="relative flex w-full mt-2">
        <div className="flex group-hover:invisible w-full justify-center text-gray">
          <div className="flex flex-col justify-center items-center gap-2">
            <Image
              src="/person.svg"
              width={20}
              height={20}
              alt="steering wheel"
            />
            <p className="text-[14px]">
              {course_instructor}
              {/* {transmission === "a" ? "Automatic" : "Manual"} */}
            </p>
          </div>
        </div>

        <div className="car-card__btn-container ">
          <Link href={course_url} className="car-card__btn-container ">
            <CustomButton
              title="Go to Course"
              containerStyles="w-full py-[16px] rounded-full bg-primary-blue"
              textStyles="text-white text-[14px] leading-[17px] font-bold"
              rightIcon="/right-arrow.svg"
              // handleClick={() => setIsOpen(true)}
            />
          </Link>
        </div>
      </div>

      {/* <CarDetails
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        car={car}
      /> */}
    </div>
  );
};

export default CourseCard;
