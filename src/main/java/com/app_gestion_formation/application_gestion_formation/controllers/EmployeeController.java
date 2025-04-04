package com.app_gestion_formation.application_gestion_formation.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app_gestion_formation.application_gestion_formation.models.Employee;
import com.app_gestion_formation.application_gestion_formation.repositories.EmployeeRepo;

@RestController
@RequestMapping("/emp")
public class EmployeeController {
    
    @Autowired // to access the jpa repositry 
    EmployeeRepo employeeRepo;

    public EmployeeController(EmployeeRepo employeeRepo) {
        this.employeeRepo = employeeRepo;
    }

    @PostMapping
    public Employee addEmployee(@RequestBody Employee employee){
        employeeRepo.save(employee);
        return employee;
    }

    @GetMapping
    public List<Employee> getEmployee(){
        List<Employee> employee = employeeRepo.findAll();
        return employee;
    }

    @PutMapping("/{id}")
    public ResponseEntity<Employee> updateEmployee(
            @PathVariable Integer id,// Extracts the id from the request URL
            @RequestBody Employee updated) {//Takes the new employee data sent in the request body and maps it to an Employee object
        
        return employeeRepo.findById(id)
                .map(emp -> {
                    emp.setName(updated.getName());
                    return ResponseEntity.ok(employeeRepo.save(emp));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    //deleeeeeete 
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteEmployee(@PathVariable Integer id) {  // Changed to Long
        return employeeRepo.findById(id)
                .map(employee -> {
                    employeeRepo.delete(employee);
                    return ResponseEntity.ok("Employee record deleted successfully!");
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
// replace only the field that i give it 
    @PatchMapping("/{id}")
    public ResponseEntity<Employee> patchEmployee(
            @PathVariable Integer id,
            @RequestBody Employee updated) {
        
        return employeeRepo.findById(id)
                .map(emp -> {
                    emp.setName(updated.getName());
                    return ResponseEntity.ok(employeeRepo.save(emp));
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
