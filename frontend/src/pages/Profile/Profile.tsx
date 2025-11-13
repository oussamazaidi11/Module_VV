import  { useEffect, useState } from 'react';
import Team from './Team';
import Modal from './Modal';
import CreateNewUser from './CreateNewUser';


const API_URL = import.meta.env.VITE_API_URL;

const Profile = () => {
  const [TeamMembers, setTeamMembers] = useState([
    {
      id: 1,
      firstname: "John",
      lastname: "Doe",
      email: "john.doe@example.com",
      phoneNumber: "+1 555-123-4567",
      position: "Software Engineer",
      role: "Admin",
    },
    {
      id: 2,
      firstname: "Jane",
      lastname: "Smith",
      email: "jane.smith@example.com",
      phoneNumber: "+1 555-987-6543",
      position: "Project Manager",
      role: "User",
    },
    {
      id: 3,
      firstname: "Ali",
      lastname: "Khan",
      email: "ali.khan@example.com",
      phoneNumber: "+971 50 123 4567",
      position: "QA Tester",
      role: "User",
    }
  ]);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Fetch users
  const fetchTeamMembers = async () => {
    try {
      const res = await fetch(`${API_URL}/team`);
      const data = await res.json();
      setTeamMembers(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  // Handlers
  const handleCreateClick = () => setIsCreateModalOpen(true);
  const handleCloseCreateModal = () => setIsCreateModalOpen(false);

  
  return (
    <div className="main-container w-[1440px] bg-[#17181D] relative overflow-hidden mx-auto my-0">
      <div className="flex w-full flex-col gap-[48px] items-start relative pb-[50px]">
        <Team
          teamMembers={TeamMembers}
          onCreateClick={handleCreateClick}
          onTeamChange={fetchTeamMembers}
        />
        <Modal isOpen={isCreateModalOpen} onClose={handleCloseCreateModal} widthClass="w-[650px]">
          <CreateNewUser onClose={handleCloseCreateModal} onUsersChange={fetchTeamMembers} />
        </Modal>
      </div>
    </div>
  );
};

export default Profile;