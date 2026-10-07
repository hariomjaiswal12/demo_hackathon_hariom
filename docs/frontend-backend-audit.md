# DeskDrop Frontend ↔ Backend API Contract Audit

This audit documents every single API endpoint across the DeskDrop application, mapping frontend requests against actual Express backend routes, required auth/roles, request/response shapes, and error status codes.

---

## 1. Authentication Endpoints (`/api/auth`)

### 1.1 Register User
- **Frontend Method**: `POST`
- **Frontend URL**: `/api/auth/register` (`src/api/auth.js` -> `registerUserApi`)
- **Backend Method**: `POST`
- **Backend URL**: `/api/auth/register` (`backend/src/controllers/authController.js`)
- **Required Auth**: Public (None)
- **Required Role**: None
- **Request Body**:
  ```json
  {
    "name": "Jane Doe",
    "email": "jane@example.com",
    "password": "Password123!",
    "role": "USER" // Optional: 'USER' or 'ADMIN'
  }
  ```
- **Success Response (201 Created)**:
  ```json
  {
    "success": true,
    "message": "User registered successfully",
    "data": {
      "user": {
        "_id": "67040...b1",
        "name": "Jane Doe",
        "email": "jane@example.com",
        "role": "USER"
      },
      "token": "eyJhbGciOi..."
    }
  }
  ```
- **Error Response Structure (400 Bad Request)**:
  ```json
  {
    "success": false,
    "message": "User with this email already exists",
    "errors": []
  }
  ```
- **Frontend Consumer**: `src/App.jsx` (`handleRegister`) & `src/pages/RegisterPage.jsx`. Stores token in `localStorage.setItem('deskdrop_token', token)`.

---

### 1.2 Login User
- **Frontend Method**: `POST`
- **Frontend URL**: `/api/auth/login` (`src/api/auth.js` -> `loginUserApi`)
- **Backend Method**: `POST`
- **Backend URL**: `/api/auth/login` (`backend/src/controllers/authController.js`)
- **Required Auth**: Public (None)
- **Required Role**: None
- **Request Body**:
  ```json
  {
    "email": "jane@example.com",
    "password": "Password123!"
  }
  ```
- **Success Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Login successful",
    "data": {
      "user": {
        "_id": "67040...b1",
        "name": "Jane Doe",
        "email": "jane@example.com",
        "role": "USER"
      },
      "token": "eyJhbGciOi..."
    }
  }
  ```
- **Error Response Structure (401 Unauthorized)**:
  ```json
  {
    "success": false,
    "message": "Invalid email or password",
    "errors": []
  }
  ```
- **Frontend Consumer**: `src/App.jsx` (`handleLogin`) & `src/pages/LoginPage.jsx`.

---

### 1.3 Get Current User Session (`/me`)
- **Frontend Method**: `GET`
- **Frontend URL**: `/api/auth/me` (`src/api/auth.js` -> `fetchMeApi`)
- **Backend Method**: `GET`
- **Backend URL**: `/api/auth/me` (`backend/src/controllers/authController.js`)
- **Required Auth**: `Bearer <token>`
- **Required Role**: Any authenticated user (`USER` or `ADMIN`)
- **Success Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Current user retrieved",
    "data": {
      "user": {
        "_id": "67040...b1",
        "name": "Jane Doe",
        "email": "jane@example.com",
        "role": "USER"
      }
    }
  }
  ```
- **Error Response Structure (401 Unauthorized)**:
  ```json
  {
    "success": false,
    "message": "Not authorized, token missing or invalid",
    "errors": []
  }
  ```
- **Frontend Consumer**: `src/App.jsx` (Session check `useEffect` on mount).

---

## 2. Resource Management Endpoints (`/api/resources`)

### 2.1 Fetch All Resources
- **Frontend Method**: `GET`
- **Frontend URL**: `/api/resources` (`src/api/resources.js` -> `fetchResources`)
- **Backend Method**: `GET`
- **Backend URL**: `/api/resources` (`backend/src/controllers/resourceController.js`)
- **Query Parameters**: `category`, `status`, `search`
- **Required Auth**: `Bearer <token>`
- **Required Role**: Any authenticated user
- **Success Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Resources retrieved successfully",
    "data": [
      {
        "_id": "67039...a4",
        "name": "Shure SM7B Studio Mic #2",
        "resourceCode": "MIC-7B-094",
        "category": "AUDIO",
        "status": "AVAILABLE",
        "location": "Studio Booth B • Floor 4",
        "description": "Pro broadcast microphone",
        "requiresBadgeSignout": true
      }
    ]
  }
  ```
- **Frontend Consumer**: `src/pages/TimelinePage.jsx`, `src/pages/ResourceRegistryPage.jsx`, `src/pages/ResourceDetailsPage.jsx`.

---

### 2.2 Get Resource By ID
- **Frontend Method**: `GET`
- **Frontend URL**: `/api/resources/:id` (`src/api/resources.js` -> `fetchResourceById`)
- **Backend Method**: `GET`
- **Backend URL**: `/api/resources/:id`
- **Required Auth**: `Bearer <token>`
- **Success Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Resource details retrieved",
    "data": { "_id": "...", "name": "...", "resourceCode": "..." }
  }
  ```
