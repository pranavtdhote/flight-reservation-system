// src/components/UserProfile.tsx
import React, { useEffect, useState } from "react";
import { createUser, updateUser, getUser } from "../api/api";

type Props = { userId?: string; onProfileReady?: (id: string) => void };

const UserProfile: React.FC<Props> = ({ userId, onProfileReady }) => {
  const [user, setUser] = useState({ _id: "", name: "", email: "" });
  const [edit, setEdit] = useState(!userId);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (userId) {
      (async () => {
        try {
          const res = await getUser(userId);
          setUser(res.data);
        } catch {
          setMsg("User not found");
        }
      })();
    }
  }, [userId]);

  const save = async () => {
    try {
      if (user._id) {
        await updateUser(user._id, user);
        setMsg("Profile updated");
      } else {
        const res = await createUser({ name: user.name, email: user.email });
        setUser(res.data);
        setMsg("Profile created");
        onProfileReady?.(res.data._id);
      }
      setEdit(false);
    } catch {
      setMsg("Save failed");
    }
  };

  return (
    <div className="card">
      <div className="h-title">Your Profile</div>
      <input name="name" placeholder="Name" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} disabled={!edit} />
      <input name="email" placeholder="Email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} disabled={!edit} />
      <div style={{ display: "flex", gap: 8 }}>
        {edit ? <button className="button" onClick={save}>Save</button> : <button className="button" onClick={() => setEdit(true)}>Edit</button>}
        {msg && <div className="small" style={{ alignSelf: "center" }}>{msg}</div>}
      </div>
    </div>
  );
};

export default UserProfile;
