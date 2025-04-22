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

import com.app_gestion_formation.application_gestion_formation.models.Role;
import com.app_gestion_formation.application_gestion_formation.repositories.RoleRepo;

@RestController
@RequestMapping("/api/role")
public class RoleController {

    @Autowired // to access the jpa repositry 
    RoleRepo roleRepo;
    
    public RoleController(RoleRepo roleRepo) {
        this.roleRepo = roleRepo;
    }

    @PostMapping
    public Role addRole(@RequestBody Role role){
        roleRepo.save(role);
        return role;
    }

    @GetMapping
    public List<Role> getRoles(){
        List<Role> role = roleRepo.findAll();
        return role;
    }

    @PutMapping("/{id}")
    public ResponseEntity<Role> updateRole(
            @PathVariable Integer id,// Extracts the id from the request URL
            @RequestBody Role updated) {//Takes the new employee data sent in the request body and maps it to an Employee object
        
        return roleRepo.findById(id)
                .map(role -> {
                    role.setNom(updated.getNom());
                    return ResponseEntity.ok(roleRepo.save(role));
                })
                .orElse(ResponseEntity.notFound().build());
    }

     //deleeeeeete 
     @DeleteMapping("/{id}")
     public ResponseEntity<String> deleteRole(@PathVariable Integer id) {  // Changed to Long
         return roleRepo.findById(id)
                 .map(role -> {
                    roleRepo.delete(role);
                     return ResponseEntity.ok("Role record deleted successfully!");
                 })
                 .orElseGet(() -> ResponseEntity.notFound().build());
     }
 // replace only the field that i give it 
     @PatchMapping("/{id}")
     public ResponseEntity<Role> patchEmployee(
             @PathVariable Integer id,
             @RequestBody Role updated) {
         
         return roleRepo.findById(id)
                 .map(role -> {
                     role.setNom(updated.getNom());
                     return ResponseEntity.ok(roleRepo.save(role));
                 })
                 .orElse(ResponseEntity.notFound().build());
     }


}