- **Frontend Consumer**: `src/pages/ResourceDetailsPage.jsx`.

---

### 2.3 Create Resource (Admin Only)
- **Frontend Method**: `POST`
- **Frontend URL**: `/api/resources` (`src/api/resources.js` -> `createResource`)
- **Backend Method**: `POST`
- **Backend URL**: `/api/resources`
- **Required Auth**: `Bearer <token>`
- **Required Role**: `ADMIN` (403 Forbidden for `USER`)
- **Request Body**:
  ```json
  {
    "name": "Sony FX3 Camera",
    "resourceCode": "CAM-04",
    "category": "AUDIO",
    "status": "AVAILABLE",
    "location": "Studio Booth C",
    "description": "4K cinema camera",
    "requiresBadgeSignout": true
  }
  ```
- **Success Response (201 Created)**:
  ```json
  {
    "success": true,
    "message": "Resource created successfully",
    "data": { "_id": "...", "name": "..." }
  }
  ```
- **Frontend Consumer**: `src/components/AddResourceModal.jsx`.

---

### 2.4 Get Resource Availability
- **Frontend Method**: `GET`
- **Frontend URL**: `/api/resources/:id/availability?start=...&end=...` (`src/api/resources.js` -> `fetchResourceAvailability`)
- **Backend Method**: `GET`
- **Backend URL**: `/api/resources/:id/availability`
- **Required Auth**: `Bearer <token>`
- **Success Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Resource availability fetched",
    "data": {
      "resource": { "_id": "...", "name": "..." },
      "bookings": [
        {
          "_id": "...",
          "startTime": "2026-10-23T15:00:00.000Z",
          "endTime": "2026-10-23T16:30:00.000Z",
          "status": "CONFIRMED",
          "purpose": "Voiceover Recording"
        }
      ]
    }
  }
  ```
- **Frontend Consumer**: `src/pages/TimelinePage.jsx` (`loadTimelineData`).

---

## 3. Booking & Lifecycle Endpoints (`/api/bookings`)

### 3.1 Fetch Bookings
- **Frontend Method**: `GET`
- **Frontend URL**: `/api/bookings` (`src/api/bookings.js` -> `fetchBookings`)
- **Backend Method**: `GET`
- **Backend URL**: `/api/bookings`
- **Required Auth**: `Bearer <token>`
- **Role Behavior**: `USER` receives only their own bookings; `ADMIN` receives all bookings.
- **Success Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Bookings retrieved successfully",
    "data": [
      {
        "_id": "6704...",
        "resource": { "_id": "...", "name": "Shure SM7B Studio Mic #2" },
        "user": { "_id": "...", "name": "Jane Doe" },
        "startTime": "2026-10-23T15:00:00.000Z",
        "endTime": "2026-10-23T16:30:00.000Z",
        "status": "CONFIRMED",
        "passcode": "9042-888"
      }
    ]
  }
  ```
- **Frontend Consumer**: `src/App.jsx` (`loadBookingsFromAPI`).

---

### 3.2 Create Booking
- **Frontend Method**: `POST`
- **Frontend URL**: `/api/bookings` (`src/api/bookings.js` -> `createBooking`)
- **Backend Method**: `POST`
- **Backend URL**: `/api/bookings`
- **Required Auth**: `Bearer <token>`
- **Request Body**:
  ```json
  {
    "resourceId": "67039...a4",
    "startTime": "2026-10-23T15:00:00.000Z",
    "endTime": "2026-10-23T16:30:00.000Z",
    "purpose": "Sprint 24 Audio Recording & Voiceover"
  }
  ```
- **Success Response (201 Created)**:
  ```json
  {
    "success": true,
    "message": "Booking created successfully",
    "data": { "_id": "...", "status": "CONFIRMED", "passcode": "..." }
  }
  ```
- **Conflict Error (409 Conflict)**:
  ```json
  {
    "success": false,
    "message": "Resource is already booked for the requested time.",
    "conflict": true
  }
  ```
- **Frontend Consumer**: `src/pages/TimelinePage.jsx` (`handleReserveSlotSubmit`) & `src/pages/ResourceDetailsPage.jsx`.

---

