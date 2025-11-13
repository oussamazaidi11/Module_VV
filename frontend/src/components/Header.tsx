import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [showNavBar, setShowNavbar] = useState<boolean>(false);
  return (
    <header className="sticky top-0 z-40 p-2">
      <div className="flex backdrop-blur-md bg-black/10 flex-row items-center md:justify-center justify-between w-full p-4  sm:gap-[56px]  mb-[56px] border rounded-4xl border-[#383524]">
        <span className="h-[44px] font-['Inter'] sm:text-[36px] text-2xl font-semibold leading-[43.568px] text-[#fff]">
          LOGO
        </span>
        {/*Menu for bigger devices */}
        <div className="md:flex hidden gap-[42px] items-center">
          <div className="flex gap-[50px] items-center">
            {/*Links with labels */}
            <div className="flex gap-[24px] items-center">
              <Link to="/">
                <div className="flex gap-[8px] items-end hover:opacity-50 transition-all">
                  <div className="w-[24px] h-[24px] bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-08-06/LdELwAKMyZ.png)] bg-cover" />
                  <span className="h-[19px] font-['Roboto'] text-[16px] font-medium leading-[18.75px] text-[#fff] lg:inline-block hidden">
                    Home
                  </span>
                </div>
              </Link>

              <Link to="project">
                <div className="flex gap-[8px] items-end hover:opacity-50 transition-all">
                  <div className="w-[24px] h-[24px] bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-08-06/znweVnWv9V.png)] bg-cover" />
                  <span className="h-[19px] font-['Roboto'] text-[16px] font-medium leading-[18.75px] text-[#fff] lg:inline-block hidden">
                    Project Management
                  </span>
                </div>
              </Link>

              <Link to="vendors">
                <div className="flex gap-[8px] items-end hover:opacity-50 transition-all">
                  <div className="w-[24px] h-[24px] bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-08-06/4sar6otuqn.png)] bg-cover" />
                  <span className="h-[19px] font-['Roboto'] text-[16px] font-medium leading-[18.75px] text-[#fff] lg:inline-block hidden">
                    Vendor Pool
                  </span>
                </div>
              </Link>
            </div>

            {/*Links without labels */}
            <div className="flex  gap-[24px] items-center">
              <div className="flex gap-[24px] items-center">
                <div className="w-[24px] h-[24px] bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-08-06/TZa0nLDSQf.png)] bg-cover hover:opacity-50 transition-all cursor-pointer" />
                <div className="w-[24px] h-[24px] bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-08-06/Ax5vrWS88X.png)] bg-cover hover:opacity-50 transition-all cursor-pointer" />
                <Link to="public-profile">
                  <div className="w-[24px] h-[24px] bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-08-06/iSQC3bNYVM.png)] bg-cover hover:opacity-50 transition-all cursor-pointer" />
                </Link>{" "}
              </div>
              <div className="flex items-center gap-[8px] border border-[#888888] rounded-[4px] p-[8px] hover:opacity-50 transition-all cursor-pointer">
                <div className="w-[24px] h-[24px] bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-08-06/KFzObmjYsW.png)] bg-cover" />
                <span className="h-[19px] font-['Roboto'] text-[16px] font-medium leading-[18.75px] text-[#fff] ">
                  My Projects
                </span>
              </div>
            </div>
          </div>
        </div>

        {/*Menu for small devices */}
        <div
          className="inline-block md:hidden"
          onClick={() => setShowNavbar(true)}
        >
          <Menu />
        </div>
      </div>
      {/*Menu for small devices */}
      {showNavBar && (
        <nav className=" motion-preset-slide-left fixed top-0 right-0 bg-[#17181D]/50 backdrop-blur-md z-60 w-[80%] h-svh px-5 pt-5 pb-10">
          <div className="flex w-full">
            <X onClick={() => setShowNavbar(false)} />
          </div>
          <div className="flex gap-[50px] items-center flex-col h-full">
            {/*Links with labels */}
            <div className="flex flex-col items-start justify-around flex-1">
              <Link to="/" onClick={() => setShowNavbar(false)}>
                <div className="flex gap-[8px] items-end hover:opacity-50 transition-all">
                  <div className="w-[24px] h-[24px] bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-08-06/LdELwAKMyZ.png)] bg-cover" />
                  <span className="h-[19px] font-['Roboto'] text-[16px] font-medium leading-[18.75px] text-[#fff]  ">
                    Home
                  </span>
                </div>
              </Link>

              <Link to="project" onClick={() => setShowNavbar(false)}>
                <div className="flex gap-[8px] items-end hover:opacity-50 transition-all">
                  <div className="w-[24px] h-[24px] bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-08-06/znweVnWv9V.png)] bg-cover" />
                  <span className="h-[19px] font-['Roboto'] text-[16px] font-medium leading-[18.75px] text-[#fff]  ">
                    Project Management
                  </span>
                </div>
              </Link>

              <Link to="vendors" onClick={() => setShowNavbar(false)}>
                <div className="flex gap-[8px] items-end hover:opacity-50 transition-all">
                  <div className="w-[24px] h-[24px] bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-08-06/4sar6otuqn.png)] bg-cover" />
                  <span className="h-[19px] font-['Roboto'] text-[16px] font-medium leading-[18.75px] text-[#fff]  ">
                    Vendor Pool
                  </span>
                </div>
              </Link>
            </div>

            {/*Links without labels */}
            <div className="flex flex-col items-center flex-1 w-full h-full">
              <div className="flex items-center justify-between flex-1 w-full">
                <div className="w-[24px] h-[24px] bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-08-06/TZa0nLDSQf.png)] bg-cover hover:opacity-50 transition-all cursor-pointer" />
                <div className="w-[24px] h-[24px] bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-08-06/Ax5vrWS88X.png)] bg-cover hover:opacity-50 transition-all cursor-pointer" />
                <Link to="public-profile" onClick={() => setShowNavbar(false)}>
                  <div className="w-[24px] h-[24px] bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-08-06/iSQC3bNYVM.png)] bg-cover hover:opacity-50 transition-all cursor-pointer" />
                </Link>
              </div>
              <div className="flex  items-center gap-[8px] border border-[#888888] rounded-[4px] p-[8px] hover:opacity-50 transition-all cursor-pointer">
                <div className="w-[24px] h-[24px] bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-08-06/KFzObmjYsW.png)] bg-cover" />
                <span className="h-[19px] font-['Roboto'] text-[16px] font-medium leading-[18.75px] text-[#fff] ">
                  My Projects
                </span>
              </div>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
