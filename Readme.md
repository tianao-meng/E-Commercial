# E-Commercial Single Page Web Application
> This project is a full functionality E-Commercial web app like Amazon with frontend part implemented in React/Redux and backend part in express framework that provides 24 RESTFUL APIs to process HTTP request.
> User, Product and Order data are stored in MongoDB. User Avatar and product images are hosted in Cloudinary, and with the help of Stripe to achieve payment method and payment information can be got from Stripe.
> Implemented the functionality including post/update/delete product, browse products (with filter, search, and pagination)/product details, add/list/delete reviews for product part.
> Users could register, login, logout, forget password(mailTrap), reset password, change password and update profile while admins could also get users list and user information.
> Users could place order, get order details, their orders while admins can get all orders, delete order and update order status.
> This Web App is deployed on Heroku(https://e-commercial-tianao.herokuapp.com/), and it is responsive on small width devices such like IphoneX and Iphone8P.


### Install Dependencies (Frontend)
```
cd frontend
npm i

```
### Install Dependencies (Backend)
```
npm i
npm run seeder to seed the database
```
