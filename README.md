## Key Features

* Responsive fitness website layout
* Image upload with drag-and-drop support
* Client-side validation for image type and size
* Uploaded images stored on the server and shown in a gallery
* jQuery-based animations and interactions
* API-based “Did You Know” content (with fallback)
* MySQL script

---

## Project Structure

### Main Website Files

* `index.html`
  Main HTML structure of the website

* `style.css`
  Styling, layout, animations, and responsive design

* `script.js`
  jQuery animations, image upload logic, API integration

* `server.js`
  Express server handling image uploads

* `upload_images/`
  Folder where uploaded images are stored

* `assets/`
  Static files such as images used in the UI

---

### Backend and Database Files

* `server2.js`
  Backend file for MySQL-related functionality

* `database.sql`
  MySQL database schema and stored procedures

---

### Configuration

* `package.json`
  Project dependencies and scripts

---

## Image Upload Functionality

* Supports drag-and-drop and file selection
* Accepts image files only
* Maximum file size: 5MB
* Multiple uploads supported as mentioned in the task
* Images are uploaded using AJAX and stored on the server
* Uploaded images are displayed dynamically on the page

---

## Technologies Used

### Frontend

* HTML
* CSS
* jQuery
* Bootstrap

### Backend

* Node.js
* Express.js
* Multer (for file uploads)

### Database (Optional)

* MySQL

---

## How the Project Is Organized

* Frontend logic stays in `index.html`, `style.css`, and `script.js`
* Basic backend functionality is handled in `server.js`
* Database-related code is separated into `server2.js` and `database.sql`
* Uploaded files are stored in the `upload_images` directory as mentioned in task.

