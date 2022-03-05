/* eslint-disable @next/next/no-img-element */
import type { GetServerSideProps, NextPage } from "next";
import type { Provider } from "next-auth/providers";
import { getProviders, signIn } from "next-auth/react";

type LoginProps = {
  providers: object;
};

const Login: NextPage<LoginProps> = ({ providers }) => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-black">
      <img
        src="https://i.imgur.com/fPuEa9V.png"
        alt="Spotify Logo"
        className="mb-5 w-52"
      />

      {providers &&
        Object.values(providers).map((provider: Provider) => (
          <div key={provider.name}>
            <button
              className="rounded-full bg-[#18D860] p-5 text-white"
              onClick={() => signIn(provider.id, { callbackUrl: "/" })}
            >
              Login with {provider.name}
            </button>
          </div>
        ))}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
};

export default Login;
