import { ELocalStorage } from "@/enum/localStorage/localStorage.enum";
import { auth } from "@/lib/firebase/config";
import { postOAuthGoogleAuthAsync } from "@/lib/store/feature/auth/oauth/oauthSlice";
import { useAppDispatch } from "@/lib/store/hook";
import { LocalStorageUtils } from "@/utils/localStorage/localStorageUtils";
import { GoogleAuthProvider, signInWithPopup, UserCredential } from "firebase/auth";

const LoginWithSocial = () => {
  
  const dispatch = useAppDispatch()

  const provider = new GoogleAuthProvider();

  const googleAuth = () => {
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    signInWithPopup(auth, provider)
    .then((result: UserCredential) => {
      console.log(result,"result")
      const credential = GoogleAuthProvider.credentialFromResult(result);
      // const accessToken = credential?.accessToken;
      // const credential: any = result.user;
      console.log(credential,"crendential")
      const ipId: string | null = LocalStorageUtils.get(ELocalStorage.IpId)
      if(ipId && credential?.accessToken) {
        dispatch(postOAuthGoogleAuthAsync({ip_id: Number(ipId), id_token: credential.accessToken }))
      }
    })
    .catch((error: { message: string; code: string }) => {
      console.error("Error during Google Auth:", error);
    });
  }

  return (
    <div className="btn-box row buttons-centers" onClick={googleAuth}>
      <div className="col-lg-6 col-md-12 ">
        <a href="#" className="theme-btn social-btn-two google-btn">
          <i className="fab fa-google"></i> Log In via Gmail
        </a>
      </div>
     
    </div>
  );
};

export default LoginWithSocial;
