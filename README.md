# Card & Overview Website
This site bundles my social media channels & give an overview of some things I've done w/ links! 🦊

## Using Analog as a SSG
Used <img src="./public/software/analog.svg" width="20"/> [Analog](https://analogjs.org) to generate static pages, the stack is:
- <img src="./public/software/vite.svg" width="20"/> [Vite](https://vite.dev/) `v7.0`
- <img src="./public/software/angular.svg" width="20"/> [Angular](https://vite.dev/) `v20.1`
- <img src="./public/software/tailwindcss.svg" width="20"/> [Tailwind CSS](https://tailwindcss.com/) `v4.1`

Is it overkill for this purpose? `yes 🐢`

## How To Run

### Setup
Run `npm install` to install the application dependencies.

### Development
Run `npm start` for a dev server. Navigate to `http://localhost:5173/`. The application automatically reloads if you change any of the source files.

### Build
Run `npm run build` to build the client/server project. The client build artifacts are located in the `dist/analog/public` directory. The server for the API build artifacts are located in the `dist/analog/server` directory.

### Test
Run `npm run test` to run unit tests with [Vitest](https://vitest.dev).
