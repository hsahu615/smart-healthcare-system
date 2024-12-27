# Auth Service

Auth Service provides authentication and authorization capabilities for your application. It includes APIs for user registration (`signup`) and login (`signin`), generating JWT tokens for secure communication between clients and services.

---

## APIs

### 1. **Signup API**
- **Endpoint**: `POST /api/auth/signup`
- **Description**: Registers a new user with a username, email, roles, and password.
- **Request Body**:
    ```json
    {
        "username": "aman",
        "email": "aman@google.com",
        "roles": ["ROLE_ADMIN"],
        "password": "Admin@123"
    }
    ```
- **Response**: Returns success or error message based on the operation's outcome.

---

### 2. **Signin API**
- **Endpoint**: `POST /api/auth/signin`
- **Description**: Authenticates a user and provides a JWT token.
- **Request Body**:
    ```json
    {
        "username": "aman",
        "password": "Admin@123"
    }
    ```
- **Response**:
    ```json
    {
        "token": "eyJhbGciOiJIUzIINiJ9.eyJzdWIiOiJhbWFuIiwicm9sZSI6I|JPTEVIUEFUSUVOVCIsImIhdCI6MTczNTI5MjA5NCwiZXhwIjoxNzM1Mzc4NDk0fQ.aZ_N7UBbJQQX_8z_4VXsmiUR_KZclossHYsCXt2_isk",
        "type": "Bearer",
        "id": "676e742b58574f384989b0af",
        "username": "aman",
        "email": "aman@google.com",
        "roles": [
            "ROLE_PATIENT"
        ]
    }
    ```
---

## MongoDB Setup in Docker

### Run MongoDB
To start MongoDB as a Docker container:
```bash
docker run -d \
  --name mongodb \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=root \
  -e MONGO_INITDB_ROOT_PASSWORD=rootpassword \
  mongo:6.0
  ```

### Check MongoDB collections
- docker exec -it mongodb mongosh
- use admin
- db.auth("root", "rootpassword")
- use healthcare
- show collections
- db.roles.find()

## Running the Project

To run this project, use the following commands in your terminal or command prompt:
```bash
mvn install
mvn spring-boot:run
