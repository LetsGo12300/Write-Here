
# Right Here *(Write Here)*

## Distinctiveness and Complexity:

Right Here *(Write Here)* is an application that aims to let its users take down notes and save them. This app can also be used as a personal diary. Users have the option to pin their most important notes and delete the notes that have no use anymore.

This project is inpired by [Google Keep](https://keep.google.com/) which I personally use. When I was studying engineering, I loved taking notes! I chose to create a web project like this because I am fascinated by the idea that you can be able to store memories or stories and have access to them anytime. This project summarizes my learnings from the previous projects I did in Harvard's CS50 and CS50w courses in the past year. 

## Setup

Right Here *(Write Here)* is a web-based application using JavaScript and Python. The web framework used was Django. Django-quill-editor, a QuillJS library, was used as a WYSIWYG editor for the inputs. The IDE used was Visual Studio Code for Windows.
#### Stacks used

 - Front-end: JavaScript, HTML5, CSS3 
 - Back-end: Python, Django
 - Database: SQLite3

#### How to run the web application

 - Install `django-quill-editor` to the Python environment:

		 pip install django-quill-editor
		 

 - Start the Django project by running:
 

		   python manage.py runserver
		   
### Files

 `notes` - main application directory

 -   `static/notes` - contains static contents (JavaScript and CSS files)
		- `styles.css` - contains the CSS file used in the app
		- `notes.js` - script used to manipulate `index.html` file. This file contains functions and event listeners that respond when a note is clicked, deleted or edited. It includes Fetch APIs that retrieve and post data to the `Note` model.
		- `deletednote.js` - script used to manipulate `trash.html` file. Compared to `notes.js`, this file responds when a note is restored back to the home page or when the notes are deleted permanently.
		- `logo.jpg`, `pin.png` and `trash-can.png` - source images used in the app
		
 -   `templates` - contains all HTML templates used in the app
		- notes 
			- `create.html` - used to create notes and save them in the database
			- `index.html` - used to show the Home page of the app
			- `layout.html` - other HTML files extend this file. It shows the navbar for the page, login and logout routes
			- `trash.html` - used to show the Recently Deleted page
		- registration
			- `login.html`- shows the form where users can log in

 - `models.py` - contains the models used for the app called `Note` and `QuillPost`. 
	 - `Note` is the model for all the notes. It includes the `title`, `content`, `owner` and `date` fields of all notes. The `deleted` field indicates True if the note was deleted by the user. The `pinned` field indicates True if the note is pinned by the user. Otherwise, its default value is False.
 	 - `QuillPost` is the model for the editor. It includes `content` field where the text area and toolbar are shown whenever a user creates or edits a note.
 	 
 - `urls.py` - contains all the url and views mapped in the app. The URL patterns also show the API routes used in `deletednote.js` and `note.js`
 - `views.py` - contains all the functions and class used in the app, it is where the backend of the app is maintained

## What's in the app?

There are three links to the navbar which are:

1. Home

2. Create a Note

3. Recently Deleted

 

### Home

This is the front page of the website where logged-in users can see their created notes. 

Users have the option to view their notes in two ways:

 1. Notes View  - this view lets the users see the notes by batch or multiple notes per row. This is the default view of the Home page.
 2. List View - this view lets the users see the notes which is presented by one per row. This view lets the user easily view their notes.
 
Users can edit their notes by clicking on them. When a note is clicked, an editor pop-up window shows up. The user can then edit the title and/or the content of the note. Shown at the bottom will be the date when the note is last edited. When the user clicks save button, the pop-up window is closed and the note is automatically updated without refreshing the page.

Users have the option to pin or delete notes in the Home page. When a note is hovered, the option to pin or delete is shown. When a note is already pinned, an image of a pin is shown at the top-right corner of the note.
 - When a note is pinned, it is sent to the top most part of the page. Similarly, when a note is unpinned, it is sent to the bottom part of the page.
 - When a note is deleted, it is immediately sent to the Recently Deleted page.


### Create a Note

This page is where the user can create a note. Users must input a title and a content. The editor is from a Python library, django-quill-editor which utilizes Quill.JS on Django and Python. 

  Source for the WYSIWYG  editor: [Django-quill-editor](https://github.com/LeeHanYeong/django-quill-editor)

### Recently Deleted

This page is where all the deleted notes are shown. Users can look at the deleted notes and have the option to delete all the notes or restore them. 
 - Once the user hovers on a note, a restore button is shown. When the
   user clicks on restore button, it will immediately be sent back to the Home page.
 - At the top-right corner of the page is a Delete All Permanently button. When this is clicked, there will be a window to confirm if the user is sure to delete all notes. When the notes are permanently deleted, they are no longer recovable in the database.

## Website Preview


<img  src="https://res.cloudinary.com/dm5pq9l7b/image/upload/v1658152612/Write_Here_kou1fq.png"  width="800"  height="auto" alt="Website Preview" />


Right Here *(Write Here)*  
A CS50W Final Project  
04 February 2022

Video Demo: <https://youtu.be/bb8Te4PboPQ>