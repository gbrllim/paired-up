//-----------Todo-----------//
/*
- Make background image updates work
- Remove state helper
*/
//-----------Libraries-----------//
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion-3d";

//-----------Firebase-----------//
import { auth } from "../firebase/firebase.js";
import { onAuthStateChanged } from "firebase/auth";

//-----------Components-----------//
import AppButton from "../Details/AppButton.js";
import CoupleDetails from "../Components/Home/CoupleDetails.js";
import NextDate from "../Components/Home/NextDate.js";
import StateHelper from "../Components/Helpers/StateHelper.js";

//-----------Media-----------//
import logo from "../Images/LogosIcons/logo.png";
import person1 from "../Images/LogosIcons/person1.png";
import background from "../Images/wallpaper.png";
import bucketlist from "../Images/LogosIcons/word-icon-bucketlist.png";
import chat from "../Images/LogosIcons/word-icon-chat.png";
import memories from "../Images/LogosIcons/word-icon-memories.png";
import dates from "../Images/LogosIcons/word-icon-dates.png";
import timeCapsule from "../Images/LogosIcons/word-icon-timecapsule.png";
import journal from "../Images/LogosIcons/word-icon-journal.png";

export default function HomePage() {
  const [profilePicture, setProfilePicture] = useState(null);

  const navigate = useNavigate();
  // const isLoggedIn = ContextHelper("isLoggedIn");

  //Pull user data
  useEffect(() => {
    const user = auth.currentUser;
    if (user !== null) {
      setProfilePicture(user.photoURL);
    }
  }, []);

  // Redirect to sign in
  useEffect(
    () =>
      onAuthStateChanged(
        auth,
        (userInfo) => userInfo || navigate("/onboarding"),
      ),
    [],
  );

  return (
    <motion.div
      className="flex h-screen flex-col items-center justify-center"
      initial={{ opacity: 0, scale: 0 }} // Initial state (hidden and scaled down)
      animate={{ opacity: 1, scale: 1 }} // Final state (visible and at full scale)
      transition={{
        duration: 0.8, // Animation duration in seconds
        ease: "easeInOut", // Easing function
      }}
    >
      <nav className="fixed top-0 flex w-screen flex-row justify-between p-3">
        <StateHelper />
        <img
          src={logo}
          alt="import profile"
          className="h-[4em] rounded-xl bg-background object-scale-down p-1 shadow-lg hover:animate-spin"
        />
        <NavLink to="/settings">
          <img
            src={profilePicture ? profilePicture : person1}
            alt="import profile"
            className="h-[4em] w-[4em] rounded-full border-2 border-white bg-background object-contain shadow-md hover:translate-y-[-2px] hover:shadow-background"
          />
        </NavLink>
      </nav>
      <main
        style={{ backgroundImage: `url(${background})` }}
        className=" flex h-full w-screen flex-col items-center justify-between bg-background bg-cover bg-center bg-no-repeat"
      >
        <NextDate />
        <CoupleDetails />
        <nav className="mb-4 grid w-full max-w-[50em] grid-cols-3 gap-3 p-3 md:grid-cols-6">
          <AppButton src={chat} nav="/chat" />
          <AppButton src={memories} nav="/memories" />
          <AppButton src={dates} nav="/dates" />
          <AppButton src={bucketlist} nav="/bucket-list" />
          <AppButton src={timeCapsule} />
          <AppButton src={journal} nav="/journal" />
        </nav>
      </main>
    </motion.div>
  );
}
