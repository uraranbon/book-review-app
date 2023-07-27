import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { url } from "../const";
import "./UpdateProfile.css";

const UpdateProfile = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({
    name: "",
  });

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
      navigate("/signup");
    }

    if (authToken) {
      // ユーザー名を取得
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`${url}/users`, {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          });

          setUserData(response.data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching user data:", error);
          setLoading(false);
        }
      };

      fetchUserData();
    }
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const authToken = localStorage.getItem("authToken");

    try {
      await axios.put(`${url}/users`, userData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      navigate("/");
    } catch (error) {
      console.error("Error updating user data:", error);
      alert("ユーザー名の更新に失敗しました");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="profile-form">
        <div className="wrap">
          <label>名前:</label>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="button">
          更新する
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
