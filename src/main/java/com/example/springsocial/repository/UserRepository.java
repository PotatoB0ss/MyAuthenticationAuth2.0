package com.example.springsocial.repository;

import com.example.springsocial.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    Boolean existsByEmail(String email);

    @Transactional
    @Modifying
    @Query("DELETE FROM User a WHERE a.id = ?1")
    void deleteUserById(Long id);

    @Transactional
    @Modifying
    @Query("UPDATE User a " +
            "SET a.emailVerified = TRUE WHERE a.email = ?1")
    int enableAppUser(String email);

}
