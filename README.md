# API_Documentation
Tasks to learn API Documentation.
PRACTICAL ASSESSMENT 5: BUILDING MODERN APPLICATIONS ON AWS
Use Cloud Native Services such as API Gateway, Lambda, DocumentDB/DynamoDB and AWS SAM to build the APIs for the below user stories. 
**Technical User Story 1:** User Registration API
As a developer, I want to create a User Registration API endpoint that accepts user registration data and saves it to the database, so that users can register an account on the e-commerce website.
API Endpoint:
Endpoint: POST /api/register
Request Body Fields:
Name (string)
Email (string)
Password (string)
Shipping Address (string)
**Technical User Story 2:** Product Search API
As a developer, I want to create a Product Search API endpoint that allows users to search for products based on keywords, so that users can find items they are interested in purchasing.
API Endpoint:
Endpoint: GET /api/products
Query Parameters:
Keywords (string)
Category (string, optional)
Subcategory (string, optional)
Min Price (decimal, optional)
Max Price (decimal, optional)
**Technical User Story 3:** Add to Cart API
As a developer, I want to create an Add to Cart API endpoint that allows users to add products to their shopping cart.
	API Endpoint:
Endpoint: POST /api/cart/add
Request Body Fields:
User ID (string)
Product ID (string)
**Technical User Story 4:** Checkout API
As a developer, I want to create a Checkout API endpoint that handles the checkout process, including providing shipping details and making payment.
API Endpoint:
Endpoint: POST /api/checkout
Request Body Fields:
User ID (string)
Shipping Address (string)
Payment Method (string)
Cart Items (array of objects containing product ID and quantity)
**Technical User Story 5:** Order Tracking API
As a developer, I want to create an Order Tracking API endpoint that allows users to track the status and shipping progress of their orders.
API Endpoint:
Endpoint: GET /api/orders/{orderID}/status
Path Parameter:
Order ID (string)
**Technical User Story 6:** Get User Profile API
As a developer, I want to create a Get User Profile API endpoint that retrieves the user's profile information from the database.
API Endpoint:
Endpoint: GET /api/profile
**Technical User Story 7:** Update User Profile API
As a developer, I want to create an Update User Profile API endpoint that allows users to update their profile information.
API Endpoint:
Endpoint: PUT /api/profile
Request Body Fields:
User ID (Non editable)
Updated Name (string, optional)
Updated Email (string, optional)
Updated Shipping Address (string, optional)
**Technical User Story 8:** Remove from Cart API
As a developer, I want to create a Remove from Cart API endpoint that allows users to remove products from their shopping cart.
API Endpoint:
Endpoint: DELETE /api/cart/remove
Request Body Fields:
User ID (string)
Product ID (string)
**Technical User Story 9:** Get Order History API
As a developer, I want to create a Get Order History API endpoint that retrieves the order history for a specific user.
API Endpoint:
Endpoint: GET /api/orders
Query Parameter:
User ID (string)

