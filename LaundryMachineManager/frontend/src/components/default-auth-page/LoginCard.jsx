import ButtonSmall from "../global/ButtonSmall";

export default function LoginCard({ toggle }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Successful");
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
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter email"
              required
            />
          </label>

          <label className="flex flex-col">
            <p>Password</p>
            <input
              type="password"
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter password"
              minLength="8"
              required
            />
          </label>

          <ButtonSmall
            name={"Login"}
            type="submit"
            onClick={() => console.log("Login Submitted")}
          />
          <small>
            Don't have an account?{" "}
            <span
              className=" text-blue-500 hover:underline whitespace-nowrap hover:cursor-pointer"
              onClick={toggle}
            >
              Sign up
            </span>
          </small>
        </form>
      </section>
    </div>
  );
}
