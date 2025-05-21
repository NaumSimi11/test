# Todo App

This is a basic Todo web application built with Next.js and Firebase.

## Features

- Add, edit, and delete todos
- Mark todos as completed or rejected
- Status indicated by color-coded border

## Development

Install dependencies (requires Node.js and npm):

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

## Firebase Setup

Create a Firebase project and add the following environment variables in a `.env.local` file:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

## Deployment

Build the application:

```bash
npm run build
```

Start the production server:

```bash
npm run start
```
