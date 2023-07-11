import Link from "next/link";
import Image from "next/image";
import CustomButton from "./CustomButton";

const NavBar = () => {
  return (
    <header className="w-full absolute z-10">
      <nav className="max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4 bg-blue-500">
        <Link href="/" className="flex justify-center items-center">
          <Image
            src="/aitech-circle.png"
            alt="Car Hub Logo"
            width={60}
            height={60}
            className="object-contain"
          />
        </Link>

        <CustomButton
          title="Sign In"
          btnType="button"
          containerStyles="text-primary-blue rounded-full bg-white min-w-[130px]"
        />
      </nav>
    </header>
  );
};

export default NavBar;
