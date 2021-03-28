package com.ducnguyen.news;

import com.ducnguyen.news.controller.IController;
import com.ducnguyen.news.model.Role;
import com.ducnguyen.news.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class NewsApplication implements CommandLineRunner {
	@Autowired
	private IController<Role> roleIController;

	@Autowired
	private IController<User> userIController;

	public static void main(String[] args) {
		SpringApplication.run(NewsApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		if(roleIController.getAll().isEmpty()) {
			roleIController.create(new Role(1L, "admin"));
			roleIController.create(new Role(2L, "user"));
		}

		if(userIController.getAll().isEmpty()) {
			User user1 = new User();
			user1.setEmail("test@user.com");
			user1.setName("Test User");
			user1.setRole(roleIController.getById(2L));
			user1.setPassword(new BCryptPasswordEncoder().encode("testuser"));
			userIController.create(user1);

			User user2 = new User();
			user2.setEmail("test@admin.com");
			user2.setName("Test Admin");
			user2.setRole(roleIController.getById(1L));
			user2.setPassword(new BCryptPasswordEncoder().encode("testadmin"));
			userIController.create(user2);
		}
	}
}
