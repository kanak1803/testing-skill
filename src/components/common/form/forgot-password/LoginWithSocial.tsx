"use client";
// import { auth, provider } from "./Config";
// import { signInWithPopup } from "firebase/auth";
// import {useState,useEffect} from "react"
// import FormContent from "./FormContent";
// import { UserAuth } from "@/app/context/AuthContext";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";


const LoginWithSocial = () => {

  // const { user, googleSignIn, logOut } = UserAuth();
  // console.log(auth)
  // const router = useRouter();
  // console.log(googleSignIn)
  // console.log(result.user)
  // const handleSignIn = async () => {
  //   try {
  //     // const signedInUser = await googleSignIn();
  //     // add a login if the verification completes then  only navigate to verification page
  //     if(signedInUser){
  //       router.push("/verification")
  //     }else{
  //       prompt("sign in failed")
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  return (
    <div className="btn-box row buttons-centers">
      <div className="col-lg-6 col-md-12">
        <a className="theme-btn social-btn-two google-btn">
          <i className="fab fa-google"></i> Continue with Google
        </a>
      </div>
    </div>
  );
};

export default LoginWithSocial;
