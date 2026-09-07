package com.suhana.studentmanagementsystem.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    private String phone;

    private Integer year;

    private Double cgpa;

    private Double attendance;

    @ManyToOne
    @JoinColumn(name = "department_id", nullable = false)
    private Department department;
}