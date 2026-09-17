# Holidaze

Hotel web application built with TypeScript, React, Vite, React Router and CSS Modules.

The application allows users to browse venues, view venue details, register and log in, make bookings, and manage venues when logged in as a venue manager.

## Live Demo

View the live site here:

https://jb12-art.github.io/Project-exam-2/

## Features

- View available venues
- Search for venues
- View detailed information about a venue
- Register a new user
- Log in and log out
- View different navigation options depending on the user type
- View venue bookings
- Select available dates in a booking calendar
- Prevent users from selecting already booked dates
- Create bookings
- View and manage venues as a venue manager
- Create new venues
- Edit existing venues
- Update venue information
- Update user profile information
- Upload/update avatar information
- Responsive design for desktop, tablet and mobile
- Deployed using GitHub Pages

## Technologies Used

- React
- TypeScript
- Vite
- React Router
- CSS Modules
- Noroff Holidaze API
- GitHub Pages
- GitHub Actions
- gh-pages

## Getting Started

### Prerequisites

Before installing the project, make sure you have the following installed:

- Node.js
- npm
- Git

You can check if Node.js and npm are installed by running:

```bash
node -v
npm -v
```

You can check Git with:

```bash
git --version
```

## Installing the Project

### 1. Clone the repository

Clone the project from GitHub:

```bash
git clone https://github.com/jb12-art/Project-exam-2.git
```

Move into the project folder:

```bash
cd Project-exam-2
```

### 2. Install dependencies

Install all the packages used by the project:

```bash
npm install
```

The dependencies are listed in `package.json`.

The main packages used by the application are:

- react
- react-dom
- react-router-dom

The development tools include:

- typescript
- vite
- eslint
- gh-pages

### Running the Project Locally

Start the Vite development server with:

```bash
npm run dev
```

Vite will provide a local address in the terminal, normally something similar to:

http://localhost:5173/

Open the address in a browser to view the application.

The development server automatically updates the page when changes are made to the source code.

### Available npm Commands

The project has several commands defined in `package.json`.

### Start the development server

```bash
npm run dev
```

Starts the Vite development server.

### Build the project

```bash
npm run build
```

This runs TypeScript checking and then creates a production build using Vite.

The production files are created in the:

```text
dist/
```

folder.

### Check the code with ESLint

```bash
npm run lint
```

This checks the project for ESLint errors and problems.

### Preview the production build

After running:

```bash
npm run build
```

you can preview the production version locally with:

```bash
npm run preview
```

### GitHub Pages Configuration

The project is deployed to a GitHub Pages repository rather than directly to the domain root.

Because of this, Vite needs to know the project path.

The `vite.config.ts` file contains:

```ts
export default defineConfig({
  plugins: [react()],
  base: '/Project-exam-2/',
});
```

The `base` value tells Vite that the application is hosted inside:

```text
/Project-exam-2/
```

instead of:

```text
/
```

Without this configuration, some assets and paths would not work correctly after deployment.

### React Router basename

The application also uses the GitHub Pages project path in `BrowserRouter`:

```tsx
<BrowserRouter basename="/Project-exam-2">
```

This allows React Router to work correctly when the application is hosted under the repository path.

The routes can still be written normally:

```tsx
<Route path="/" element={<Home />} />
<Route path="/venue/:id" element={<VenueDetails />} />
<Route path="/login" element={<Login />} />
```

### GitHub Pages and 404.html

GitHub Pages can return a 404 error when a user opens a React Router URL directly.

For example, navigating from the Home page to:

```text
/Project-exam-2/venue/123
```

works inside the React application.

However, opening that URL directly in a new browser tab can cause GitHub Pages to look for a physical file at that location.

The project therefore contains:

```text
public/404.html
```

The `404.html` file redirects the requested route back to the React application.

The original route is passed as a redirect query parameter.

The `RedirectHandler` component in `App.tsx` then reads the redirect value and sends React Router to the correct page.

