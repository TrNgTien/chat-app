import React from "react";
import { GoogleLogin } from "react-google-login";
import "./styles/GoogleButton.scss";
interface GoogleLoginProps {
  clientId: any;
  accessType: string;
  responseType: string;
  onSuccess: (response: any) => void;
  onFailure: (response: any) => void;
  cookiePolicy: string;
  authenType: string;
}
const GoogleButton: React.FunctionComponent<GoogleLoginProps> = (
  props: GoogleLoginProps
) => {
  return (
    <div className="wrapper-btn">
      <GoogleLogin
        className="btn-google"
        clientId={props.clientId}
        buttonText={
          props.authenType === "register"
            ? "Sign up with Google"
            : "Login with Google"
        }
        onSuccess={props.onSuccess}
        onFailure={props.onFailure}
        cookiePolicy={props.cookiePolicy}
      />
    </div>
  );
};
export default GoogleButton;
