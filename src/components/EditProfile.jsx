import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <>
      <div className="flex justify-center my-10">
        <div className="flex justify-center mx-10">
          <div className="card bg-base-100 w-96 shadow-xl">
            <div className="card-body">
              <h2 className="card-title justify-center">Edit Profile</h2>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Firstname:</span>
                </div>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />

                <div className="label">
                  <span className="label-text">Lastname:</span>
                </div>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />

                <div className="label">
                  <span className="label-text">Profile Picture:</span>
                </div>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />

                <div className="label">
                  <span className="label-text">Age:</span>
                </div>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />

                <div className="label">
                  <span className="label-text">Gender:</span>
                </div>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                />

                <div className="label">
                  <span className="label-text">Your bio:</span>
                </div>
                <textarea
                  className="
                            textarea textarea-bordered h-24"
                  placeholder="Bio"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                ></textarea>
              </label>

              <p className="text-red-500">{error}</p>
              <div className="card-actions justify-center my-4">
                <button className="btn btn-primary" onClick={saveProfile}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>

        <UserCard
          user={{ firstName, lastName, photoUrl, age, gender, about }}
          preview={true}
        />
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
