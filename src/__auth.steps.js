/* 
AUTH SETUP
1. create firebase project
2. enable web
3. enable sign in method
4. install firebase
5. get firebase config in your firebase.config.js file
6 export app from firebase.config.js
*/

/* 
1. Create UserContext (Auth Context): UserContext --> component name
UserContext provides AuthContext
2. Create AuthContext
3. set AuthContext.Provider
4. Make sure you set the children
5. export AuthContext to be used inside useContext hook
6. get form data
7. getAuth in the UserContext
 */

/* 
FIREBASE HOSTING
-----------------
// one time for each computer
1. npm install -g firebase-tools
2. firebase login

// one time for each project
3. firebase init
Hit space bar to select an option and hit Enter

Answer these questions:
What do you want to use as your public directory? build
? Configure as a single-page app (rewrite all urls to /index.html)? Yes
? Set up automatic builds and deploys with GitHub? No
? File build/index.html already exists. Overwrite? No


// for every deploy
4. npm run build
5. firebase deploy

*/