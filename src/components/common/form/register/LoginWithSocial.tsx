"use state"
import Link from "next/link";
// import { UserAuth } from "../../../../app/context/AuthContext";
// import axios from "axios";
// import { postGoogleAuth } from "@/lib/store/feature/auth/authSlice";
import { GoogleAuthProvider, signInWithPopup, UserCredential  } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { auth } from "@/lib/firebase/config";
// import { useAppDispatch } from "@/lib/hooks";


const googleAuth = () => {

  // const localData = localStorage.getItem('ipId')

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    'login_hint': 'user@example.com'
  })

  signInWithPopup(auth, provider)
  .then( async (result: UserCredential) => {
    await result.user.getIdToken()



  }).catch((error: FirebaseError) => {
    // Log errors for debugging purposes
    console.error("Google Auth Error:", error);
    // ...
  });

}

const LoginWithSocial = () => {

  // const dispatch = useAppDispatch();


    // if(localData) {
    //   dispatch(postGoogleAuth({
    //     email_auth_type: 'google',
    //     id_token: '',
    //     ip_id: localData,
    //   }))
    // }

  return (
    <div className="btn-box row buttons-centers">
      <div className="col-lg-6 col-md-12 ">
        <button onClick={googleAuth} className="theme-btn social-btn-two google-btn">
          <i className="fab fa-google"></i> Continue with Google
        </button>
      </div>
      <div className="col-lg-12 col-md-12 termsandpolicy">
        <p>
          By Continuing you agree to {" "}
          <b>
            <Link href="/terms-and-conditions">T&C</Link>
          </b>{" "}
          and{" "}
          <b>
            <Link href="/privacy-policy">Privacy Policy</Link>
          </b>
        </p>
      </div>
    </div>
  );
};

export default LoginWithSocial;
