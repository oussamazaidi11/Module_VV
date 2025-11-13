import About from "../../components/public-profile/About";
import Certifications from "../../components/public-profile/Certifications";
import Portfolio from "../../components/public-profile/Portfolio";
import ProfileHeader from "../../components/public-profile/ProfileHeader";
import RightSection from "../../components/public-profile/RightSection";
import Teams from "../../components/public-profile/Teams";

export default function PublicProfile() {
  return (
    <main className="space-y-[32px] sm:px-[70px] px-5  pb-[64px]">
      <ProfileHeader />
      <section className="flex lg:flex-row  flex-col-reverse w-full space-x-[32px] ">
        {/*Left Side */}
        <div className=" space-y-[32px] w-full ">
          <About />
          <Certifications />
          <Portfolio />
          <Teams />
        </div>
        {/*Right side or the details side */}
        <div className="pb-[32px]  lg:w-[40%] w-full">
          <RightSection />
        </div>
      </section>
    </main>
  );
}
