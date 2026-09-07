package com.suhana.studentmanagementsystem.repository;

import com.suhana.studentmanagementsystem.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StudentRepository extends JpaRepository<Student, Long> {

    List<Student> findByDepartmentId(Long departmentId);

    List<Student> findByNameContainingIgnoreCase(String name);

    List<Student> findByAttendanceLessThan(Double attendance);
}