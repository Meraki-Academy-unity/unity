DROP DATABASE IF EXISTS `meraki_academy_project_5`;
CREATE DATABASE `meraki_academy_project_5`;
use `meraki_academy_project_5`;

CREATE TABLE roles (
    id INT AUTO_INCREMENT NOT NULL,
    role VARCHAR(255) NOT NULL,
    -- permission VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
    -- FOREIGN KEY (Friend_id ) REFERENCES users(id)
);

CREATE TABLE users(
    id INT AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    display_name VARCHAR(255),
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    region VARCHAR(255), 
    currently_in VARCHAR(255),
    birth_date DATE DEFAULT NULL,
    language VARCHAR(255), 
    gender VARCHAR(255) ,
    profile_image TEXT ,
    is_completed BOOLEAN DEFAULT 0,    
    role_id INT DEFAULT 1,
    is_deleted TINYINT DEFAULT 0,
    FOREIGN KEY (role_id) REFERENCES roles(id),
    PRIMARY KEY (id)
);

CREATE TABLE status(
    id INT AUTO_INCREMENT NOT NULL,
    status VARCHAR(255) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE preferences(
    id INT AUTO_INCREMENT NOT NULL,
    location VARCHAR(255) NOT NULL,
    start_date DATE NOT NULL,
    finish_date DATE NOT NULL,
    activities VARCHAR(255),
    similar_age BOOL default 0,
    same_gender BOOL DEFAULT 0,
    user_id INT UNIQUE,
    FOREIGN KEY (user_id) REFERENCES users(id),
    PRIMARY KEY (id)
);

CREATE TABLE activities (
    id INT AUTO_INCREMENT NOT NULL,
    title VARCHAR(255)  NOT NULL,
    start_date DATE NOT NULL,
    finish_date DATE NOT NULL,
    location VARCHAR(255) NOT NULL,
    details VARCHAR(255), 
    requirements VARCHAR(255) ,
    activities VARCHAR(255) ,
    images TEXT ,
    estimated_budget INT,
    status_id INT DEFAULT 1,
    user_id INT,
    creation_time  DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id ) REFERENCES users(id ),
    FOREIGN KEY (status_id) REFERENCES status(id),
    PRIMARY KEY(id)
);


CREATE TABLE activity_comments(
    id INT AUTO_INCREMENT NOT NULL,
    user_id INT,
    activity_id INT,
    content VARCHAR(255) NOT NULL,
    is_deleted TINYINT DEFAULT 0,
    FOREIGN KEY (user_id ) REFERENCES users(id),
    FOREIGN KEY (activity_id) REFERENCES activities(id),
    PRIMARY KEY(id)
);



CREATE TABLE travel_plans(
    id INT AUTO_INCREMENT NOT NULL,
    user_id INT,
    title VARCHAR(255) NOT NULL,
    start_date DATE NOT NULL,
    finish_date DATE NOT NULL,
    countries VARCHAR(255) NOT NULL,
    activities VARCHAR(255) ,
    requirements VARCHAR(255) ,
    details VARCHAR(255) NOT NULL,
    images TEXT ,
    estimated_budget VARCHAR(255),
    status_id INT DEFAULT 1,
    creation_time  DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id ) REFERENCES users(id),
    FOREIGN KEY (status_id) REFERENCES status(id),
    PRIMARY KEY(id)
);

CREATE TABLE travel_plans_comments(
    id INT AUTO_INCREMENT NOT NULL,
    user_id INT,
    travel_plans_id INT,
    content VARCHAR(255) NOT NULL,
    is_deleted TINYINT DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (travel_plans_id) REFERENCES travel_plans(id),
    PRIMARY KEY(id)
);

CREATE TABLE plan_members(
    id INT AUTO_INCREMENT NOT NULL,
    user_id INT,
    plan_id INT,
    FOREIGN KEY (user_id ) REFERENCES users(id ),
    FOREIGN KEY (plan_id ) REFERENCES travel_plans(id),
    PRIMARY KEY(id)
);


CREATE TABLE activity_members(
    id INT AUTO_INCREMENT NOT NULL,
    user_id INT,
    activity_id INT,
    FOREIGN KEY (user_id ) REFERENCES users(id ),
    FOREIGN KEY (activity_id ) REFERENCES activities(id ),
    PRIMARY KEY(id)
);


CREATE TABLE friend_list (
    id INT AUTO_INCREMENT NOT NULL,
    user_id INT,
    friend_id INT,
    FOREIGN KEY (user_id ) REFERENCES users(id),
    FOREIGN KEY (friend_id ) REFERENCES users(id),
    PRIMARY KEY(id)
);

CREATE TABLE images (
    id INT AUTO_INCREMENT NOT NULL,
    user_id INT,
    images TEXT ,
    FOREIGN KEY (user_id) REFERENCES users(id),
    PRIMARY KEY(id)
);

CREATE TABLE messages (
    id INT AUTO_INCREMENT NOT NULL,
    room_id INT NOT NULL ,
    content TEXT,
    sender_id INT,
    receiver_id INT,
    FOREIGN KEY (sender_id) REFERENCES users(id),
    FOREIGN KEY (receiver_id) REFERENCES users(id),
    PRIMARY KEY (id)
);





INSERT INTO roles (role) VALUES ('user');
INSERT INTO roles (role) VALUES ('admin');

