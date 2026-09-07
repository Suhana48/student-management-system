package com.suhana.studentmanagementsystem.controller;

import com.suhana.studentmanagementsystem.entity.Student;
import com.suhana.studentmanagementsystem.service.StudentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
public class StudentController {

    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping
    public List<Student> getAllStudents() {
        return studentService.getAllStudents();
    }

    // Get students belonging to a specific department
    @GetMapping("/department/{departmentId}")
    public List<Student> getStudentsByDepartment(
            @PathVariable Long departmentId) {

        return studentService.getStudentsByDepartment(departmentId);
    }

    @GetMapping("/{id}")
    public Student getStudentById(@PathVariable Long id) {
        return studentService.getStudentById(id);
    }

    @PostMapping
    public Student addStudent(
            @RequestBody Student student,
            @RequestParam Long departmentId) {

        return studentService.addStudent(student, departmentId);
    }

    @PutMapping("/{id}")
    public Student updateStudent(
            @PathVariable Long id,
            @RequestBody Student student) {

        return studentService.updateStudent(id, student);
    }

    @DeleteMapping("/{id}")
    public void deleteStudent(@PathVariable Long id) {
        studentService.deleteStudent(id);
    }
}