"use client";

import { Fragment, useEffect, useState } from "react";
import EmailOtp from "@/components/pages-menu/verification/EmailOtp";
import PhoneNumber from "./PhoneNumber";
import PhoneOtp from "./PhoneOtp";
import { CookierUtils } from "@/utils/cookie/cookie.utils";
import { ECookie } from "@/enum/cookie/cookie.enum";
import { EStepAuthType } from "@/enum/auth/auth_step.enum";
const VerificationForm = () => {

  const [phoneVerificationId, setPhoneVerificationId] = useState<string>('')
  const [authStep, setAuthStep] = useState<EStepAuthType>(EStepAuthType.EmailOtp);

  useEffect(() => {
    const authStep = CookierUtils.getCookie(ECookie.AuthStep)
    setAuthStep(EStepAuthType.EmailOtp);
  }, [])

  function showComponent(authStep: EStepAuthType) {

    switch(authStep) {
      case EStepAuthType.EmailOtp: {
        return <EmailOtp setAuthStep={ setAuthStep } />
      }
      case EStepAuthType.PhoneNotVerified: {
        return <PhoneNumber setPhoneVerificationId={ setPhoneVerificationId } />
      }
      case EStepAuthType.PhoneOtp: {
        return <PhoneOtp phoneVerificationId={ phoneVerificationId } />
      }
      default: {
        return <h1>Some this went wrong</h1>
      }
    }
  }
  
  return (
    <Fragment>
      {
        showComponent(authStep)
      }
    </Fragment>
  );
};

export default VerificationForm;
