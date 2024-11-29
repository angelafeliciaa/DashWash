import {
  MdLocalLaundryService,
  MdHome,
  MdFeedback,
  MdSettings,
  MdOutlineLogout,
} from "react-icons/md";

import { CgSmartHomeWashMachine } from "react-icons/cg";

export default function Navigator({ isRm }) {
  return (
    <aside className="fixed top-0 left-0 flex h-screen w-[250px] flex-col text-white bg-black rounded-r-2xl">
      <div className="flex flex-row items-center py-6 px-4">
        <MdLocalLaundryService size={40} />
        <p className="font-bold ml-2 text-white">DashWash</p>
      </div>
      <nav className="flex flex-col mt-4 space-y-4">
        {isRm ? (
          <a
            href="/rm"
            className="flex items-center px-4 py-2 hover:bg-gray-700"
          >
            <MdHome size={24} />
            <p className="ml-4 text-white">Home</p>
          </a>
        ) : (
          <a
            href="/home"
            className="flex items-center px-4 py-2 hover:bg-gray-700"
          >
            <MdHome size={24} />
            <p className="ml-4 text-white">Home</p>
          </a>
        )}
        {isRm ? (
          <a
            href="/rm/machines"
            className="flex items-center px-4 py-2 hover:bg-gray-700"
          >
            <CgSmartHomeWashMachine size={24} />
            <p className="ml-4 text-white">Machines</p>
          </a>
        ) : (
          <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-700">
            <MdFeedback size={24} />
            <p className="ml-4 text-white">Feedback</p>
          </a>
        )}
        {!isRm && (
          <a
            href="/settings"
            className="flex items-center px-4 py-2 hover:bg-gray-700"
          >
            <MdSettings size={24} />
            <p className="ml-4 text-white">Settings</p>
          </a>
        )}
      </nav>
      <div className="mt-auto mb-5 flex items-center px-4 py-2 hover:bg-gray-700">
        <MdOutlineLogout size={24} />
        <a href="/" className="flex items-center px-4 py-2 hover:bg-gray-700">
          <p className="ml-4 text-white">Logout</p>
        </a>
      </div>
    </aside>
  );
}
