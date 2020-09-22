# note  
> Single-page Reddit/Twitter inspired image board. Made with **React**, **Redux**, and **Gofiber**.  
  
**note is in active development**  
  
## Technologies Used  
 * **Frontend**
     * React  
     * Redux
     * Ant Design  
     * Styled-Components
     * TypeScript  
 * **Backend**  
     * Gofiber
     * GORM  
     * PostgreSQL  
     * Go  
* **Storage**  
     * Amazon Web Services S3  
  
## Current Features  
* **User auth**  
    * Users can register/login/logout  
    * Utilizes `gofiber/jwt`  
* **Notepads**  
    * Notepads are the equivalent of subreddits/communities in note  
    * Users can create notepads, where anyone can contribute conversation  
    * Navigating to a notepad displays posts to that notepad, ordered by time of last update  
    * Search with autocomplete for notepads by name
* **Posts**  
    * Users can create posts, which can be text-only or include an image or gif  
    * *Planned* - search for individual posts by name/user within a notepad  
* **Comments**  
    * Users can comment directly to a post or reply to another comment  
    * Replying to a comment adds an anchor-link reference to the parent comment as well as the reply  
    * Hovering over the hyperlink renders a preview of the parent comment/reply  
* **Favorites**  
    * Users can favorite notepads, adding them to the sidebar for quick navigation  
    * Users can unfavorite notepads, removing them from the sidebar
  
## Local Setup  
After cloning/forking...  

### Frontend setup  
```
# navigate to cient from root directory
cd ./client

# install dependencies
npm install

# run frontend scripts
npm start
```  
  
### Backend setup  
```
# navigate to server from root directory
cd ./server  
  
# create .env file  
touch .env  
# or on windows  
echo. > .env
  
# follow .env.sample to fill out new .env file with valid postgres/aws credentials

# run server - db seeding is automatic on start
go run main.go
```  
  
Navigate to [http://localhost:3000/](http://localhost:3000/).
