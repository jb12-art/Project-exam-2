# Holidaze

Hotel web application built with TypeScript, React, Vite, CSS Modules.

## Installing TypeScript + React + Vite

Open your terminal and run the following command:

Installing Vite, React and TypeScript at the root in your folder, instead of making a new folder inside the first folder.

```
npm create vite@latest . -- --template react-ts
```

Installing the needed packages in your project folder.

```
npm install
```

Install gh-pages if you want 'npm run deploy' to run automatic when you push code to github. Else you need to do it manual everytime you push code.

```
npm install gh-pages --save-dev
```

Open vite.config.ts and verify you have the repository path base configured:

```
export default defineConfig({
plugins: [react()],
base: '/Project-exam-2/', <-- Add this line.
})

```

open your package.json and add the homepage property at the top, and the predeploy and deploy commands inside your "scripts" block:

```
{
"name": "project-exam-2",
"private": true,
"version": "0.0.0",
"type": "module",
"homepage": "https://jb12-art.github.io/Project-exam-2/", <--Add this line.
"scripts": {
"dev": "vite",
"build": "tsc -b && vite build",
"lint": "eslint .",
"preview": "vite preview",
"predeploy": "npm run build", <--Add this line.
"deploy": "gh-pages -d dist" <--Add this line.
},
```

## Live Demo

View the live site here:

https://jb12-art.github.io/Project-exam-2/

## Project Description

This project is an online hotel application built as part of a front-end development assignment.

```

```
