Project Cost Tracker:
A React-based web application to manage project expenses, built with Firebase Firestore, Redux Toolkit, and Chakra UI.

Setup

Clone the repository:
git clone <your-repo-url>
cd project-cost-tracker


Install dependencies:
npm install


Set up Firebase:

Create a Firebase project at Firebase Console.
Enable Firestore and Authentication (Email/Password).
Add a web app to get the Firebase config.
Create a .env file with your Firebase config (see .env artifact).


Apply Firestore security rules:

Copy firestore.rules to Firebase Console → Firestore Database → Rules and publish.


Run the app:
npm run dev



Deployment

Push to GitHub.
Deploy to Vercel:npm install -g vercel
vercel


Add Firebase config as environment variables in Vercel.

Features

User authentication (signup, login, logout) with Firebase Authentication.
Add, edit, delete items and other costs.
Real-time data sync with Firestore.
Total project cost calculation.
Responsive UI with Chakra UI.

Submission

GitHub: 
Deployed URL: 

