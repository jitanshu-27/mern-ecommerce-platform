const LoginPage = () => {
  return (
    <div className="max-w-md mx-auto">

      <h1 className="text-3xl font-bold mb-6">
        Login
      </h1>

      <form className="space-y-4">

        <input
          type="email"
          placeholder="Email"
          className="border w-full p-3 rounded"
        />

        <input
          type="password"
          placeholder="Password"
          className="border w-full p-3 rounded"
        />

        <button
          className="bg-black text-white px-5 py-3 rounded w-full"
        >
          Login
        </button>

      </form>

    </div>
  );
};

export default LoginPage;