INSERT INTO status (status) VALUES ('in preparation');
INSERT INTO status (status) VALUES ('ongoing');
INSERT INTO status (status) VALUES ('completed');

-- Users Insertions
INSERT INTO users (first_name,last_name,email,currently_in,password) VALUES ("Bayan","Alsafadi", "bayan@hotmail.com","Jordan","123456");
INSERT INTO users (first_name,last_name,email,currently_in,password) VALUES ("Deyaa","Mosa", "deyaa@hotmail.com","Jordan","123456");
INSERT INTO users (first_name,last_name,email,currently_in,password) VALUES ("Roaa","Maghayda", "roaa@hotmail.com","Jordan","123456");
INSERT INTO users (first_name,last_name,email,currently_in,password) VALUES ("Tariq","Bazadough", "tariq@hotmail.com","Jordan","123456");

-- Preferences Insertions
INSERT INTO preferences (location,start_date,finish_date,activities,similar_age,same_gender,user_id) VALUES ("Germany","2020-05-08","2020-08-25","climbing,swimming,..",true,false,1);
INSERT INTO preferences (location,start_date,finish_date,activities,similar_age,same_gender,user_id) VALUES ("Italy","2020-09-08","2020-02-25","climbing,swimming,..",true,true,2);
INSERT INTO preferences (location,start_date,finish_date,activities,similar_age,same_gender,user_id) VALUES ("France","2020-03-08","2020-01-25","climbing,swimming,..",true,false,3);
INSERT INTO preferences (location,start_date,finish_date,activities,similar_age,same_gender,user_id) VALUES ("Germany","2020-09-08","2020-07-25","climbing,swimming,..",true,true,4);

-- Travel_Plans insertions
INSERT INTO travel_plans (user_id,title, start_date, finish_date , countries , activities , requirements , details , images , estimated_budget) VALUES (1,"Camping","2020-03-08","2020-01-25", "jordan,germany..", "Camping,Swimming..", "JUST COME", "ENJOY THE JOURNEY", "./images/img1", 509 );
INSERT INTO travel_plans (user_id,title, start_date, finish_date , countries , activities , requirements , details , images , estimated_budget) VALUES (2,"To Germany","2020-03-08","2020-01-25", "Italy,germany..", "Climbing,Swimming..", "JUST COME", "ENJOY THE JOURNEY", "./images/img1", 580 );
INSERT INTO travel_plans (user_id,title, start_date, finish_date , countries , activities , requirements , details , images , estimated_budget) VALUES (3,"Traveling","2020-03-08","2020-01-25", "jordan,germany..", "Playing,Swimming..", "JUST COME", "ENJOY THE JOURNEY", "./images/img1", 200 );
INSERT INTO travel_plans (user_id,title, start_date, finish_date , countries , activities , requirements , details , images , estimated_budget) VALUES (4,"To France","2020-03-08","2020-01-25", "jordan,France..", "Climbing,Swimming..", "JUST COME", "ENJOY THE JOURNEY", "./images/img1", 500 );

-- Activities insertions
INSERT INTO activities (user_id,title,location, start_date, finish_date , activities , requirements , details , images , estimated_budget) VALUES (1,"Camping","Jordan","2020-03-08","2020-01-25" ,"Camping,Swimming..", "JUST COME", "ENJOY THE JOURNEY", "./images/img1", 509);
INSERT INTO activities (user_id,title,location, start_date, finish_date , activities , requirements , details , images , estimated_budget) VALUES (2,"To Germany","France","2020-03-08","2020-01-25" ,"Climbing,Swimming..", "JUST COME", "ENJOY THE JOURNEY", "./images/img1", 580);
INSERT INTO activities (user_id,title,location, start_date, finish_date , activities , requirements , details , images , estimated_budget) VALUES (3,"Traveling","Germany","2020-03-08","2020-01-25","Playing,Swimming..", "JUST COME", "ENJOY THE JOURNEY", "./images/img1", 200);
INSERT INTO activities (user_id,title,location, start_date, finish_date , activities , requirements , details , images , estimated_budget) VALUES (4,"To France","America","2020-03-08","2020-01-25", "Climbing,Swimming..", "JUST COME", "ENJOY THE JOURNEY", "./images/img1", 500);

-- Activiy_comments insertions
INSERT INTO activity_comments (content,user_id,activity_id) VALUES ("Sounds Great To Join !",1,1);
INSERT INTO activity_comments (content,user_id,activity_id) VALUES ("Seems Great To Join !",2,2);
INSERT INTO activity_comments (content,user_id,activity_id) VALUES ("Sounds Great To Join !",3,2);
INSERT INTO activity_comments (content,user_id,activity_id) VALUES ("Not Interested !",4,1);

-- Travel_Plans_Comments insertions
INSERT INTO travel_plans_comments (content,user_id,travel_plans_id) VALUES ("Sounds Great To Join !",1,1);
INSERT INTO travel_plans_comments (content,user_id,travel_plans_id) VALUES ("Sounds Great To Join !",2,2);
INSERT INTO travel_plans_comments (content,user_id,travel_plans_id) VALUES ("Sounds Great To Join !",3,2);
INSERT INTO travel_plans_comments (content,user_id,travel_plans_id) VALUES ("Sounds Great To Join !",4,1);
