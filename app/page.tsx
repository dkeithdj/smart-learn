// import { Hero, CourseContent, CustomButton, Chat } from "@/components";
import {
  fetchUdemyCourseInstructor,
  fetchUdemyCourseName,
  fetchUdemyCourseUrl,
} from "@/utils";
import CourseCard from "@/components/CourseCard";
import { useState } from "react";
import Link from "next/link";
import Hero from "@/components/Hero";
import Chat from "@/components/Chat";
import CustomButton from "@/components/CustomButton";
interface Instructor {
  [key: string]: {
    instructor: string;
  };
}

interface CourseUrl {
  [key: string]: {
    "course url": string;
  };
}

interface CourseName {
  [key: string]: {
    course_name: string;
  };
}

interface Course {
  id: number;
  course_name: string;
  course_instructor: string;
  course_url: string;
}

type Props = {
  searchParams: Record<string, string> | null | undefined;
};

export default async function Home({ searchParams }: Props) {
  const showModal = searchParams?.modal;

  const allCourseNames: CourseName = await fetchUdemyCourseName();
  const allCourseUrl: CourseUrl = await fetchUdemyCourseUrl();
  const allCourseInstructor: Instructor = await fetchUdemyCourseInstructor();

  const result: { [key: number]: Course } = {};

  Object.keys(allCourseNames).forEach((key: string) => {
    const id: number = parseInt(key);
    result[id] = {
      id,
      course_name: allCourseNames[key].course_name,
      course_instructor: allCourseInstructor[key].instructor,
      course_url: allCourseUrl[key]["course url"],
    };
  });

  // console.log(result);
  const combinedResult = Object.values(result);
  // combinedResult.forEach((result) => console.log(result.id));

  // console.log(allCourses);

  // const instructors = JSON.parse(allCourseInstructor);

  const isDataEmpty =
    !Array.isArray(combinedResult) ||
    combinedResult.length < 1 ||
    !combinedResult;

  return (
    <main className="">
      <Hero />

      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Course Catalogue</h1>
          <p>Explore out course you might like</p>
        </div>
        {!isDataEmpty ? (
          <div className="home__cars-wrapper">
            {combinedResult?.map((res) => (
              <CourseCard key={res.id} course={res} />
            ))}
          </div>
        ) : (
          <div>Error Fetching... Try again</div>
        )}

        <div>
          <div className="fixed bottom-5 right-5">
            <Chat />
          </div>
        </div>
      </div>

      {/* {showModal && <Chat />} */}
      {/* <Chat isOpen={isOpen} closeModal={() => setIsOpen(false)} /> */}
    </main>
  );
}
