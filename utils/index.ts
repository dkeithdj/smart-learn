import { CarProps } from "@/types";
import { FilterProps } from "@/types";

export async function fetchCars(filters: FilterProps) {
  const { manufacturer, year, model, limit, fuel } = filters;
  const headers = {
    "X-RapidAPI-Key": "45f3d4030amsh2eaa3fe2aae0ae9p109aeajsn484cbdd7b082",
    "X-RapidAPI-Host": "cars-by-api-ninjas.p.rapidapi.com",
  };

  const response = await fetch(
    `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&year=${year}&model=${model}&limit=${limit}&fuel_type=${fuel}`,
    { headers: headers }
  );

  const result = await response.json();

  return result;
}

export async function fetchUdemyCourseUrl() {
  const headers = {
    "X-RapidAPI-Key": "45f3d4030amsh2eaa3fe2aae0ae9p109aeajsn484cbdd7b082",
    "X-RapidAPI-Host": "udemy-course-scrapper-api.p.rapidapi.com",
  };

  const response = await fetch(
    "https://udemy-course-scrapper-api.p.rapidapi.com/course-names/course-instructor/course-url",
    { headers: headers }
  );
  const result = await response.json();

  return result;
}

export async function fetchUdemyCourseName() {
  const headers = {
    "X-RapidAPI-Key": "45f3d4030amsh2eaa3fe2aae0ae9p109aeajsn484cbdd7b082",
    "X-RapidAPI-Host": "udemy-course-scrapper-api.p.rapidapi.com",
  };

  const response = await fetch(
    "https://udemy-course-scrapper-api.p.rapidapi.com/course-names",
    { headers: headers }
  );
  const result = await response.json();

  return result;
}

export async function fetchUdemyCourseInstructor() {
  const headers = {
    "X-RapidAPI-Key": "45f3d4030amsh2eaa3fe2aae0ae9p109aeajsn484cbdd7b082",
    "X-RapidAPI-Host": "udemy-course-scrapper-api.p.rapidapi.com",
  };

  const response = await fetch(
    "https://udemy-course-scrapper-api.p.rapidapi.com/course-names/course-instructor",
    { headers: headers }
  );
  const result = await response.json();

  return result;
}
export function generateRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const calculateCarRent = (city_mpg: number, year: number) => {
  const basePricePerDay = 50; // Base rental price per day in dollars
  const mileageFactor = 0.1; // Additional rate per mile driven
  const ageFactor = 0.05; // Additional rate per year of vehicle age

  // Calculate additional rate based on mileage and age
  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  // Calculate total rental rate per day
  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

  return rentalRatePerDay.toFixed(0);
};

export const generateCarImageUrl = (car: CarProps, angle?: string) => {
  const url = new URL("https://cdn.imagin.studio/getimage");
  const { make, year, model } = car;

  url.searchParams.append("customer", "hrjavascript-mastery");
  url.searchParams.append("make", make);
  url.searchParams.append("modelFamily", model.split(" ")[0]);
  url.searchParams.append("zoomType", "fullscreen");
  url.searchParams.append("modelYear", `${year}`);
  url.searchParams.append("angle", `${angle}`);

  return `${url}`;
};

export const updateSearchParams = (type: string, value: string) => {
  const searchParams = new URLSearchParams(window.location.search);

  searchParams.set(type, value);

  const newPathname = `${window.location.pathname}?${searchParams.toString()}`;
  return newPathname;
};
