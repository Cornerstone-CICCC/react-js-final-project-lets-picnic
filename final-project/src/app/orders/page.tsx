"use client";

import Image from "next/image";

const mockOrder = {
  trackingNum: "TRACK123456789",
  cart: {
    id: 1,
    status: "purchased",
    totalDiscountedAmount: 45.0,
    shippingAddress: "123 Maple Street, Vancouver, BC, Canada",
    createdAt: "2025-06-12T14:00:00Z",
    cartItems: [
      {
            "id": 139,
            "quantity": 1,
            "discountedPrice": "24.99",
            "subTotal": 24.99,
            "createdAt": "2025-06-13T14:59:35.601Z",
            "updatedAt": "2025-06-13T14:59:35.601Z",
            "product": {
                "id": 2,
                "productName": "Gigabyte Aorus Men Tshirt",
                "category": {
                    "id": 1,
                    "categoryName": "mens-shirts",
                    "description": "Category for men's shirts",
                    "image": null,
                    "createdAt": "2025-06-11T17:13:12.262Z",
                    "updatedAt": "2025-06-11T17:13:12.262Z"
                },
                "price": "24.99",
                "mainImage": "https://cdn.dummyjson.com/product-images/mens-shirts/gigabyte-aorus-men-tshirt/thumbnail.webp",
                "secondaryImages": [],
                "tag": [],
                "description": "The Gigabyte Aorus Men Tshirt is a cool and casual shirt for gaming enthusiasts. With the Aorus logo and sleek design, it's perfect for expressing your gaming style.",
                "discountPercentage": 0,
                "rating": "3.18",
                "sku": "MEN-GIG-GIG-084",
                "createdAt": "2025-06-13T14:59:35.601Z",
                "updatedAt": "2025-06-13T14:59:35.601Z"
            }
        },
        {
            "id": 140,
            "quantity": 1,
            "discountedPrice": 28.34,
            "subTotal": 28.34,
            "createdAt": "2025-06-13T14:59:37.943Z",
            "updatedAt": "2025-06-13T14:59:37.943Z",
            "product": {
                "id": 3,
                "productName": "Man Plaid Shirt",
                "category": {
                    "id": 1,
                    "categoryName": "mens-shirts",
                    "description": "Category for men's shirts",
                    "image": null,
                    "createdAt": "2025-06-11T17:13:12.262Z",
                    "updatedAt": "2025-06-11T17:13:12.262Z"
                },
                "price": "34.99",
                "mainImage": "https://cdn.dummyjson.com/product-images/mens-shirts/man-plaid-shirt/thumbnail.webp",
                "secondaryImages": [],
                "tag": [],
                "description": "The Man Plaid Shirt is a timeless and versatile men's shirt with a classic plaid pattern. Its comfortable fit and casual style make it a wardrobe essential for various occasions.",
                "discountPercentage": 19,
                "rating": "3.46",
                "sku": "MEN-CLA-PLA-085",
                "createdAt": "2025-06-13T14:59:37.943Z",
                "updatedAt": "2025-06-13T14:59:37.943Z"
            }
        },
        {
            "id": 138,
            "quantity": 3,
            "discountedPrice": 25.49,
            "subTotal": 76.47,
            "createdAt": "2025-06-13T14:59:34.384Z",
            "updatedAt": "2025-06-13T14:59:39.867Z",
            "product": {
                "id": 1,
                "productName": "Blue & Black Check Shirt",
                "category": {
                    "id": 1,
                    "categoryName": "mens-shirts",
                    "description": "Category for men's shirts",
                    "image": null,
                    "createdAt": "2025-06-11T17:13:12.262Z",
                    "updatedAt": "2025-06-11T17:13:12.262Z"
                },
                "price": "29.99",
                "mainImage": "https://cdn.dummyjson.com/product-images/mens-shirts/blue-&-black-check-shirt/thumbnail.webp",
                "secondaryImages": [],
                "tag": [],
                "description": "The Blue & Black Check Shirt is a stylish and comfortable men's shirt featuring a classic check pattern. Made from high-quality fabric, it's suitable for both casual and semi-formal occasions.",
                "discountPercentage": 15,
                "rating": "3.64",
                "sku": "MEN-FAS-BLU-083",
                "createdAt": "2025-06-13T14:59:34.384Z",
                "updatedAt": "2025-06-13T14:59:39.867Z"
            }
        },
    ],
  },
};

const page = () => {
  const order = mockOrder;
  const { cart, trackingNum } = order;

  return (
    <main className="flex flex-col md:flex-row py-12 gap-6 w-full bg-white dark:bg-black text-black dark:text-white px-4">
      <section className="w-full md:w-4/6 bg-white dark:bg-neutral-900 p-5 flex flex-col gap-5 order-1 md:order-none">
        <h2 className="text-2xl font-bold mb-2">Order Details</h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          <strong>Tracking:</strong> {trackingNum}
        </p>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          <strong>Date:</strong>{" "}
          {new Date(cart.createdAt).toLocaleDateString()}
        </p>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          <strong>Shipping Address:</strong> {cart.shippingAddress}
        </p>

        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-4">Items</h3>
          <div className="flex flex-col gap-4">
            {cart.cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 border-b pb-4"
              >
                <Image
                  src={item.product.mainImage}
                  alt={item.product.productName}
                  width={80}
                  height={80}
                  className="rounded object-cover"
                />
                <div className="flex flex-col">
                  <span className="font-semibold text-base">
                    {item.product.productName}
                  </span>
                  <span className="text-sm text-neutral-500">
                    Qty: {item.quantity}
                  </span>
                  <span className="text-sm text-neutral-500">
                    Discount: {item.product.discountPercentage}%
                  </span>
                  <span className="text-sm">
                    Price: ${item.discountedPrice}
                  </span>
                  <span className="text-sm font-medium">
                    Subtotal: ${item.subTotal.toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <aside className="w-full md:w-2/6 sticky md:top-12 h-fit bg-white dark:bg-neutral-900 p-5 flex flex-col gap-3 text-neutral-500 dark:text-neutral-400 text-sm order-2">
        <h3 className="text-xl font-semibold text-black dark:text-white">
          Summary
        </h3>
        <p className="flex justify-between">
          Products:
          <span>
            $
            {cart.cartItems
              .reduce((acc, item) => acc + item.subTotal, 0)
              .toFixed(2)}
          </span>
        </p>
        <p className="flex justify-between">
          Delivery:<span>$8.99</span>
        </p>
        <p className="flex justify-between">
          You saved:
          <span>
            $
            {cart.cartItems
              .reduce(
                (acc, item) =>
                  acc +
                  (parseFloat(item.product.price)) *
                    item.quantity,
                0
              )
              .toFixed(2)}
          </span>
        </p>
        <p className="flex justify-between text-black dark:text-white font-semibold text-base">
          Total:<span>${(cart.totalDiscountedAmount + 8.99).toFixed(2)}</span>
        </p>
      </aside>
    </main>
  );
};

export default page;