### 3.3 Check-In Booking (`CONFIRMED → ACTIVE`)
- **Frontend Method**: `POST` / `PATCH`
- **Frontend URL**: `/api/bookings/:id/check-in` OR `/api/bookings/:id` (`status: "ACTIVE"`)
- **Backend Method**: `POST /api/bookings/:id/check-in` & `PATCH /api/bookings/:id`
- **Required Auth**: `Bearer <token>` (Owner or Admin)
- **Success Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Booking checked in successfully",
    "data": { "_id": "...", "status": "ACTIVE", "checkInAt": "2026-10-07T15:00:00.000Z" }
  }
  ```
- **Error Response (400 Bad Request if already checked in or completed/cancelled)**:
  ```json
  {
    "success": false,
    "message": "Booking is already checked in and active."
  }
  ```
- **Frontend Consumer**: `src/App.jsx` (`handleCheckIn`) & `src/components/BookingCard.jsx`.

---

### 3.4 End Booking Early (`ACTIVE → COMPLETED`)
- **Frontend Method**: `POST` / `PATCH`
- **Frontend URL**: `/api/bookings/:id/end` OR `/api/bookings/:id` (`status: "COMPLETED"`)
- **Backend Method**: `POST /api/bookings/:id/end` & `PATCH /api/bookings/:id`
- **Required Auth**: `Bearer <token>` (Owner or Admin)
- **Success Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Booking ended successfully",
    "data": { "_id": "...", "status": "COMPLETED", "endTime": "2026-10-07T15:15:00.000Z" }
  }
  ```
- **Frontend Consumer**: `src/App.jsx` (`handleConfirmEndEarly`) & `src/components/BookingModals.jsx` (`EndEarlyModal`).

---

### 3.5 Cancel Booking (`CONFIRMED → CANCELLED`)
- **Frontend Method**: `POST` / `DELETE` / `PATCH`
- **Frontend URL**: `/api/bookings/:id/cancel` OR `/api/bookings/:id` (DELETE)
- **Backend Method**: `POST /api/bookings/:id/cancel` & `DELETE /api/bookings/:id` & `PATCH /api/bookings/:id`
- **Required Auth**: `Bearer <token>` (Owner or Admin)
- **Success Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Booking cancelled successfully",
    "data": { "_id": "...", "status": "CANCELLED" }
  }
  ```
- **Frontend Consumer**: `src/App.jsx` (`handleConfirmCancel`) & `src/components/BookingModals.jsx` (`CancelModal`).

---

### 3.6 Extend Booking Duration
- **Frontend Method**: `POST` / `PATCH`
- **Frontend URL**: `/api/bookings/:id/extend` OR `/api/bookings/:id` (`endTime: "..."`)
- **Backend Method**: `POST /api/bookings/:id/extend` & `PATCH /api/bookings/:id`
- **Required Auth**: `Bearer <token>` (Owner or Admin)
- **Request Body**:
  ```json
  {
    "endTime": "2026-10-23T17:00:00.000Z"
  }
  ```
- **Success Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Booking extended successfully",
    "data": { "_id": "...", "endTime": "2026-10-23T17:00:00.000Z" }
  }
  ```
- **Conflict Response (409 Conflict)**:
  ```json
  {
    "success": false,
    "message": "Resource is already booked for the requested time.",
    "conflict": true
  }
  ```
- **Frontend Consumer**: `src/App.jsx` (`handleConfirmExtend`) & `src/components/BookingModals.jsx` (`ExtendModal`).

---

## Summary Matrix

| Domain | Action | HTTP Method | Endpoint | Required Role | Result Shape | Status Code |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Auth** | Register | `POST` | `/api/auth/register` | Public | `{ user, token }` | `201` |
| **Auth** | Login | `POST` | `/api/auth/login` | Public | `{ user, token }` | `200` |
| **Auth** | Session check | `GET` | `/api/auth/me` | User / Admin | `{ user }` | `200` |
| **Resources** | List All | `GET` | `/api/resources` | User / Admin | `[ resources ]` | `200` |
| **Resources** | Get One | `GET` | `/api/resources/:id` | User / Admin | `{ resource }` | `200` |
| **Resources** | Create | `POST` | `/api/resources` | Admin Only | `{ resource }` | `201` |
| **Resources** | Availability | `GET` | `/api/resources/:id/availability` | User / Admin | `{ resource, bookings }` | `200` |
| **Bookings** | List Mine/All | `GET` | `/api/bookings` | User / Admin | `[ bookings ]` | `200` |
| **Bookings** | Create | `POST` | `/api/bookings` | User / Admin | `{ booking }` | `201` |
| **Bookings** | Check In | `POST / PATCH` | `/api/bookings/:id/check-in` | Owner / Admin | `{ booking (status: ACTIVE) }` | `200` |
| **Bookings** | End Early | `POST / PATCH` | `/api/bookings/:id/end` | Owner / Admin | `{ booking (status: COMPLETED) }` | `200` |
| **Bookings** | Cancel | `POST / DELETE` | `/api/bookings/:id/cancel` | Owner / Admin | `{ booking (status: CANCELLED) }` | `200` |
| **Bookings** | Extend | `POST / PATCH` | `/api/bookings/:id/extend` | Owner / Admin | `{ booking }` | `200` / `409` |
