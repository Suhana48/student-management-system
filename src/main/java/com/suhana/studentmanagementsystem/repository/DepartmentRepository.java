package com.suhana.studentmanagementsystem.repository;

import com.suhana.studentmanagementsystem.entity.Department;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DepartmentRepository extends JpaRepository<Department, Long> {

}