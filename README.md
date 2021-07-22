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


###endpoints (heroku):
    https://team-amazing.herokuapp.com/api/auth/register
    https://team-amazing.herokuapp.com/api/auth/login

### REGISTRATION:    
    Post: /api/auth/register

###LOGIN:
    Post: /api/auth/login


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