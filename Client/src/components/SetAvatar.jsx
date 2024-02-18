// import React, { useEffect, useState } from "react";
// import styled from "styled-components";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import Buffer from 'buffer';
// import { setAvatarRoute } from "../utils/APIRoutes";
// import loader from "../assets/loader.gif";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export default function SetAvatar() {
//   const api = `https://api.multiavatar.com/4645646`;

//   const navigate = useNavigate();
//   const [avatars, setAvatars] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [selectedAvatar, setSelectedAvatar] = useState(undefined);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         if (!localStorage.getItem("chatApp-user")) {
//           navigate("/login");
//         } else {
//           const data = [];
//           for (let i = 0; i < 4; i++) {
//             const image = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`, { responseType: 'arraybuffer' });
//             const base64 = Buffer.from(image.data, 'binary').toString('base64');
//             data.push(base64);
//           }
//           setAvatars(data);
//           setIsLoading(false);
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, [api, navigate]);

//   const toastOptions = {
//     position: "bottom-right",
//     autoClose: 8000,
//     pauseOnHover: true,
//     draggable: true,
//     theme: "dark",
//   };

//   const setProfilePicture = async () => {
//     try {
//       if (selectedAvatar === undefined) {
//         toast.error("Please select an avatar", toastOptions);
//       } 
//       else {
//         console.log(avatars[selectedAvatar])

//         const user = JSON.parse(localStorage.getItem("chatApp-user"));
//          console.log(`${setAvatarRoute}/${user._id}`)
//         const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
//           image : avatars[selectedAvatar],
//         });
        
//         // console.log(data);
//         if (data.isSet) {
//           user.isAvatarImageSet = true;
//           user.avatarImage = data.image;
//           localStorage.setItem("chatApp-user", JSON.stringify(user));
//           navigate("/");
//         } else {
//           toast.error("Error setting avatar. Please try again.", toastOptions);
//         }
//       }
//     } catch (error) {
//       console.log("Error setting profile picture:", error);
//       toast.error("Error setting avatar. Please try again.", toastOptions);
//     }
//   };

//   return (
//     <>
//       {isLoading ? (
//         <Container>
//           <img src={loader} alt="loader" className="loader" />
//         </Container>
//       ) : (
//         <Container>
//           <div className="title-container">
//             <h1>Pick an Avatar as your profile picture</h1>
//           </div>
//           <div className="avatars">
//             {avatars.map((avatar, index) => (
//               <div
//                 className={`avatar ${selectedAvatar === index ? "selected" : ""}`}
//                 key={index}
//                 onClick={() => setSelectedAvatar(index)}
//               >
//                 <img src={`data:image/svg+xml;base64,${avatar}`} alt="avatar" />
//               </div>
//             ))}
//           </div>
//           <button onClick={setProfilePicture} className="submit-btn">
//             Set as Profile Picture
//           </button>
//           <ToastContainer />
//         </Container>
//       )}
//     </>
//   );
// }

// const Container = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   flex-direction: column;
//   gap: 3rem;
//   background-color: #131324;
//   height: 100vh;
//   width: 100vw;

//   .loader {
//     max-inline-size: 100%;
//   }

//   .title-container {
//     h1 {
//       color: white;
//     }
//   }

//   .avatars {
//     display: flex;
//     gap: 2rem;

//     .avatar {
//       border: 0.4rem solid transparent;
//       padding: 0.4rem;
//       border-radius: 5rem;
//       display: flex;
//       justify-content: center;
//       align-items: center;
//       transition: 0.5s ease-in-out;

//       img {
//         height: 6rem;
//         transition: 0.5s ease-in-out;
//       }
//     }

//     .selected {
//       border: 0.4rem solid #4e0eff;
//     }
//   }

//   .submit-btn {
//     background-color: #4e0eff;
//     color: white;
//     padding: 1rem 2rem;
//     border: none;
//     font-weight: bold;
//     cursor: pointer;
//     border-radius: 0.4rem;
//     font-size: 1rem;
//     text-transform: uppercase;

//     &:hover {
//       background-color: #4e0eff;
//     }
//   }
// `;

// seccccccccccccccccccccccccccccc





import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setAvatarRoute } from "../utils/APIRoutes";
import loader from "../assets/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SetAvatar() {
  const api = `https://api.multiavatar.com/4645646`;

  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
          navigate("/login");
        } else {
          const data = [];
          for (let i = 0; i < 4; i++) {
            const image = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`, { responseType: 'blob' });
            const base64 = await convertBlobToBase64(image.data);
            data.push(base64);
          }
          setAvatars(data);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [api, navigate]);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const setProfilePicture = async () => {
    try {
      if (selectedAvatar === undefined) {
        toast.error("Please select an avatar", toastOptions);
      } else {
        const user = JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY));
           console.log(user._id);
        const { data } = await axios.post(`http://localhost:5000/api/auth/setavatar/${user._id}`, {
          image: avatars[selectedAvatar],
        });

        if (data.isSet) {
          user.isAvatarImageSet = true;
          user.avatarImage = data.image;
          localStorage.setItem("chatApp-user", JSON.stringify(user));
          navigate("/");
        } else {
          toast.error("Error setting avatar. Please try again.", toastOptions);
        }
      }
    } catch (error) {
      console.error("Error setting profile picture:", error);
      toast.error("Error setting avatar. Please try again.", toastOptions);
    }
  };

  // Function to convert Blob to base64 string
  const convertBlobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(blob);
    });
  };

  return (
    <>
      {isLoading ? (
        <Container>
          <img src={loader} alt="loader" className="loader" />
        </Container>
      ) : (
        <Container>
          <div className="title-container">
            <h1>Pick an Avatar as your profile picture</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, index) => (
              <div
                className={`avatar ${selectedAvatar === index ? "selected" : ""}`}
                key={index}
                onClick={() => setSelectedAvatar(index)}
              >
                <img src={`data:image/svg+xml;base64,${avatar}`} alt="avatar" />
              </div>
            ))}
          </div>
          <button onClick={setProfilePicture} className="submit-btn">
            Set as Profile Picture
          </button>
          <ToastContainer />
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;

  .loader {
    max-inline-size: 100%;
  }

  .title-container {
    h1 {
      color: white;
    }
  }

  .avatars {
    display: flex;
    gap: 2rem;

    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;

      img {
        height: 6rem;
        transition: 0.5s ease-in-out;
      }
    }

    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }

  .submit-btn {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;

    &:hover {
      background-color: #4e0eff;
    }
  }
`;
