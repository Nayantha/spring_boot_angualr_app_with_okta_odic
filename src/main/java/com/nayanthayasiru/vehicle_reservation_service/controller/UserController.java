package com.nayanthayasiru.vehicle_reservation_service.controller;

import com.nayanthayasiru.vehicle_reservation_service.models.User;
import com.nayanthayasiru.vehicle_reservation_service.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.text.MessageFormat;

import static java.util.Map.of;

@RestController
@RequestMapping("/api")
public class UserController {
    private final ClientRegistration registration;
    private final UserRepository userRepository;

    public UserController(ClientRegistrationRepository registrations, UserRepository userRepository) {
        this.registration = registrations.findByRegistrationId("okta");
        this.userRepository = userRepository;
    }

    @GetMapping("/user")
    public ResponseEntity<?> getUser(@AuthenticationPrincipal OAuth2User user) {
        if (user == null) {
            return new ResponseEntity<>("", HttpStatus.OK);
        } else {
            return ResponseEntity.ok().body(user.getAttributes());
        }
    }

    @GetMapping("/get_saved_user")
    public ResponseEntity<?> getSavedUser(Principal principal) {
        User user = userRepository.findById(principal.getName()).orElse(null);
        if (user == null) {
            return new ResponseEntity<>("", HttpStatus.NOT_FOUND);
        } else {
            return ResponseEntity.ok().body(user);
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) {
        // send logout URL to client so they can initiate logout
        var issuerUri = registration.getProviderDetails().getIssuerUri();
        var originUrl = request.getHeader(HttpHeaders.ORIGIN);
        Object[] params = {issuerUri, registration.getClientId(), originUrl};
        // Yes! We @ Auth0 should have an end_session_endpoint in our OIDC metadata.
        // It's not included at the time of this writing, but will be coming soon!
        var logoutUrl = MessageFormat.format("{0}v2/logout?client_id={1}&returnTo={2}", params);
        request.getSession().invalidate();
        return ResponseEntity.ok().body(of("logoutUrl", logoutUrl));
    }
}
