import React, { useState } from "react";
import { account, databases, DATABASE_ID, COLLECTION_ID } from "../appwrite";
import { ID, Permission, Role } from "appwrite";
import { useNavigate } from "react-router-dom";


export default function AuthPage() {
  const [tab, setTab] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [occupation, setOccupation] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  // ---------------- LOGIN ------------------
  const handleLogin = async () => {
    setMessage("");
    try {
      await account.createEmailPasswordSession(email, password);
      navigate("/"); // redirect to home
    } catch (err) {
      setMessage(err.message);
    }
  };

  // ---------------- SIGNUP ------------------
  const handleSignup = async () => {
    setMessage("");
    try {
      // 1️⃣ Create Appwrite user
      const user = await account.create(
        ID.unique(),
        email,
        password,
        name
      );

      // 2️⃣ Auto-login user
      await account.createEmailPasswordSession(email, password);

      // 3️⃣ Save user profile into database
      await databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        {
          userId: user.$id,
          name,
          occupation,
          email,
          phone,
        },
        [
          Permission.read(Role.user(user.$id)),
          Permission.update(Role.user(user.$id)),
          Permission.delete(Role.user(user.$id)),
        ]
      );

      navigate("/"); // redirect to home
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className="w-full h-screen bg-[#02040a] flex items-center justify-center relative">
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20 pointer-events-none"></div>

      <div className="glass-card w-[380px] rounded-2xl p-8 text-white relative z-10">
        <h1 className="text-3xl font-bold mb-4">
          {tab === "login" ? "Welcome Back" : "Create Account"}
        </h1>

        {/* EXTRA FIELDS FOR SIGNUP */}
        {tab === "signup" && (
          <>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-3 rounded-lg bg-transparent border border-cyan-300/30 outline-none mb-3"
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="text"
              placeholder="Occupation"
              className="w-full p-3 rounded-lg bg-transparent border border-cyan-300/30 outline-none mb-3"
              onChange={(e) => setOccupation(e.target.value)}
            />

            <input
              type="text"
              placeholder="Phone Number (optional)"
              className="w-full p-3 rounded-lg bg-transparent border border-cyan-300/30 outline-none mb-3"
              onChange={(e) => setPhone(e.target.value)}
            />
          </>
        )}

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded-lg bg-transparent border border-cyan-300/30 outline-none mb-3"
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded-lg bg-transparent border border-cyan-300/30 outline-none mb-3"
          onChange={(e) => setPassword(e.target.value)}
        />

        {message && <p className="text-sm text-red-400 mb-3">{message}</p>}

        <button
          onClick={tab === "login" ? handleLogin : handleSignup}
          className="w-full py-2 rounded-lg bg-gradient-to-r from-blue-500 to-green-400 text-black font-semibold mb-3"
        >
          {tab === "login" ? "Log In" : "Sign Up"}
        </button>

        <button
          onClick={() => setTab(tab === "login" ? "signup" : "login")}
          className="w-full py-2 rounded-lg border border-cyan-300 text-cyan-300"
        >
          {tab === "login"
            ? "Don't have an account? Sign Up"
            : "Already have an account? Log In"}
        </button>
      </div>
    </div>
  );
}
