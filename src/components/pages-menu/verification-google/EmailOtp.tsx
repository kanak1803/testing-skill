'use client';

import { ELocalStorage } from "@/enum/localStorage/localStorage.enum";
import { postVerifyEmailAsync } from "@/lib/store/feature/auth/signup/signupSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hook";
import { LocalStorageUtils } from "@/utils/localStorage/localStorageUtils";
import { useFormik } from "formik";
import { object, string } from "yup";
import { toast } from 'react-toastify'
import { useEffect } from "react";

interface IinitalValue {
    email_otp: string,
}

const EmailOtp = () => {
    
    const dispatch = useAppDispatch();
    const data = useAppSelector((state) => state.signup)

    useEffect(() => {
        console.log(data.error, 'testing data')
        if(data.error) errorToast(data.error)
    }, [data])
    
    const errorToast = (message: string): void => {
        toast.error(message, {
            position: 'top-center'
        });
    }

    const postVerifyEmail = (emailOtp: string) => {
        const authId: number | null = Number(LocalStorageUtils.get(ELocalStorage.AuthId));
        dispatch(postVerifyEmailAsync({ auth_id: authId, otp: emailOtp.toString() }));
    }

    // const initialValues: IinitalValue = {
    //     email_otp: ''
    // }
    
    const validationSchema = object({
        email_otp: string()
        .required('Email otp is required')
        .length(6, 'Otp should be of 6 character')
    })
    
    const onSubmit = ({ email_otp }: IinitalValue) => {
            postVerifyEmail(email_otp)
    }

    const {
        dirty,
        isValid,
        errors,
        values,
        handleSubmit,
        handleChange,
        handleBlur,
        touched
    } = useFormik<IinitalValue>({
        initialValues: {
            email_otp: ''
        },
        validationSchema: validationSchema,
        onSubmit: onSubmit,
    });
    
    return (
        <form className="form-group row" onSubmit={handleSubmit}>
            <div className="col-lg-6 col-md-12 col-sm-12">
                <input
                type="number"
                name="email_otp"
                value={values.email_otp}
                onChange={handleChange}
                onBlur={handleBlur}
                className="form-control [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                placeholder="Email OTP"
                />
            {errors.email_otp && touched.email_otp && (
                <div className="text-red-500 text-sm mt-1">{errors.email_otp}</div>
            )}
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12 form-group">
                <button className="theme-btn btn-style-one disabled:bg-gray-500" type="submit" disabled={ !(dirty && isValid)} >Submit OTP</button>
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 form-group">
          <p>
            Didn&apos;t receive? (30sec) <a href=""><b className="bluecolour">Resend</b></a> &nbsp;
            <a href=""><b className="bluecolour">Change email</b></a>
          </p>
        </div>
        </form>
        
    )
}

export default EmailOtp;