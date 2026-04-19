"use client";
import { useState, type ChangeEvent } from "react";
import { CgFileDocument } from "react-icons/cg";
import { CiMail } from "react-icons/ci";
import { IoMdCall } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import { RxPeople } from "react-icons/rx";

const tabs = [
  { key: "profile", label: "Profile" },
  { key: "notification", label: "Notification" },
  { key: "security", label: "Security" },
];

const notificationItems = [
  {
    key: "courseUpdates",
    label: "Course Updates",
    description: "Get notified about new courses and content",
  },
  {
    key: "learningReminders",
    label: "Learning Reminders",
    description: "Get notified about new courses and content",
  },
  {
    key: "achievementNotifications",
    label: "Achievement Notifications",
    description: "Get notified about new courses and content",
  },
  {
    key: "emailNewsletter",
    label: "Email Newsletter",
    description: "Get notified about new courses and content",
  },
  {
    key: "communityUpdates",
    label: "Community Updates",
    description: "Get notified about new courses and content",
  },
  {
    key: "pushNotifications",
    label: "Push Notifications",
    description: "Get notified about new courses and content",
  },
];

const AccountSettingsPage = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const [profile, setProfile] = useState({
    firstName: "Sarah",
    lastName: "ewrefdf",
    email: "sarah@gmail.com",
    phoneNumber: "(177) 123-34565",
    company: "Johnson & Johnson",
    location: "4517 Washington Ave. Manchester, Kentucky 39495",
  });

  const [notifications, setNotifications] = useState({
    courseUpdates: true,
    learningReminders: true,
    achievementNotifications: false,
    emailNewsletter: false,
    communityUpdates: false,
    pushNotifications: true,
  });

  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleProfileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleNotificationChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNotifications({
      ...notifications,
      [e.target.name]: e.target.checked,
    });
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword({
      ...password,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className='min-h-screen  px-5 py-8'>
      <div className='mx-auto'>
        <div className='mb-8'>
          <h1 className='text-3xl font-semibold text-slate-900'>
            Account Settings
          </h1>
          <p className='mt-2 text-sm text-slate-600'>
            Manage your account preferences and settings...
          </p>
        </div>

        <div className='overflow-hidden rounded-[30px]'>
          <div className='overflow-hidden rounded-[30px]'>
            <div className='overflow-hidden rounded-[30px]'>
              <div className='flex flex-col gap-0 px-4 py-3 my-4 sm:flex-row sm:items-center sm:justify-start'>
                <div className='flex flex-col sm:flex-row'>
                  {tabs.map((tab, index) => (
                    <div
                      key={tab.key}
                      className={
                        "sm:border-r sm:border-slate-300 " +
                        (index === tabs.length - 1 ? "sm:border-r-0" : "")
                      }>
                      <button
                        onClick={() => setActiveTab(tab.key)}
                        className={
                          "w-full px-5 py-3 text-sm font-semibold transition-colors sm:w-auto " +
                          (activeTab === tab.key
                            ? "text-slate-900 border-b-2 border-slate-900"
                            : "text-slate-500 hover:text-slate-900")
                        }>
                        {tab.label}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className=''>
            <div
              className={`grid gap-6 ${activeTab === "profile" ? "lg:grid-cols-[2fr_1fr]" : "lg:grid-cols-1"}`}>
              <div className='space-y-6'>
                {activeTab === "profile" && (
                  <div className='rounded-[16px] border border-slate-200 bg-white p-6 shadow-sm'>
                    <div className=''>
                      <div>
                        <p className='inline-flex items-center gap-2 py-2 text-sm font-medium text-slate-600'>
                          <RxPeople />
                          Personal Information
                        </p>
                        <p className='mt-2 text-sm text-slate-500'>
                          Update your personal details and Profile picture
                        </p>
                      </div>
                    </div>
                    <div className='flex items-center gap-3 my-3'>
                      <img
                        className='h-14 w-14 rounded-full object-cover'
                        src='https://via.placeholder.com/150'
                        alt='Profile'
                      />
                      <button className='rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50'>
                        Change Photo
                      </button>
                    </div>

                    <div className='mt-6 grid gap-4'>
                      <div className='grid gap-4 md:grid-cols-2'>
                        <div>
                          <label className='block text-xs font-semibold text-slate-500'>
                            First Name
                          </label>
                          <input
                            type='text'
                            name='firstName'
                            value={profile.firstName}
                            onChange={handleProfileChange}
                            className='mt-2 w-full rounded-[4px] border border-[#DCE3EA] px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-100'
                          />
                        </div>
                        <div>
                          <label className='block text-xs font-semibold text-slate-500'>
                            Last Name
                          </label>
                          <input
                            type='text'
                            name='lastName'
                            value={profile.lastName}
                            onChange={handleProfileChange}
                            className='mt-2 w-full rounded-[4px] border border-[#DCE3EA] px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-100'
                          />
                        </div>
                      </div>

                      <div>
                        <label className='block text-xs font-semibold text-slate-500'>
                          Email Address
                        </label>
                        <input
                          type='email'
                          name='email'
                          value={profile.email}
                          onChange={handleProfileChange}
                          className='mt-2 w-full  rounded-[4px] border border-[#DCE3EA] px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-100'
                        />
                      </div>

                      <div>
                        <label className='block text-xs font-semibold text-slate-500'>
                          Phone Number
                        </label>
                        <input
                          type='text'
                          name='phoneNumber'
                          value={profile.phoneNumber}
                          onChange={handleProfileChange}
                          className='mt-2 w-full rounded-[4px] border border-[#DCE3EA] px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-100'
                        />
                      </div>

                      <div>
                        <label className='block text-xs font-semibold text-slate-500'>
                          Company
                        </label>
                        <input
                          type='text'
                          name='company'
                          value={profile.company}
                          onChange={handleProfileChange}
                          className='mt-2 w-full rounded-[4px] border border-[#DCE3EA] px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-100'
                        />
                      </div>

                      <div>
                        <label className='block text-xs font-semibold text-slate-500'>
                          Location
                        </label>
                        <input
                          type='text'
                          name='location'
                          value={profile.location}
                          onChange={handleProfileChange}
                          className='mt-2 w-full rounded-[4px] border border-[#DCE3EA] px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-100'
                        />
                      </div>
                    </div>

                    <div className='pt-2'>
                      <button className='inline-flex items-center justify-center rounded-[4px] bg-[#D4A017] my-3 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-600'>
                        Save Changes
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === "notification" && (
                  <div className='rounded-[16px] border border-slate-200 bg-white p-6 shadow-sm'>
                    <div className='flex flex-col ml-5 gap-3 sm:flex-row sm:items-center sm:justify-between'>
                      <div>
                        <p className='text-lg font-semibold text-slate-900'>
                          Notification Preferences
                        </p>
                        <p className='mt-1 text-sm text-slate-500'>
                          Choose how you want to receive updates
                        </p>
                      </div>
                    </div>

                    <div className='mt-6 space-y-3'>
                      {notificationItems.map((item) => (
                        <label
                          key={item.key}
                          className='group flex items-center justify-between gap-4 border-b-2 border-[#DCE3EA] px-5 py-4 transition hover:border-slate-300'>
                          <div>
                            <p className='text-sm font-semibold text-slate-900'>
                              {item.label}
                            </p>
                            <p className='mt-1 text-sm text-slate-500'>
                              {item.description}
                            </p>
                          </div>
                          <div className='flex items-center'>
                            <input
                              id={item.key}
                              name={item.key}
                              type='checkbox'
                              checked={
                                notifications[
                                  item.key as keyof typeof notifications
                                ]
                              }
                              onChange={handleNotificationChange}
                              className='peer sr-only'
                            />
                            <div className='inline-flex h-9 w-16 items-center rounded-full bg-slate-300 transition peer-checked:bg-amber-500'>
                              <span className='ml-1 h-7 w-7 rounded-full bg-white shadow transition peer-checked:ml-8' />
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "security" && (
                  <div className='rounded-[16px] border border-slate-200 bg-white p-6 shadow-sm'>
                    <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
                      <div>
                        <p className='text-lg font-semibold text-slate-900'>
                          Password & Security
                        </p>
                        <p className='mt-1 text-sm text-slate-500'>
                          Manage your account preference and settings
                        </p>
                      </div>
                    </div>

                    <div className='mt-6 space-y-5'>
                      <div>
                        <label className='block text-xs font-semibold uppercase tracking-[0.22em] text-slate-500'>
                          Current Password
                        </label>
                        <input
                          type='password'
                          name='currentPassword'
                          value={password.currentPassword}
                          onChange={handlePasswordChange}
                          className='mt-2 w-full rounded-[4px] border border-[#DCE3EA] px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-100'
                          placeholder='Enter current password'
                        />
                      </div>

                      <div>
                        <label className='block text-xs font-semibold uppercase tracking-[0.22em] text-slate-500'>
                          New Password
                        </label>
                        <input
                          type='password'
                          name='newPassword'
                          value={password.newPassword}
                          onChange={handlePasswordChange}
                          className='mt-2 w-full  rounded-[4px] border border-[#DCE3EA] px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-100'
                          placeholder='Create a new password'
                        />
                      </div>

                      <div>
                        <label className='block text-xs font-semibold uppercase tracking-[0.22em] text-slate-500'>
                          Confirm New Password
                        </label>
                        <input
                          type='password'
                          name='confirmNewPassword'
                          value={password.confirmNewPassword}
                          onChange={handlePasswordChange}
                          className='mt-2 w-full  rounded-[4px] border border-[#DCE3EA] px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-100'
                          placeholder='Confirm your new password'
                        />
                      </div>

                      <button className='inline-flex items-center justify-center rounded-[4px] bg-[#D4A017] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-600'>
                        Update Password
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {activeTab === "profile" && (
                <aside className='space-y-6'>
                  <div className='rounded-[26px] border border-slate-200 bg-white p-6 text-center text-black shadow-sm'>
                    <div className='mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-slate-800'>
                      <span className='text-3xl'>👤</span>
                    </div>
                    <h3 className='mt-5 text-xl font-semibold'>
                      John Anderson
                    </h3>
                    <p className='mt-1 text-sm text-slate-400'>
                      Premium Member
                    </p>
                  </div>

                  <div className='rounded-[26px] bg-[#D4A01733] p-6 shadow-sm'>
                    <h4 className='text-[16px] font-semibold text-black'>
                      Contact Information
                    </h4>
                    <div className='mt-5 space-y-3 text-sm text-slate-700'>
                      <div className='flex items-center gap-1'>
                        <span className='text-slate-500'>
                          <CiMail />
                        </span>
                        <span>deanna.curtis@example.com</span>
                      </div>
                      <div className='flex items-center gap-1'>
                        <span className='text-slate-500'>
                          <IoMdCall />
                        </span>
                        <span>3435454546t</span>
                      </div>
                      <div className='flex items-center gap-1'>
                        <span className='text-slate-500'>
                          <CgFileDocument />
                        </span>
                        <span>Louis Vuitton</span>
                      </div>
                      <div className='flex items-center gap-1'>
                        <span className='text-slate-500'>
                          <IoLocationOutline />
                        </span>
                        <span>2972 Westheimer Rd. Santa</span>
                      </div>
                    </div>
                  </div>
                </aside>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettingsPage;
