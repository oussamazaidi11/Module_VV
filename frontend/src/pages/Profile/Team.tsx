import React  from 'react';
import { Plus  } from 'lucide-react';

interface TeamProps {
  teamMembers: any[];
  onCreateClick: () => void;
  onTeamChange: () => void;
}


const API_URL = import.meta.env.VITE_API_URL;

const Team: React.FC<TeamProps> = ({ teamMembers, onCreateClick, onTeamChange }) => {
  
  
  const handleDeleteUser = async (id: number) => {
    try {
      await fetch(`${API_URL}/team/${id}`, { method: 'DELETE' });
      onTeamChange();
    } catch (err) {
      console.error(err);
    }
  };
  

  return (
    <div className="main-container w-[1440px] bg-[#17181d] relative overflow-hidden mx-auto my-0">
      <div className="flex w-[1300px] flex-col gap-[48px] items-start flex-nowrap relative mt-0 mr-0 mb-0 ml-[70px]">

        <div className="flex pt-[50px] pr-[30px] pb-[50px] pl-[30px] flex-col gap-[42px] items-start self-stretch shrink-0 flex-nowrap bg-[#21242b] rounded-[16px] border border-[#777b83] mt-[56px]">
          <div className="flex justify-between items-center self-stretch shrink-0 flex-nowrap w-full">
            <div className="flex w-[351px] flex-col gap-[8px] items-start shrink-0 flex-nowrap">
              <span className="h-[44px] shrink-0 basis-auto font-['Inter'] text-[36px] font-semibold leading-[43.568px] text-[#fff] relative text-left whitespace-nowrap">
                Team
              </span>
              <span className="h-[16px] shrink-0 basis-auto font-['Roboto'] text-[14px] font-normal leading-[16px] text-[#888888] relative text-left whitespace-nowrap">
                Showcase your team members.
              </span>
            </div>
            <button
              className="text-[#F6F6F6] flex items-center justify-center font-['Roboto'] transition-colors"
              style={{
                borderRadius: '12px',
                background: 'rgba(246,246,246,0.08)',
                padding: '12px 24px',
                gap: '12px',
                height: '48px',
              }}
              onClick={onCreateClick}
            >
              <span className="flex items-center justify-center w-4 h-4 rounded-[12px] border border-white mr-2">
                <Plus className="h-3 w-3 text-white font-semibold" />
              </span>
              Add New Member
            </button>
          </div>

          <div className="overflow-x-auto rounded-lg border-[1px] border-[#35383F] w-full">
            <table className="w-full min-w-[800px]">
              <thead className="bg-[#21242B]">
                <tr>
                  <th className="px-[16px] sm:px-[32px] py-[20px] text-left font-['Roboto'] text-[16px] font-medium text-[#888888] border-b border-[#35383F]">
                    User
                  </th>
                  <th className="px-[16px] py-[20px] text-left font-['Roboto'] text-[16px] font-medium text-[#888888] border-b border-[#35383F]">
                    Position
                  </th>
                  <th className="px-[16px] py-[20px] text-left font-['Roboto'] text-[16px] font-medium text-[#888888] border-b border-[#35383F]">
                    Phone Number
                  </th>
                  <th className="px-[16px] py-[20px] text-left font-['Roboto'] text-[16px] font-medium text-[#888888] border-b border-[#35383F]">
                    Role
                  </th>
                  <th className="px-[45px] py-[20px] text-right font-['Roboto'] text-[16px] font-medium text-[#888888] border-b border-[#35383F]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {teamMembers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-[#35383F] bg-[#21242B] hover:bg-muted/50 transition-colors"
                  >
                    {/* User with Avatar */}
                    <td className="px-[16px] sm:px-[32px] py-[20px] text-[#FFFFFF] font-['Roboto'] text-[16px]">
                      <div className="flex items-center gap-3">
                        {user.avatar ? (
                          <img
                            src={user.avatar as string}
                            alt={`${user.firstname} ${user.lastname}`}
                            className="w-[50px] h-[50px] rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-[50px] h-[50px] bg-[#D9D9D9] text-[#9A9A9A] text-[24px] rounded-full flex items-center justify-center">
                            {user.firstname[0].toUpperCase()}{user.lastname[0].toUpperCase()}
                          </div>
                        )}
                        <div className="flex flex-col">
                          <span className="font-medium">{user.firstname} {user.lastname}</span>
                          <span className="text-[14px] text-[#888888]">{user.email}</span>
                        </div>
                      </div>
                    </td>

                    {/* Position */}
                    <td className="px-[16px] py-[20px] text-[#FFFFFF] font-['Roboto'] text-[16px]">
                      {user.position}
                    </td>

                    {/* Phone */}
                    <td className="px-[16px] py-[20px] text-[#FFFFFF] font-['Roboto'] text-[16px]">
                      {user.phoneNumber}
                    </td>

                    {/* Role */}
                    <td className="px-[16px] py-[20px] text-[#FFFFFF] font-['Roboto'] text-[16px]">
                      {user.role ? 
                        <span className="border text-[#F6F6F6] font-medium text-[14px] border-[#f6f6f6] rounded-[36px] bg-[#393D46] px-2.5 py-2 font-['Roboto']">
                          {user.role}
                        </span> : '-'
                      }
                    </td>

                    {/* Actions */}
                    <td className="pr-[20px] sm:pr-[48px] text-right space-x-2">
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className=" font-['Roboto'] text-base px-3 py-1.5 rounded-[8px]"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                          <path d="M3 6.5H21M19 6.5V20.5C19 21.5 18 22.5 17 22.5H7C6 22.5 5 21.5 5 20.5V6.5M8 6.5V4.5C8 3.5 9 2.5 10 2.5H14C15 2.5 16 3.5 16 4.5V6.5M10 11.5V17.5M14 11.5V17.5" stroke="#AA3A39" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
