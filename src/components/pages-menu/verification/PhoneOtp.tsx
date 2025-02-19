import { ELocalStorage } from "@/enum/localStorage/localStorage.enum";
import { auth } from "@/lib/firebase/config";
import { patchVerifyPhoneAsync } from "@/lib/store/feature/auth/signup/signupSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hook";
import { LocalStorageUtils } from "@/utils/localStorage/localStorageUtils";
import { PhoneAuthProvider, signInWithCredential, UserCredential } from "firebase/auth";
import { useFormik } from "formik"
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { object, string } from "yup";

interface IinitalValue {
    mobile_otp: string,   
}

const PhoneOtp = ({ phoneVerificationId }: { phoneVerificationId: string }) => {

    const dispatch = useAppDispatch();
    const router = useRouter()
    const { redirect } = useAppSelector((state) => state.signup)
    
    useEffect(() => {
        if(redirect) router.push(redirect);
    }, [redirect, router])

    const validationSchema = object({
        mobile_otp: string()
        .required('Email otp is required')
        .length(6, 'Otp should be of 6 character')
    })

    const verifyPhoneNumber = (token: string) => {
        dispatch(patchVerifyPhoneAsync({auth_id: Number(LocalStorageUtils.get(ELocalStorage.AuthId)), id_token: token }))
    }
    
    const otpVerify = async (otp: string) => {
        const credential = PhoneAuthProvider.credential(phoneVerificationId, otp.toString())
        /* eslint-disable @typescript-eslint/no-explicit-any */
        const { user }: UserCredential | any = await signInWithCredential(auth, credential)
        const token: any = user.accessToken
        verifyPhoneNumber(token);
    }

    const onSubmit = ({mobile_otp}: IinitalValue) => {
        otpVerify(mobile_otp)
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
            mobile_otp: ''
        },
        validationSchema: validationSchema,
        onSubmit: onSubmit,
    });
    
    return (
        <form className="form-group row" onSubmit={handleSubmit}>
            <label htmlFor="mobileOtp" className="verify-input-labels">Mobile OTP</label>
            <div className="col-lg-6 col-md-12 col-sm-12">
                <input
                type="number"
                name="mobile_otp"
                value={values.mobile_otp}
                onChange={handleChange}
                onBlur={handleBlur}
                className="form-control [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                placeholder="Enter Mobile OTP"
                />
                {errors.mobile_otp && touched.mobile_otp && (
                <div className="text-red-500 text-sm mt-1">{errors.mobile_otp}</div>)}
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12 form-group">
                <button className="theme-btn btn-style-one disabled:bg-gray-500" type="submit" disabled={ !(dirty && isValid)} >Submit OTP</button>
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                <p>Didn&apos;t receive? (30sec) <a href=""><b className="bluecolour">Resend</b></a></p>
             </div>
        </form>       
    )
}

export default PhoneOtp;