This allows dynamic venue URLs to work when opened directly on GitHub Pages.

### Installing TypeScript, React and Vite

If creating the project from scratch, Vite can be installed directly into the current folder.

Run:

```bash
npm create vite@latest . -- --template react-ts
```

The `.` means that Vite should create the project in the current folder instead of creating a new folder inside it.

Then install the dependencies:

```bash
npm install
```

If you want to be able to deploy manually using `npm run deploy`, install `gh-pages`:

```bash
npm install gh-pages --save-dev
```

The GitHub Actions workflow can also deploy the project automatically when changes are pushed to the `main` branch.

### GitHub Pages Deployment

The project uses GitHub Pages for deployment.

The project also has `gh-pages` installed as a development dependency.

The `package.json` contains:

```json
"homepage": "https://jb12-art.github.io/Project-exam-2/"
```

and the deployment scripts:

```json
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"
```

The `predeploy` script automatically runs the production build before deployment.

The `deploy` script publishes the contents of the `dist` folder to the `gh-pages` branch.

### Manual Deployment

If deploying manually, run:

```bash
npm run deploy
```

The following happens:

1. `predeploy` runs automatically.
2. The project is built using `npm run build`.
3. Vite creates the production files inside `dist`.
4. `gh-pages` publishes the `dist` folder.

### Automatic Deployment with GitHub Actions

The project also contains a GitHub Actions workflow:

```text
.github/workflows/deploy.yml
```

The workflow runs when changes are pushed to the `main` branch.

It:

- Checks out the repository.
- Sets up Node.js.
- Installs the dependencies.
- Builds the project.
- Deploys the `dist` folder to the `gh-pages` branch.

The workflow uses Node.js 20.

The workflow file contains:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: write

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout Source Code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install Dependencies
        run: npm ci

      - name: Build Project
        run: npm run build

      - name: Deploy to GitHub Pages Branch
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          folder: dist
          branch: gh-pages
```

After pushing changes to the `main` branch, GitHub Actions automatically builds and deploys the project.

This means deployment does not have to be done manually after every push.

### Deployment Requirements

For GitHub Actions deployment to work, the repository needs to have GitHub Pages configured to use the deployed `gh-pages` branch.

The GitHub Actions workflow creates or updates the `gh-pages` branch with the contents of the `dist` folder.

### Development Workflow

A basic development workflow for this project is:

1. Start the project.

```bash
npm run dev
```

2. Make changes.

Edit the React, TypeScript or CSS files inside:

```text
src/
```

3. Check for errors.

```bash
npm run lint
```

4. Test the production build.

```bash
npm run build
```

5. Commit changes.

```bash
git add .
git commit -m "Describe the changes"
```

6. Push to GitHub.

```bash
git push
```

When changes are pushed to `main`, GitHub Actions automatically builds and deploys the project.

### Troubleshooting

#### The page works locally but gives a 404 on GitHub Pages

Check that `vite.config.ts` contains:

```ts
base: '/Project-exam-2/',
```

Also check that `BrowserRouter` contains:

```tsx
basename = '/Project-exam-2';
```

Make sure `public/404.html` is also present.

#### Images or assets do not load on GitHub Pages

Check the Vite base configuration:

```ts
base: '/Project-exam-2/',
```

The project is hosted inside the `/Project-exam-2/` path, so Vite needs to know about this path when creating the production files.

#### The project does not build

Run:

```bash
npm run build
```

Then check the error shown in the terminal.

You can also run:

```bash
npm run lint
```

to check for ESLint errors.

#### Dependencies are missing

Run:

```bash
npm install
```

If the project is being built by GitHub Actions, the workflow uses:

```bash
npm ci
```

which installs the dependencies listed in `package-lock.json`.

### Author

Jørgen Bjørnethun

Created as part of Project Exam 2 for front-end development studies.

Built using:

- TypeScript
- React
- Vite
- CSS Modules
- React Router
- Noroff Holidaze API
- GitHub Pages
- GitHub Actions
