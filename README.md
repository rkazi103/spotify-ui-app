
# Spotify Clone

This is a clone of Spotify _for educational purposes_.
## Authors

- [@rkazi103](https://www.github.com/rkazi103)


## Demo


- Click [here](https://spotify-ui-app.vercel.app/) to see a demo

## Tech Stack

**Client:** Next JS, Tailwind CSS, Recoil

**Server:** Next Auth, Spotify API


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`NEXT_PUBLIC_SPOTIFY_ID`

This is the client ID from the Spotify project.

`NEXT_PUBLIC_SPOTIFY_SECRET`

This is the client secret from the Spotify project.

`JWT_SECRET`

This is the JWT secret used to encrypt JWT tokens.

`NEXTAUTH_URL`

This is the URL `next-auth` uses.

## Features

- Fully Mobile Responsive
- Authentication using Spotify
- Can play music if you have Spotify Premium
- Has volume functionality for music

## Run Locally

Clone the project

```bash
  git clone https://github.com/rkazi103/spotify-ui-app
```

Go to the project directory

```bash
  cd spotify-ui-app
```

Install dependencies

```bash
  yarn
```

Start the server

```bash
  yarn dev
```

# License
[GNU General Public License](https://github.com/rkazi103/spotify-ui-app/blob/main/LICENSE) © 2021 [Rayan Kazi](https://github.com/rkazi103)