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

import com.app_gestion_formation.application_gestion_formation.models.Employeur;
import com.app_gestion_formation.application_gestion_formation.repositories.EmployeurRepo;

@RestController
@RequestMapping("/emp")
public class EmployeurController {
    
    @Autowired // to access the jpa repositry 
    EmployeurRepo employeeRepo;

    public EmployeurController(EmployeurRepo employeeRepo) {
        this.employeeRepo = employeeRepo;
    }

    @PostMapping
    public Employeur addEmployee(@RequestBody Employeur employee){
        employeeRepo.save(employee);
        return employee;
    }

    @GetMapping
    public List<Employeur> getEmployee(){
        List<Employeur> employee = employeeRepo.findAll();
        return employee;
    }

    @PutMapping("/{id}")
    public ResponseEntity<Employeur> updateEmployee(
            @PathVariable Integer id,// Extracts the id from the request URL
            @RequestBody Employeur updated) {//Takes the new employee data sent in the request body and maps it to an Employee object
        
        return employeeRepo.findById(id)
                .map(emp -> {
                    emp.setNomemployeur(updated.getNomemployeur());
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
    public ResponseEntity<Employeur> patchEmployee(
            @PathVariable Integer id,
            @RequestBody Employeur updated) {
        
        return employeeRepo.findById(id)
                .map(emp -> {
                    emp.setNomemployeur(updated.getNomemployeur());
                    return ResponseEntity.ok(employeeRepo.save(emp));
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
