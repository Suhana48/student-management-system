# Student Management System

A full-stack **Student Management System** built with **React, Spring Boot, and MySQL**.

The application allows users to manage student records and academic departments through a modern dashboard with real-time statistics and visualizations.

---

## 🚀 Features

### 👩‍🎓 Student Management

- Add new students
- View all students
- Edit student details
- Delete students
- Search students by name, email, or department
- Track CGPA and attendance
- Assign students to departments dynamically

### 🏢 Department Management

- Add departments
- View all departments
- Edit department details
- Delete departments without assigned students
- View the number of students in each department

### 📊 Dashboard

- Total students
- Total departments
- Average CGPA
- Low attendance count
- Student distribution by department
- Overall attendance visualization

---

## 🛠️ Tech Stack

### Frontend

- React
- JavaScript
- CSS
- Axios

### Backend

- Java
- Spring Boot
- Spring Data JPA
- Hibernate

### Database

- MySQL

---

## 🏗️ Project Structure

```text
student-management-system/
│
├── .mvn/
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   └── pages/
│   └── package.json
│
├── src/
│   └── main/
│       ├── java/
│       │   └── com/suhana/studentmanagementsystem/
│       │       ├── controller/
│       │       ├── entity/
│       │       ├── repository/
│       │       └── service/
│       │
│       └── resources/
│
├── pom.xml
├── mvnw
└── mvnw.cmd
