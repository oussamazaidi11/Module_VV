import React, { useState, useRef, useEffect } from 'react';


// post request example
const API_URL = import.meta.env.VITE_API_URL;

interface CreateNewUserProps {
  onClose?: () => void;
  onUsersChange?: () => void;
}

const CreateNewUser: React.FC<CreateNewUserProps> = ({ onClose, onUsersChange }) => {


  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [position, setPosition] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const roleContainerRef = useRef<HTMLDivElement>(null);
  
  // Require at least one lowercase, one uppercase, one digit, and minimum length 8
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  

  const [passwordTouched, setPasswordTouched] = useState(false);
  const [confirmTouched, setConfirmTouched] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  
  useEffect(() => {
    if (!showRoleDropdown) return;
    function handleClickOutside(event: MouseEvent) {
      if (
        showRoleDropdown &&
        roleContainerRef.current &&
        !roleContainerRef.current.contains(event.target as Node)
      ) {
        setShowRoleDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showRoleDropdown]);

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  // Password strength and match validation
  if (!passwordRegex.test(password)) {
    return;
  }
  if (password !== confirmPassword) {
    return;
  }

  try {
    const res = await fetch(`${API_URL}/team`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname,
        lastname,
        email,
        phoneNumber,
        position,
        role,
        password,
      }),
    });

    if (!res.ok) {
      let message = 'Failed to create new user';
      try {
        const data = await res.json();
        if (data?.message) message = data.message;
      } catch (_) {
        /* ignore parse errors */
      }
      throw new Error(message);
    }

    if (onUsersChange) await onUsersChange();
    if (onClose) onClose();

  } catch (err) {
    console.error(err);
  }
};


