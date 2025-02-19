'use client'

import { ELocalStorage } from "@/enum/localStorage/localStorage.enum";
import { auth } from "@/lib/firebase/config";
import { patchSendPhoneAsync } from "@/lib/store/feature/auth/signup/signupSlice";
import { useAppDispatch } from "@/lib/store/hook";
import { LocalStorageUtils } from "@/utils/localStorage/localStorageUtils";
import { ConfirmationResult, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useFormik } from "formik";
import { Fragment, useEffect, useState, Dispatch } from "react";

interface PhoneNumberProps {
    setPhoneVerificationId: Dispatch<React.SetStateAction<string>>;
}

const Phone: React.FC<PhoneNumberProps> = ({ setPhoneVerificationId }) => {


    const [recaptcharVerifier, serRecaptchaVerifier] = useState<RecaptchaVerifier | null>(null);
    const dispatch = useAppDispatch()
    
    const iniitreRecaptcha = () => {
        const recaptcharVerifier: RecaptchaVerifier = new RecaptchaVerifier(auth, 'sign-in-button', {
            'size': 'invisible',
            'callback': (response: string) => {
                console.log(response);
            },
            'expired-callback': () => {
                console.log("reCAPTCHA expired");
            }
        })
        serRecaptchaVerifier(recaptcharVerifier);
        recaptcharVerifier.render();
    }

    useEffect(() => {
        iniitreRecaptcha();
    },[])
    
    const signPhoneNumber = (phone_number: string) => {
        const phone: string = `+${phone_number}`;
        if(recaptcharVerifier) {
            signInWithPhoneNumber(auth, phone, recaptcharVerifier)
            .then((confirmationResult: ConfirmationResult) => {
                setPhoneVerificationId(confirmationResult.verificationId);
                patchSendPhone(phone_number)
            })
            .catch((error) => console.log(error))
        }
    }

    const patchSendPhone = (phoneNumber: string) => { 
        const authId: string | null = LocalStorageUtils.get(ELocalStorage.AuthId);
        if(authId) {
            dispatch(patchSendPhoneAsync({auth_id: Number(authId), phone_number: phoneNumber }))
        }
    } 



    const {
        values,
        handleChange,
        handleBlur,
        errors,
        touched,
        dirty,
        isValid,
        handleSubmit
    } = useFormik({
        initialValues: {
            phone_number: '',
        },
        onSubmit: ({phone_number}) => {
            signPhoneNumber(phone_number)
        }
    })

    return (
        <Fragment>
            <form className="form-group row" onSubmit={handleSubmit}>
                <div className="col-lg-6 col-md-12 col-sm-12">
                <input
                type="number"
                name="phone_number"
                value={values.phone_number}
                onChange={handleChange}
                onBlur={handleBlur}
                className="form-control [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                placeholder="Enter your phone number"
                />
            {errors.phone_number && touched.phone_number && (
                <div className="text-red-500 text-sm mt-1">{errors.phone_number}</div>
            )}
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12 form-group">
                <button className="theme-btn btn-style-one disabled:bg-gray-500" type="submit" disabled={!( dirty && isValid )} >Send OTP</button>
            </div>
        </form>
        <div id="sign-in-button"></div>
        </Fragment>
    )
}

export default Phone;