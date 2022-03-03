namespace NodeJS {
  interface ProcessEnv extends NodeJS.ProcessEnv {
    NEXT_PUBLIC_SPOTIFY_ID: string;
    NEXT_PUBLIC_SPOTIFY_SECRET: string;
    NEXTAUTH_URL: string;
    JWT_SECRET: string;
  }
}
