# TODO APP With User Details

## Overview
This project uses Docker Compose to set up a **MongoDB**, **backend**, and **frontend** service. The services communicate with each other to provide a fully functional application environment.

## Services

### 1. MongoDB
- **Image**: `mongodb/mongodb-community-server:latest`
- **Container Name**: `mongodb-database-1`
- **Restart Policy**: Always
- **Ports**: `27017:27017`
- **Volume**: `mongo_data:/data/db`
- **Environment Variables**:
  - `MONGO_INITDB_DATABASE=mydb`

### 2. Backend Service
- **Build Context**: `./backend-service`
- **Container Name**: `backend-service`
- **Restart Policy**: Always
- **Depends On**: `mongodb`
- **Ports**: `3002:3002`
- **Environment Variables**:
  - `MONGO_URI=mongodb://mongodb:27017/todoapp`
  - `PORT=3002`

### 3. Frontend Service
- **Build Context**: `./frontend-service`
- **Container Name**: `frontend-service`
- **Restart Policy**: Always
- **Depends On**: `backend`
- **Ports**: `8080:8081`
- **Environment Variables**:
  - `REACT_APP_BACKEND_URL=http://backend:3002`

## Running the Application

### **1. Clone the Repository**
```sh
git clone <your-repo-url>
cd <your-repo-name>
```

### **2. Start Services**
To build and run all services in detached mode:
```sh
docker-compose up --build -d
```

### **3. Verify Running Containers**
Check if all containers are running:
```sh
docker ps
```

### **4. Stopping Services**
To stop and remove containers:
```sh
docker-compose down
```

## Persistent Data
- The MongoDB service uses a Docker **volume (`mongo_data`)** to persist database data.
- To remove persistent data, delete the volume using:
  ```sh
  docker volume rm mongo_data
  ```

## Notes
- Ensure Docker and Docker Compose are installed before running the setup.
- The backend should be fully initialized before frontend requests data.
- If using `init.db.js`, ensure MongoDB is fully ready before executing it manually:
  ```sh
  docker exec backend-service node init.db.js
  ```

