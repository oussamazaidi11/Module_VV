import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/home";
import StatusMan from "./pages/Status/status";
import Main from "./connections/ConnectionMain";
import Profile from "./pages/Profile/Profile";
import PublicProfile from "./pages/PublicProfile/PublicProfile";
import Tasks from "./pages/tasks/Tasks";
import Header from "./components/Header";

const Project = () => <div>Project Page</div>;
const Vendors = () => <div>Vendors Page</div>;
const Requests = () => <div>Requests Page</div>;
const Inbox = () => <div>Inbox Page</div>;
const CreateProject = () => <div>Create Project Page</div>;
const FindVendors = () => <div>Find Vendors Page</div>;

export default function App() {
  return (
    <div className="bg-[#17181D] text-white min-h-screen">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Connection" element={<Main />} />
        <Route path="/StatusMan" element={<StatusMan />} />
        <Route path="/project" element={<Project />} />
        <Route path="/vendors" element={<Vendors />} />
        <Route path="/requests" element={<Requests />} />
        <Route path="/inbox" element={<Inbox />} />
        <Route path="/create-project" element={<CreateProject />} />
        <Route path="/find-vendors" element={<FindVendors />} />
        <Route path="/team" element={<Profile />} />
        <Route path="/public-profile" element={<PublicProfile />} />
        <Route path="/tasks" element={<Tasks />} />
      </Routes>
    </div>
  );
}
