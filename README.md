# MarcX

MarcX is a bookmarks manager that seek to provide a more customizable and user friendly experience! The idea is simple: to bring a modern home screen experience from your desktop, phone, or tablet to Chrome! Visit https://marcx.herokuapp.com to get started today!

## Features of MarcX

- To get started, follow the instructions posted on our welcome page! Personalize your homepage by uploading bookmarks, background, and color theme! 

  ![Start up page](/client/src/public/images/startupPage.png)

- **Navigating your Home Page**
  - Use the arrows in the top left to switch between different *pages*
  - Use the *Edit Mode* button to toggle edit mode on and off
  - Use the *Options* button to access other important features, such as adding bookmarks, groups, and personalizing your home page!
  
    ![Home Page](/client/src/public/images/homescreen.png)
 
- **Navigating Options**
  - Click the *Options* sidebar to access more MarcX tools and settings
  - Create new bookmarks and groups by clicking the menu items under the *Create Item* submenu. Click these to add custom bookmarks and groups to your home pages!
  - Click the gear icon under the *Settings* submenu to access general settings. In settings you can change your theme, background image, and upload additional bookmarks
  - Click the profile icon under the *Settings* submenu to access your profile, where you can sign out of MarcX
  - Lastly, you can come back to these instructions under *Help*
  
    ![Home Page](/client/src/public/images/Sidebar.png)
 
- **Navigating Groups**
  - Click on a *group* to access even more of your bookmarks
  - Groups also contain *pages* that you can navigate between using the arrows on the left and right of the group
  
    ![Home Page](/client/src/public/images/group.png)
    
- **Instant Editing**
  - *Right click* on a bookmark or group at any time to access several options
  - Clicking the *delete* button will delete your bookmark from the page
  - Move the bookmark/group to a different page by entering the page number in the input field and pressing the send button. If the destination page is full, the bookmark will be sent to the next available spot in later pages
  - Right click on a bookmark within a group to access an additional option of moving it out of the group. The bookmark will be sent to the first available spot in your home pages
  
    ![Home Page](/client/src/public/images/sidebySide.png)

- **Edit Mode**
  - Click the *edit* button to toggle edit mode
  - In edit mode, you have access to additional edit options apart from the right-click options
  - Clicking the "x" icon will delete your bookmark
  - You can *drag and drop* bookmarks and groups into any available spot in the current page to organize your home page however you want
  - You can also drag and drop bookmarks into groups, and they will automatically be added to that group!
  
    ![Home Page](/client/src/public/images/editmode.png)
  
  
## Running MarcX Locally

- After cloning project, run `npm install`  
  - MarcX uses a `React.js` fontend 
  - MarcX uses `Node.js` that connects to a `MongoDB` database
- Running the app 
  - Start a server in terminal using `npm start`
  - Start the hotloader for the website using `npm run hotloader`
  - Navigate to `http://localhost:5000/` to see the webpage
- Feel free to mess around with features as you'd like! Let us know if you want certain features to be added!


## Privacy

- It's simple. We will not sell your private informations to any third party apps and services. Period. 

## Contact Us:

- Found a bug? Want to chat? You can contact us in the emails below:
  - Enrique Casillas: enriquec@mit.edu
  - Tyrone Davis III: td3@mit.edu
  - Thanh Nguyen: thanh_n@mit.edu
