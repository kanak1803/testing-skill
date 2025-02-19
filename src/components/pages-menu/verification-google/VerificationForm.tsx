"use client";

import { Fragment, useState } from "react";
// import EmailOtp from "@/components/pages-menu/verification/EmailOtp";
import PhoneNumber from "./PhoneNumber";
import PhoneOtp from "./PhoneOtp";
// import Phone from "./Phone";




const VerificationForm = () => {

  const [phoneVerificationId, setPhoneVerificationId] = useState<string>('')
  
  return (
    <Fragment>
        {/* <EmailOtp /> */}
        <br />
        <PhoneNumber setPhoneVerificationId={setPhoneVerificationId} />
        <PhoneOtp phoneVerificationId={phoneVerificationId}/>
    </Fragment>
  );
};

export default VerificationForm;
