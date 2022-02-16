import IUser from "./user";

interface ISignUpFormValue extends IUser {
  confirmpassword: string;
}

export default ISignUpFormValue;
