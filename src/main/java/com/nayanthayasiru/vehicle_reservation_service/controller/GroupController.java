//package com.nayanthayasiru.vehicle_reservation_service.controller;
//
//import com.nayanthayasiru.vehicle_reservation_service.models.Group;
//import com.nayanthayasiru.vehicle_reservation_service.models.User;
//import com.nayanthayasiru.vehicle_reservation_service.repository.GroupRepository;
//import com.nayanthayasiru.vehicle_reservation_service.repository.UserRepository;
//import jakarta.validation.Valid;
//import lombok.AllArgsConstructor;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.core.annotation.AuthenticationPrincipal;
//import org.springframework.security.oauth2.core.user.OAuth2User;
//import org.springframework.web.bind.annotation.*;
//
//import java.net.URI;
//import java.net.URISyntaxException;
//import java.security.Principal;
//import java.util.Collection;
//import java.util.Map;
//import java.util.Optional;
//
//@RestController
//@AllArgsConstructor
//@RequestMapping("/api")
//public
//class GroupController {
//
//    private final Logger log = LoggerFactory.getLogger(GroupController.class);
//    private final GroupRepository groupRepository;
//    private final UserRepository userRepository;
//
//    @GetMapping("/groups")
//    Collection<Group> groups(Principal principal) {
//
//        return groupRepository.findAllByUserId(principal.getName());
//    }
//
//    @GetMapping("/group/{id}")
//    ResponseEntity<?> getGroup(@PathVariable Long id) {
//        Optional<Group> group = groupRepository.findById(id);
//        return group.map(response -> ResponseEntity.ok().body(response)).orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
//    }
//
//    @PostMapping("/group")
//    ResponseEntity<Group> createGroup(@Valid @RequestBody Group group, @AuthenticationPrincipal OAuth2User principal) throws URISyntaxException {
//        log.info("Request to create group: {}", group);
//        Map<String, Object> details = principal.getAttributes();
//        String userId = details.get("sub").toString();
//
//        // check to see if user already exists
//        Optional<User> user = userRepository.findById(userId);
//        group.setUser(user.orElse(
//                new User(userId,
//                        details.get("name").toString(),
//                        details.get("email").toString(),
//                        details.get("name").toString()
//                )));
////        detail = {sub="issuer|token",
////        email_verified=true,
////        iss=auth0 domain,
////        given_name=, locale=en,
////        nonce=",
////        picture="link",
////        sid="", aud=[""],
////        updated_at=time,
////        nickname="",
////        name=",
////        exp=time,
////        family_name="",
////        iat=time,
////        email=""}
//
//        Group result = groupRepository.save(group);
//        return ResponseEntity.created(new URI("/api/group/" + result.getId()))
//                .body(result);
//    }
//
//    @PutMapping("/group/{id}")
//    ResponseEntity<Group> updateGroup(@Valid @RequestBody Group group) {
//        log.info("Request to update group: {}", group);
//        Group result = groupRepository.save(group);
//        return ResponseEntity.ok().body(result);
//    }
//
//    @DeleteMapping("/group/{id}")
//    public ResponseEntity<?> deleteGroup(@PathVariable Long id) {
//        log.info("Request to delete group: {}", id);
//        groupRepository.deleteById(id);
//        return ResponseEntity.ok().build();
//    }
//}