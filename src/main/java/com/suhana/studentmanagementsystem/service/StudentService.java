package com.suhana.studentmanagementsystem.service;

import com.suhana.studentmanagementsystem.entity.Department;
import com.suhana.studentmanagementsystem.entity.Student;
import com.suhana.studentmanagementsystem.repository.DepartmentRepository;
import com.suhana.studentmanagementsystem.repository.StudentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {

    private final StudentRepository studentRepository;
    private final DepartmentRepository departmentRepository;

    public StudentService(StudentRepository studentRepository,
                          DepartmentRepository departmentRepository) {
        this.studentRepository = studentRepository;
        this.departmentRepository = departmentRepository;
    }

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public List<Student> getStudentsByDepartment(Long departmentId) {
        return studentRepository.findByDepartmentId(departmentId);
    }

    public List<Student> searchStudentsByName(String name) {
        return studentRepository.findByNameContainingIgnoreCase(name);
    }

    public List<Student> getLowAttendanceStudents(Double threshold) {
        return studentRepository.findByAttendanceLessThan(threshold);
    }

    public Student getStudentById(Long id) {
        return studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found"));
    }

    public Student addStudent(Student student, Long departmentId) {

        Department department = departmentRepository.findById(departmentId)
                .orElseThrow(() -> new RuntimeException("Department not found"));

        student.setDepartment(department);

        return studentRepository.save(student);
    }

    public Student updateStudent(Long id, Student updatedStudent) {

        Student existingStudent = getStudentById(id);

        existingStudent.setName(updatedStudent.getName());
        existingStudent.setEmail(updatedStudent.getEmail());
        existingStudent.setPhone(updatedStudent.getPhone());
        existingStudent.setYear(updatedStudent.getYear());
        existingStudent.setCgpa(updatedStudent.getCgpa());
        existingStudent.setAttendance(updatedStudent.getAttendance());

        return studentRepository.save(existingStudent);
    }

    public void deleteStudent(Long id) {
        studentRepository.deleteById(id);
    }
}