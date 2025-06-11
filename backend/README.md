# Backend API

## User

### `GET /user/`
Returns a list of users.

**Response**
```json
[
  {
    "id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "role": "user",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

### `POST /user/signup`
Create a new user.

**Request**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "secret",
  "role": "user"
}
```

**Response**
```json
{
  "id": 1,
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "role": "user",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### `POST /user/login`
Login with email and password.

**Request**
```json
{
  "email": "john@example.com",
  "password": "secret"
}
```

**Response**
```json
{
  "message": "Login successful",
  "userId": 1
}
```

### `GET /user/logout`
Invalidate the session.

**Response**
```json
{ "message": "Logged out successfully" }
```

### `GET /user/check-cookie`
Check if the current session is logged in.

**Response**
```json
{ "loggedIn": true, "userId": 1 }
```

### `GET /user/:userId`
Get a user by ID.

**Response**
```json
{
  "id": 1,
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "role": "user",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### `PUT /user/:userId`
Update a user (partial fields allowed).

**Request**
```json
{
  "firstName": "Jane"
}
```

**Response**
```json
{
  "id": 1,
  "firstName": "Jane",
  "lastName": "Doe",
  "email": "john@example.com",
  "role": "user",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-02T00:00:00.000Z"
}
```

### `DELETE /user/:userId`
Delete a user.

**Response**
```json
{ "message": "User deleted" }
```

## Category

### `GET /category/`
List categories.

**Response**
```json
[
  {
    "id": 1,
    "categoryName": "Perfume",
    "description": "Fragrance items",
    "image": "url",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

### `POST /category/`
Create a category.

**Request**
```json
{
  "categoryName": "Perfume",
  "description": "Fragrance items",
  "image": "url"
}
```

**Response**
```json
{
  "id": 1,
  "categoryName": "Perfume",
  "description": "Fragrance items",
  "image": "url",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### `PUT /category/:categoryId`
Update a category.

**Request**
```json
{
  "description": "Updated"
}
```

**Response**
```json
{
  "id": 1,
  "categoryName": "Perfume",
  "description": "Updated",
  "image": "url",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-02T00:00:00.000Z"
}
```

### `DELETE /category/:categoryId`
Remove a category.

**Response**
```json
{ "message": "Category deleted" }
```

### `GET /category/:categoryId`
Get a category by ID.

**Response**
```json
{
  "id": 1,
  "categoryName": "Perfume",
  "description": "Fragrance items",
  "image": "url",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

## SecondaryImage

### `GET /secondary_image/`
List secondary_images.

**Response**
```json
[
  {
    "id": 1,
    "image": "url",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

### `POST /secondary_image/`
Create a secondary image.

**Request**
```json
{
  "image": "url"
}
```

**Response**
```json
{
    "id": 160,
    "image": "test-url",
    "createdAt": "2025-06-11T22:17:05.962Z",
    "updatedAt": "2025-06-11T22:17:05.962Z"
}
```

### `DELETE /secondary_image/:secondaryImageId`
Remove a category.

**Response**
```json
{ "message": "Secondary image deleted" }
```

### `GET /secondary_image/:secondaryImageId`
Get a secondary image by ID.

**Response**
```json
{
    "id": 160,
    "image": "test-url",
    "createdAt": "2025-06-11T22:17:05.962Z",
    "updatedAt": "2025-06-11T22:17:05.962Z"
}
```

## Tag

### `GET /tag/`
List tags.

**Response**
```json
[
  {
    "id": 1,
    "tagName": "cute",
    "createdAt": "2025-06-11T05:52:44.777Z",
    "updatedAt": "2025-06-11T05:52:44.777Z"
  },{}
]
```

### `POST /tag/`
Create a tag.

**Request**
```json
{
  "tagName": "cute",
}
```

**Response**
```json
{
    "id": 1,
    "tagName": "cute",
    "createdAt": "2025-06-11T05:52:44.777Z",
    "updatedAt": "2025-06-11T05:52:44.777Z"
}
```

### `PUT /tag/:tagId`
Update a tag.

**Request**
```json
{
  "tagName": "Updated"
}
```

**Response**
```json
{
  "id": 1,
  "tagName": "Updated",
  "createdAt": "2025-06-11T05:52:44.777Z",
  "updatedAt": "2025-06-11T05:52:44.777Z"
}
```

### `DELETE /tag/:tagId`
Remove a tag.

**Response**
```json
{ "message": "Tag deleted" }
```

### `GET /tag/:tagId`
Get a tag by ID.

**Response**
```json
{
  "id": 55,
  "tagName": "oval",
  "createdAt": "2025-06-11T17:30:40.118Z",
  "updatedAt": "2025-06-11T17:30:40.118Z"
}
```

## Product

### `GET /product/`
List products.

**Response**
```json
[
  {
    "id": 1,
    "productName": "Blue & Black Check Shirt",
    "category": {
        "id": 1,
        "categoryName": "mens-shirts",
        "description": "Comfortable and stylish shirts for men",
        "image": "https://example.com/images/mens-shirts.jpg",
        "createdAt": "2025-06-09T18:28:29.840Z",
        "updatedAt": "2025-06-09T18:28:29.840Z"
    },
    "price": "30.10",
    "mainImage": "https://cdn.dummyjson.com/product-images/mens-shirts/blue-&-black-check-shirt/thumbnail.webp",
    "secondaryImages": [
        {
            "id": 6,
            "image": "https://cdn.dummyjson.com/product-images/mens-shirts/blue-&-black-check-shirt/4.webp"
        }
    ],
    "tag": [
        { "id": 1,"tagName": "cute"},
        { "id": 12, "tagName": "belt"}
    ],
    "description": "The Blue & Black Check Shirt is a stylish and comfortable men's shirt featuring a classic check pattern. Made from high-quality fabric, it's suitable for both casual and semi-formal occasions.",
    "discountPercentage": 15,
    "rating": "3.64",
    "sku": "DUMMY-83",
    "createdAt": "2025-06-11T16:43:01.318Z",
    "updatedAt": "2025-06-11T16:43:01.318Z"
  },
]
```

### `POST /product/`
Create a product.

**Request**
```json

{
  "productName": "test3",
  "categoryId": 3,
  "price": 79.99,
  "mainImage": "https://example.com/images/main-dress.jpg",
  "secondaryImages": [
    "https://example.com/images/dress-side.jpg",
    "https://example.com/images/dress-back.jpg"
  ],
  "tagIds": [1, 3, 5],
  "description": "An elegant evening dress perfect for parties.",
  "discountPercentage": 15,
  "rating": 4.7,
  "sku": "DRESS-ELE-001"
}
```

**Response**
```json
{
    "id": 48,
    "productName": "test3",
    "category": {
        "id": 3,
        "categoryName": "mens-watches",
        "description": "Elegant watches to complete your look",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYRfANVWf-Tbw-KasKwVCZ4wGDN4v4ZKT2JA&s",
        "createdAt": "2025-06-09T18:29:20.086Z",
        "updatedAt": "2025-06-09T18:29:20.086Z"
    },
    "price": "79.99",
    "mainImage": "https://example.com/images/main-dress.jpg",
    "secondaryImages": [],
    "tag": [],
    "description": "An elegant evening dress perfect for parties.",
    "discountPercentage": 15,
    "rating": "4.7",
    "sku": "DRESS-ELE-001",
    "createdAt": "2025-06-11T23:16:14.020Z",
    "updatedAt": "2025-06-11T23:16:14.020Z"
}
```

### `PUT /product/:productId`
Update a product.

**Request**
```json
{
  "price": 19.99
}
```

**Response**
```json
{
  "id": 1,
  "productName": "CK One",
  "category": { "id": 1, "categoryName": "Perfume" },
  "price": 19.99,
  "mainImage": "url",
  "secondaryImages": [],
  "tags": [],
  "description": "desc",
  "discountPercentage": 0,
  "rating": 4.5,
  "sku": "ABC123",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-02T00:00:00.000Z"
}
```

### `DELETE /product/:productId`
Delete a product.

**Response**
```json
{ "message": "Product deleted" }
```

### `GET /product/category/:categoryId`
List products in a category.

### `GET /product/search/:productName`
Find a product by name.

### `GET /product/:productId`
Get a product by ID. Responses match the product structure shown above.

## Cart

### `POST /cart/item/:userId`
Add an item to a user's cart.

**Request**
```json
{
  "productId": 1,
  "quantity": 2
}
```

**Response**
```json
{
  "id": 1,
  "quantity": 2,
  "discountedPrice": 9.99,
  "subTotal": 19.98,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z",
  "product": { "id": 1, "productName": "CK One", ... }
}
```

### `GET /cart/:userId`
Retrieve the active cart for a user.

**Response**
```json
{
  "id": 1,
  "status": "active",
  "totalDiscountedAmount": 19.98,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z",
  "shippingAddress": null,
  "user": { "id": 1, "firstName": "John", ... },
  "cartItems": [
    {
      "id": 1,
      "quantity": 2,
      "discountedPrice": 9.99,
      "subTotal": 19.98,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z",
      "product": { "id": 1, "productName": "CK One", ... }
    }
  ]
}
```

### `PUT /cart/item/:userId`
Update quantity of an item in the cart. Quantity `0` removes it.

**Request**
```json
{
  "productId": 1,
  "quantity": 1
}
```

### `PUT /cart/address/:userId`
Update shipping address.

**Request**
```json
{ "shippingAddress": "Toronto" }
```

### `DELETE /cart/item/:userId`
Remove an item from the cart. Body should include the cart item id.

**Request**
```json
{ "cartItemId": 1 }
```

### `DELETE /cart/:userId`
Mark a cart as deleted.

**Response**
```json
{ "message": "Cart deleted" }
```

## Payment

### `POST /payment/create-payment-intent`
Create a Stripe payment intent for the given cart.

**Request**
```json
{ "cartId": 1 }
```

**Response**
```json
{ "clientSecret": "pi_secret_xxx" }
```

### `GET /payment/:paymentIntentId`
Get order information after payment.

**Response**
```json
{
  "trackingNum": "uuid",
  "cart": {
    "id": 1,
    "status": "purchased",
    "totalDiscountedAmount": 19.98,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z",
    "shippingAddress": "Toronto",
    "user": { "id": 1, "firstName": "John", ... },
    "cartItems": [ ... ]
  }
}
```

### `POST /webhook`
Stripe webhook endpoint.

