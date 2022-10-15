# Nollaig 
## A Christmas list tracker for the family 


# - User Story -
## As a user I want to be able to:
# - Sign up with email and password or with just my gmail account
# - View my Wish List
# - Create instances of gifts I would like for christmas to ask for 
#   - Gifts can have a name, image, link, and other details
# - I cannot see who has "purchased" this gift for me 
# - I can see other User's Wish Lists
# - I can see who has purchased other User's gifts
# - I can "purchase" another User's gift 
#   - When I purchase another User's gift from their list, it is grayed out, letting the rest of the users know
#       that gift has already been bought 
# - I can see a separate view of all the gifts I have purchased and for who 


# - Stretch Goals / Nice to Haves - 
# - If a User removes a gift from their own Wish List that has already been "purchased" by another User, it will #      email that user to notify them 
# - Chat ?

# Models
## User ##
# - name: string
# - email: string
# - uid => corresponds to Firebase User (authenticated?)
# - wishList: WishList

## WishList ##
# - owner: User
# - gifts: Gift[]

## Gift ##
# - name: string
# - description: string
# - image: file(upload)
# - priceRange: string ? (optional)
# - link: string
# - user: User
# - purchased: boolean
# - purchasedBy: User

## User Auth ##
# Firebase Users 
# - Create a separate User object in the DB that references the authenticated uid 
# - this User will store the properties listed above 


# Aidan Admin / aidnakmcbride@gmail.com / hoggle12345

# To Do's
## Login and Register forms need auth to check for input 