const handleCancel = (e?: React.MouseEvent<HTMLButtonElement>) => {
  if (e) e.preventDefault();
  setFirstname("");
  setLastname("");
  setEmail("");
  setPhoneNumber("");
  setPosition("");
  setRole("");
  setPassword("");
  setConfirmPassword("");
  setPasswordTouched(false);
  setConfirmTouched(false);
  if (onClose) onClose();
};


  return (
    <div className="mx-[15px] my-[15px] max-h-screen">
      <form onSubmit={handleSubmit} noValidate>
        <div>
          <h2 className="text-[28px] font-semibold font-title text-[#FFFFFF] text-left mb-[8px]">
            Add New Member
          </h2>
          <p className="text-[14px] text-[#888888] font-body text-left">
             Fill in the details to add a new user to your workspace.
          </p>
        </div>

        <div className="mt-[42px] space-y-[16px]">
            <div className="grid grid-cols-2 gap-[15px]">
          {/* First Name */}
          <div>
            <label className="block text-l font-medium font-body text-[#FFFFFF] mb-[8px]">
              First Name
            </label>
            <input
              type="text"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              className="w-full px-[16px] py-[12px] bg-[#17181D] text-[#F6F6F6] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-ring placeholder:opacity-20 placeholder-[#F6F6F6]"
              placeholder="Enter first name"
              style={{ height: "60px", maxWidth: "300px" }}
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-l font-medium font-body text-[#FFFFFF] mb-[8px]">
              Last Name
            </label>
            <input
              type="text"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              className="w-full px-[16px] py-[12px] bg-[#17181D] text-[#F6F6F6] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-ring placeholder:opacity-20 placeholder-[#F6F6F6]"
              placeholder="Enter last name"
              style={{ height: "60px", maxWidth: "300px" }}
            />
          </div>
          

          {/* Email */}
           
            <div>
            <label className="block text-l font-medium font-body text-[#FFFFFF] mb-[8px]">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-[16px] py-[12px] bg-[#17181D] text-[#F6F6F6] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-ring placeholder:opacity-20 placeholder-[#F6F6F6]"
              placeholder="Enter email address"
              style={{ height: "60px", maxWidth: "300px" }}
            />
            </div>
          

          {/* Phone Number */}
          <div>
            <label className="block text-l font-medium font-body text-[#FFFFFF] mb-[8px]">
              Phone Number
            </label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full px-[16px] py-[12px] bg-[#17181D] text-[#F6F6F6] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-ring placeholder:opacity-20 placeholder-[#F6F6F6]"
              placeholder="Enter phone number"
              style={{ height: "60px", maxWidth: "300px" }}
            />
          </div>

          {/* Position */}
          <div>
            <label className="block text-l font-medium font-body text-[#FFFFFF] mb-[8px]">
              Position
            </label>
            <input
              type="text"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              className="w-full px-[16px] py-[12px] bg-[#17181D] text-[#F6F6F6] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-ring placeholder:opacity-20 placeholder-[#F6F6F6]"
              placeholder="Enter position"
              style={{ height: "60px", maxWidth: "300px" }}
            />
          </div>

          {/* Role and Password */}
          
              {/* Role Dropdown */}
              <div className="relative" ref={roleContainerRef}>
                <label className="block text-l font-medium font-body text-[#FFFFFF] mb-[8px]">
                  Role
                </label>
                <button
                  type="button"
                  className={`w-full flex h-[60px] items-center justify-between px-[16px] py-[12px] bg-[#17181D] rounded-[8px] border-none focus:outline-none focus:ring-2 focus:ring-ring font-body transition`}
                  style={{ height: '60px', maxWidth: '300px' }}
                  onClick={() => setShowRoleDropdown((prev) => !prev)}
                >
                  <span className={`font-normal text-[#F6F6F6] ${role ? '' : 'opacity-20'}`}>
                    {role ? role : 'Select Role'}
                  </span>
                  {showRoleDropdown ? (
                    <svg className="ml-2 w-4 h-4 text-[#F6F6F6]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 15l-7-7-7 7" /></svg>
                  ) : (
                    <svg className="ml-2 w-4 h-4 text-[#F6F6F6]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                  )}
                </button>
                {showRoleDropdown && (
                  <div
                    className="absolute left-0 top-full w-full z-10 flex flex-col rounded-lg border border-[#878383] bg-[#21242D] mt-1"
                    style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
                  >
                    {['Workspace Owner Delegate ' , 'Administrator' , 'User' ].map(option => (
                      <button
                        key={option}
                        type="button"
                        className={`w-full text-left px-[16px] py-[12px] font-body text-base text-[#F6F6F6] hover:bg-[#21242D] focus:bg-[#21242D] rounded-lg ${role === option ? 'bg-[#21242D]' : ''}`}
                        style={{ borderRadius: '8px' }}
                        onClick={() => { setRole(option); setShowRoleDropdown(false); }}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Password */}

              <div 
              style={{
                marginTop:
                  showRoleDropdown
                    ? '150px'
                    : undefined,
              }}>
              
                <label className="block text-l font-medium font-body text-[#FFFFFF] mb-[8px]">Password</label>
                <div className="relative" style={{ maxWidth: "300px" }}>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={() => setPasswordTouched(true)}
                    className={`w-full pr-[70px] px-[16px] py-[12px] bg-[#17181D] text-[#F6F6F6] rounded-[8px] focus:outline-none focus:ring-2 placeholder:opacity-20 placeholder-[#F6F6F6] border ${passwordTouched ? (passwordRegex.test(password) ? 'border-emerald-500 focus:ring-emerald-500' : 'border-red-500 focus:ring-red-500') : 'border-transparent focus:ring-ring'}`}
                    placeholder="Enter password"
                    title="Must be 8+ characters with uppercase, lowercase, and a digit."
                    minLength={8}
                    aria-invalid={passwordTouched && !passwordRegex.test(password)}
                    style={{ height: "60px" }}
                  />
                  {passwordTouched && passwordRegex.test(password) && (
                    <span className="absolute right-10 top-1/2 -translate-y-1/2 text-emerald-500" aria-hidden="true">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 10-1.214-.882l-3.483 4.79-1.59-1.59a.75.75 0 10-1.06 1.06l2.25 2.25a.75.75 0 001.146-.094l4.95-6.534z" clipRule="evenodd" />
                      </svg>
                    </span>
                  )}
                  {passwordTouched && !passwordRegex.test(password) && (
                    <span className="absolute right-10 top-1/2 -translate-y-1/2 text-red-500" aria-hidden="true">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM9 6a1 1 0 112 0v5a1 1 0 11-2 0V6zm1 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" clipRule="evenodd" />
                      </svg>
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => setShowPassword((p) => !p)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#F6F6F6]"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      // Eye off (hide)
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                        <path d="M9.88013 9.88001C9.58538 10.1547 9.34897 10.4859 9.185 10.8539C9.02104 11.2219 8.93287 11.6191 8.92576 12.0219C8.91865 12.4247 8.99275 12.8248 9.14364 13.1984C9.29452 13.5719 9.5191 13.9113 9.80397 14.1962C10.0888 14.481 10.4282 14.7056 10.8017 14.8565C11.1753 15.0074 11.5754 15.0815 11.9782 15.0744C12.381 15.0673 12.7783 14.9791 13.1463 14.8151C13.5143 14.6512 13.8455 14.4148 14.1201 14.12M10.73 5.08C11.1513 5.02751 11.5754 5.00079 12 5C19 5 22 12 22 12C21.5529 12.9571 20.9922 13.8569 20.33 14.68M6.61 6.60999C4.62125 7.96461 3.02987 9.82525 2 12C2 12 5 19 12 19C13.9159 19.0051 15.7908 18.4451 17.39 17.39M2 2L22 22" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    ) : (
                      // Eye on (show)
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                        <path d="M2 12C2 12 5 5 12 5C19 5 22 12 22 12C22 12 19 19 12 19C5 19 2 12 2 12Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    )}
                  </button>
                </div>
              </div>


              <div 
              style={{
                marginTop:
                  showRoleDropdown
                    ? '150px'
                    : undefined,
              }}>
                <label className="block text-l font-medium font-body text-[#FFFFFF] mb-[8px]">Confirm Password</label>
                <div className="relative" style={{ maxWidth: "300px" }}>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onBlur={() => setConfirmTouched(true)}
                    className={`w-full pr-[70px] px-[16px] py-[12px] bg-[#17181D] text-[#F6F6F6] rounded-[8px] focus:outline-none focus:ring-2 placeholder:opacity-20 placeholder-[#F6F6F6] border ${confirmTouched ? ((confirmPassword && confirmPassword === password) ? 'border-emerald-500 focus:ring-emerald-500' : 'border-red-500 focus:ring-red-500') : 'border-transparent focus:ring-ring'}`}
                    placeholder="Enter password"
                    title="Must be 8+ characters with uppercase, lowercase, and a digit."
                    minLength={8}
                    aria-invalid={confirmTouched && !!confirmPassword && confirmPassword !== password}
                    style={{ height: "60px" }}
                  />
                  {confirmTouched && confirmPassword && confirmPassword === password && (
                    <span className="absolute right-10 top-1/2 -translate-y-1/2 text-emerald-500" aria-hidden="true">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 10-1.214-.882l-3.483 4.79-1.59-1.59a.75.75 0 10-1.06 1.06l2.25 2.25a.75.75 0 001.146-.094l4.95-6.534z" clipRule="evenodd" />
                      </svg>
                    </span>
                  )}
                  {confirmTouched && confirmPassword && confirmPassword !== password && (
                    <span className="absolute right-10 top-1/2 -translate-y-1/2 text-red-500" aria-hidden="true">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM9 6a1 1 0 112 0v5a1 1 0 11-2 0V6zm1 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" clipRule="evenodd" />
                      </svg>
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((p) => !p)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#F6F6F6]"
                    aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                  >
                    {showConfirmPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                        <path d="M9.88013 9.88001C9.58538 10.1547 9.34897 10.4859 9.185 10.8539C9.02104 11.2219 8.93287 11.6191 8.92576 12.0219C8.91865 12.4247 8.99275 12.8248 9.14364 13.1984C9.29452 13.5719 9.5191 13.9113 9.80397 14.1962C10.0888 14.481 10.4282 14.7056 10.8017 14.8565C11.1753 15.0074 11.5754 15.0815 11.9782 15.0744C12.381 15.0673 12.7783 14.9791 13.1463 14.8151C13.5143 14.6512 13.8455 14.4148 14.1201 14.12M10.73 5.08C11.1513 5.02751 11.5754 5.00079 12 5C19 5 22 12 22 12C21.5529 12.9571 20.9922 13.8569 20.33 14.68M6.61 6.60999C4.62125 7.96461 3.02987 9.82525 2 12C2 12 5 19 12 19C13.9159 19.0051 15.7908 18.4451 17.39 17.39M2 2L22 22" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                        <path d="M2 12C2 12 5 5 12 5C19 5 22 12 22 12C22 12 19 19 12 19C5 19 2 12 2 12Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>
            
        
      
        </div>
        {/* Buttons */}
        <div 
        style={{
                paddingBottom:
                  showRoleDropdown
                    ? '32px'
                    : undefined,
              }}
                className="flex justify-end gap-[16px] mt-[56px] ">

          <button
          className="h-[35px] w-[105px] text-[#F6F6F6] px-[16px] py-[8px] rounded-lg font-body transition-colors shadow-sm flex items-center justify-center text-center bg-[rgba(246,246,246,0.08)] hover:shadow-lg focus:shadow-lg"
          type="button"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          className="h-[35px] w-[146px] bg-[#5473C1] text-[#F6F6F6] px-[16px] py-[8px] rounded-[8px] flex items-center justify-center text-center transition-colors font-body hover:shadow-lg focus:shadow-lg"
          type="submit"
        >
          Add Member
        </button>


      
        </div>
      </form>
    </div>
  );
}

export default CreateNewUser
