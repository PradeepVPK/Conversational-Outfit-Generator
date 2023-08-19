package com.fashionai.styleBot.repository;

import com.fashionai.styleBot.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository  extends MongoRepository<User,String> {

}

