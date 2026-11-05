# 08 — API Contracts (Backend & Frontend Bridge): AquaFlow

> Maintained by `edith`. Consulted by `friday` and `jarvis`.

---

## 1. Global Conventions
- **Base URL**: `/api/v1`
- **Timezone**: `Asia/Dhaka` (UTC+6) in query and display; ISO 8601 UTC in JSON payloads.
- **Currency**: `BDT` (৳). All monetary figures are serialized as string Decimals or numbers with 2 decimal places.
- **Authentication**: JWT Bearer token in `Authorization: Bearer <token>` and `HttpOnly` refresh cookie.
- **Standard Error Envelope**:
```json
{
  "error": {
    "code": "DELIVERY_ZONE_UNAVAILABLE",
    "message": "Delivery is not available at this address.",
    "details": {}
  }
}
```

---

## 2. Authentication & Customer Account (`/api/v1/auth`, `/api/v1/account`)

| Method | Endpoint | Purpose | Access |
|---|---|---|---|
| `POST` | `/auth/register` | Register customer with phone, name, password | Public |
| `POST` | `/auth/login` | Authenticate with phone/email & password | Public |
| `POST` | `/auth/logout` | Revoke current refresh session | Authenticated |
| `POST` | `/auth/refresh` | Rotate access token using HttpOnly cookie | Public |
| `POST` | `/auth/verify-phone` | Verify phone OTP | Public |
| `POST` | `/auth/resend-otp` | Request new phone OTP | Public |
| `GET` | `/auth/me` | Current authenticated user profile & roles | Authenticated |
| `PATCH` | `/account/profile` | Update user profile details | Customer |
| `GET` | `/account/addresses` | List customer delivery addresses | Customer |
| `POST` | `/account/addresses` | Add new address with zone validation | Customer |
| `PATCH` | `/account/addresses/:id` | Update delivery address | Customer |
| `DELETE` | `/account/addresses/:id` | Soft delete address | Customer |
| `GET` | `/account/jar-balance` | View container deposit & jar balance | Customer |

---

## 3. Public Storefront, Catalog & Zones (`/api/v1`)

| Method | Endpoint | Purpose | Access |
|---|---|---|---|
| `GET` | `/products` | List active products with category/type filters | Public |
| `GET` | `/products/:slug` | Product detail with gallery, BDT price, deposit | Public |
| `GET` | `/categories` | List active product categories | Public |
| `GET` | `/delivery-zones` | List public active Dhaka delivery zones | Public |
| `POST` | `/delivery-zones/check` | Check if address is serviceable; get fees & slots | Public |
| `GET` | `/delivery-slots` | Available delivery windows for given zone & date | Public |
| `GET` | `/settings/public` | Public contact info, notice banners, brand info | Public |

---

## 4. Cart, Quotes & Orders (`/api/v1/orders`)

### 4.1 Server-Calculated Quote
- **`POST /api/v1/orders/quote`**
- **Request Body**:
```json
{
  "zoneId": "uuid-zone",
  "items": [
    { "productId": "uuid-20l-jar", "quantity": 3 },
    { "productId": "uuid-dispenser", "quantity": 1 }
  ],
  "couponCode": null,
  "returnEmptyJarsCount": 2
}
```
- **Response (200 OK)**:
```json
{
  "subtotal": "600.00",
  "deliveryFee": "50.00",
  "depositAmount": "400.00",
  "returnCreditAmount": "0.00",
  "discountAmount": "0.00",
  "taxAmount": "0.00",
  "grandTotal": "1050.00",
  "currency": "BDT",
  "availableCapacity": true
}
```

### 4.2 Order Placement
- **`POST /api/v1/orders`**
- **Headers**: `Idempotency-Key: <unique-uuid>`
- **Request Body**:
```json
{
  "customerId": "uuid-customer",
  "addressId": "uuid-address",
  "deliverySlotId": "uuid-slot",
  "requestedDeliveryDate": "2026-11-05",
  "paymentMethod": "CASH_ON_DELIVERY",
  "items": [
    { "productId": "uuid-20l-jar", "quantity": 3 }
  ],
  "customerNotes": "Please ring bell on 4th floor"
}
```
- **Response (201 Created)**:
```json
{
  "id": "uuid-order",
  "orderNumber": "AQ-20261105-0012",
  "status": "PENDING",
  "grandTotal": "1050.00",
  "paymentStatus": "UNPAID"
}
```

---

## 5. Subscriptions (`/api/v1/subscriptions`)

| Method | Endpoint | Purpose | Access |
|---|---|---|---|
| `GET` | `/subscriptions/plans` | List published subscription packages | Public |
| `POST` | `/subscriptions` | Create recurring water subscription | Customer |
| `GET` | `/subscriptions` | List customer's active subscriptions | Customer |
| `GET` | `/subscriptions/:id` | Get subscription details and items | Customer |
| `POST` | `/subscriptions/:id/pause` | Pause subscription deliveries | Customer |
| `POST` | `/subscriptions/:id/resume` | Resume paused subscription | Customer |
| `POST` | `/subscriptions/:id/cancel` | Cancel active subscription | Customer |
| `GET` | `/subscriptions/:id/occurrences` | Upcoming scheduled delivery occurrences | Customer |

---

## 6. Delivery Staff Operations (`/api/v1/delivery`)

| Method | Endpoint | Purpose | Access |
|---|---|---|---|
| `GET` | `/delivery/assignments` | List today's assigned deliveries for driver | Delivery Staff |
| `GET` | `/delivery/assignments/:id` | Delivery details, address, customer phone | Delivery Staff |
| `POST` | `/delivery/assignments/:id/start` | Mark order in transit | Delivery Staff |
| `POST` | `/delivery/assignments/:id/complete` | Record delivered qty, empties collected, cash | Delivery Staff |
| `POST` | `/delivery/assignments/:id/fail` | Record delivery failure reason (unavailable/refused) | Delivery Staff |
| `POST` | `/delivery/assignments/:id/collections` | Record cash or manual payment collection | Delivery Staff |
| `POST` | `/delivery/assignments/:id/container-returns`| Record return of empty/damaged jars | Delivery Staff |

---

## 7. Admin Operations & Management (`/api/v1/admin`)

| Method | Endpoint | Purpose | Access |
|---|---|---|---|
| `GET` | `/admin/dashboard` | Real-time operations KPI & cash summary | Admin / Owner |
| `GET` | `/admin/orders` | Filter & search orders by area, date, status | Ops / Admin |
| `PATCH` | `/admin/orders/:id/status` | Confirm, dispatch, or cancel order | Ops / Admin |
| `POST` | `/admin/orders/:id/assign` | Assign delivery driver and stock location | Supervisor |
| `GET` | `/admin/inventory/balances` | View stock balances by location & batch | Inventory Mgr |
| `POST` | `/admin/inventory/movements`| Record stock receipts, issues, transfers | Inventory Mgr |
| `GET` | `/admin/containers/ledger` | Search full/empty jar transaction log | Inventory Mgr |
| `GET` | `/admin/containers/customer-balances` | View outstanding jars per customer | Ops / Admin |
| `POST` | `/admin/deliveries/reconciliation` | Approve driver shift cash & jar closing | Accountant |
| `GET` | `/admin/finance/journals` | View balanced double-entry journals | Accountant |
| `POST` | `/admin/finance/journals` | Post balanced journal entry | Accountant |
| `GET` | `/admin/reports/profit-loss`| View gross profit, margin, operating expenses| Owner / Accountant |
