import ButtonSmall from "../global/ButtonSmall";
import { handleLoginDefaultUser } from "../../services/authService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginCard({ toggle }) {
  const [uemail, setUemail] = useState("");
  const [upassword, setUpassword] = useState("");
  const [isLoginAsRm, setIsLoginAsRm] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoginAsRm) {
      navigate("/rm");
    } else {
      try {
        const response = await handleLoginDefaultUser(uemail, upassword);
        console.log("Login Success!", response);
        navigate("/home");
      } catch (err) {
        console.error(err.message);
        alert("Invalid Email or Password");
      }
    }
  };

  const handleSignUp = async (e) => {
    try {
      navigate("/register");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <section className="flex flex-col justify-center items-center h-fit w-fit rounded-3xl p-10 bg-widget shadow-lg">
        <h1>Login</h1>
        <form className="flex flex-col gap-4 w-64" onSubmit={handleSubmit}>
          <label className="flex flex-col">
            <p>Email</p>
            <input
              type="email"
              value={uemail}
              onChange={(e) => setUemail(e.target.value)}
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter email"
              required
            />
          </label>

          <label className="flex flex-col">
            <p>Password</p>
            <input
              type="password"
              autoComplete="on"
              value={upassword}
              onChange={(e) => setUpassword(e.target.value)}
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter password"
              minLength="8"
              required
            />
          </label>
          <label className="flex items-center gap-2 text-small-xl">
            <input
              type="checkbox"
              name="feedbackFilter"
              checked={isLoginAsRm}
              onChange={() => setIsLoginAsRm((prev) => !prev)}
              className="h-4 w-4"
            />
            Login as Resident manager
          </label>
          <ButtonSmall name={"Login"} type="submit" />
          <small>
            Don't have an account?{" "}
            <span
              className=" text-blue-500 hover:underline whitespace-nowrap hover:cursor-pointer"
              onClick={handleSignUp}
            >
              Sign up
            </span>
          </small>
        </form>
      </section>
    </div>
  );
}
