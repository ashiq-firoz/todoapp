# 📝 React Todo App

A modern, responsive Todo application built with React, Tailwind CSS, and Docker. Keep track of your tasks with style! 

## ✨ Features

- ✅ Create, Read, Update, Delete tasks
- 💾 Local storage persistence
- 🎨 Clean UI with Tailwind CSS
- 📱 Fully responsive design
- 🐳 Docker ready

## 🛠️ Tech Stack

- React
- Vite
- Tailwind CSS
- Docker

## 🚀 Quick Start

### Local Development

1. Clone the repository
```bash
git clone https://github.com/ashiq-firoz/todoapp.git
cd todoapp
```

2. Install dependencies
```bash
npm install
```

3. Start development server
```bash
npm run dev
```

4. Open browser and visit `http://localhost:5173`

### 🐳 Docker Setup

#### Build the image
```bash
docker build -t your-docker-username/todoapp:latest .
```

#### Push to Docker Hub (optional)
```bash
docker push your-docker-username/todoapp
```

#### Using Docker Compose

1. Run the container:
```bash
docker-compose up -d
```
or 
```bash
docker compose up -d
```

3. Visit `http://localhost:3000` in your browser 🎉  [Edit the port in docker-compose.yaml file]

4. To stop the container:
```bash
docker-compose down
```
or
```bash
docker compose down
```

## 💻 Usage

- Add a new task: Type in the input field and press Enter or click Add
- Complete a task: Click the checkbox
- Edit a task: Click the Edit button
- Delete a task: Click the Delete button
- Clear completed: Click "Clear completed" at the bottom

