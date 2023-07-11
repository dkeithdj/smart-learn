import {
  fetchUdemyCourseInstructor,
  fetchUdemyCourseName,
  fetchUdemyCourseUrl,
} from "@/utils";
import CourseCard from "@/components/CourseCard";

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
export default async function CourseContent() {
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
    <>
      {!isDataEmpty ? (
        <div className="home__cars-wrapper">
          {combinedResult?.map((res) => (
            <CourseCard course={res} />
          ))}
        </div>
      ) : (
        <div>Error Fetching... Try again</div>
      )}
    </>
  );
}
