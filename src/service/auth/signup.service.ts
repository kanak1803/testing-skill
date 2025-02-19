import axiosInstance from "@/lib/axiosInstance";

export class SignupService {
  static path = "/signup";

  static postSendEmail = (body: {
    ip_id: number,
    email: string,
    password: string,
  }) => {
    return axiosInstance.post(`/auth${this.path}/recruiter/sendEmail`, body, {
      withCredentials: true
    });
  };

  /**
   * @url https://api.domain.in/api/auth/signup/recruiter/verifyEmail
   * @method POST
   * @param {number} otp
   * @param {Types.ObjectId} auth_id
   * @description To verify email otp
   */
  static postVerifyEmail = (body: { auth_id: number; otp: string }) => {
    return axiosInstance.post(`/auth${this.path}/recruiter/verifyEmail`, body, {
      withCredentials: true
    });
  };

  /**
   * @url https://betabackend.skillbuddy.in/api/phone
   * @param {number} auth_id
   * @param {string} phone
   * @description To save the partial information about the user phone, if user comes first time
   */
  static patchSendPhone = (body: { auth_id: number; phone_number: string }) => {
    return axiosInstance.patch("auth/phone", body, {
      withCredentials: true
    });
  };

  /**
   * @url https://api.domain.in/api/auth/signup/verifyPhone
   * @method PATCH
   * @param {number} auth_id
   * @param {string} id_token
   * @description To check phone numer is verifyied or not
   */

  static patchVerifyPhone = (body: { auth_id: number; id_token: string }) => {
    return axiosInstance.post(`auth${this.path}/recruiter/verifyPhone`, body, {
      withCredentials: true,
    });
  };
}
