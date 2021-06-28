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
    profile_image VARCHAR(255) ,
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
    images VARCHAR(255) ,
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
    images VARCHAR(255) ,
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

INSERT INTO roles (role) VALUES ('user');
INSERT INTO roles (role) VALUES ('admin');

INSERT INTO status (status) VALUES ('in preparation');
INSERT INTO status (status) VALUES ('ongoing');
INSERT INTO status (status) VALUES ('completed');


