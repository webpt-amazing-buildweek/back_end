# back_end

##HEROKU CLI commands
heroku login
heroku apps:create
heroku addons:create
heroku logs --tail -a <app_name>
heroku run --app <app_name>

###endpoints:
    http://localhost:5500 in development
    http://localhost:5500/api/auth/register 
    http://localhost:5500/api/auth/login


### Endpoints (heroku):
    Users
    [POST] https://team-amazing.herokuapp.com/api/auth/register
        returns user object
    [POST] https://team-amazing.herokuapp.com/api/auth/login
        returns token, user object

    Items
    [GET]   ALL ITEMS: https://team-amazing.herokuapp.com/api/items
        returns array of all items
    [GET]   ITEMS BY ID: https://team-amazing.herokuapp.com/api/items/:id
        returns item object
    [POST]  ITEM NEW ITEM: https://team-amazing.herokuapp.com/api/items
        returns item object
    [PUT]   UPDATE ITEM: https://team-amazing.herokuapp.com/api/items/:id
        returns item object
    [DELETE]DELETE ITEM: https://team-amazing.herokuapp.com/api/items/:id
        returns delete message

MY-LIST Endpoints


### REGISTRATION:    
    [POST]: /api/auth/register

### LOGIN:
    [POST]: /api/auth/login


### Data Table Structures: 
User Object
{
  id: integer
  username: string
  password: string 
  email: string
  isOwner: boolean
}
Item Object
{
  id: integer
  item_name: string
  location: string
  quantity: integer
  price: float
  description: string
  user_id: integer // this references the id in the user table
}