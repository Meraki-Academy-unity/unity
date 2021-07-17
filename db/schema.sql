DROP DATABASE IF EXISTS `meraki_academy_project_5`;
CREATE DATABASE `meraki_academy_project_5`;
use `meraki_academy_project_5`;

CREATE TABLE roles (
    id INT AUTO_INCREMENT NOT NULL,
    role VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
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

-- Roles Insertions 
INSERT INTO roles (role) VALUES ('user');
INSERT INTO roles (role) VALUES ('admin');

-- Status Insertions
INSERT INTO status (status) VALUES ('in preparation');
INSERT INTO status (status) VALUES ('ongoing');
INSERT INTO status (status) VALUES ('completed');

-- Users Insertions
INSERT INTO users (first_name,last_name,email,currently_in,password,profile_image,display_name,region,birth_date,language,gender,is_completed) VALUES ("Bayan","Alsafadi", "bayan@hotmail.com","Jordan","123456","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIWt8sKjIJVbD87NnClgD6dSIKtYTDe4Crhw&usqp=CAU","Bayan99","Jordan","1995-04-16","English","Female",1);
INSERT INTO users (first_name,last_name,email,currently_in,password,profile_image,display_name,region,birth_date,language,gender,is_completed) VALUES ("Deyaa","Mosa", "deyaa@hotmail.com","Jordan","123456","https://images.unsplash.com/photo-1444464666168-49d633b86797?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1649&q=80","Deyaa97","Jordan","1995-04-16","English","Male",1);
INSERT INTO users (first_name,last_name,email,currently_in,password,profile_image,display_name,region,birth_date,language,gender,is_completed) VALUES ("Roaa","Maghayda", "roaa@hotmail.com","Jordan","123456","https://images.hindustantimes.com/rf/image_size_630x354/HT/p2/2020/04/20/Pictures/baby-cat-inside-blue-jeans-pocket_5da62eee-82ca-11ea-a351-6978c1d205f3.jpg","Roaa97","Jordan","1995-04-16","English","Female",1);
INSERT INTO users (first_name,last_name,email,currently_in,password,profile_image,display_name,region,birth_date,language,gender,is_completed) VALUES ("Tariq","Bazadough", "tariq@hotmail.com","Jordan","123456","https://i.pinimg.com/originals/7d/a8/03/7da8035ebf74acd77a47a271676ed29d.png","Tariq91","Jordan","1995-04-16","English","Male",1);
INSERT INTO users (first_name,last_name,email,currently_in,password,profile_image,display_name,region,birth_date,language,gender,is_completed) VALUES ("Jad","Zayton", "olive@hotmail.com","Jordan","123456","https://www.thespruce.com/thmb/LPg5W8soet5nogIY3w3OC59A3EI=/2466x2466/smart/filters:no_upscale()/fruitless-olive-tree-profile-4158521-hero-f11d6bb714f94b81b7c8c080079d5e68.jpg","Zayton","Jordan","1995-04-16","English","Male",1);
INSERT INTO users (first_name,last_name,email,currently_in,password,profile_image,display_name,region,birth_date,language,gender,is_completed) VALUES ("Mohd","Jouza", "Jouza@hotmail.com","Jordan","123456","https://i.pinimg.com/originals/12/8d/e8/128de8ce51ee0c498a4dfa67610f5843.jpg","Jouza","Jordan","1995-04-16","English","Male",1);
INSERT INTO users (first_name,last_name,email,currently_in,password,profile_image,display_name,region,birth_date,language,gender,is_completed) VALUES ("Mohd","Khames", "Thursday@hotmail.com","Jordan","123456","https://i.pinimg.com/originals/a5/45/40/a54540303f9bd06f42f93cb77949130d.jpg","Thursday","Jordan","1995-04-16","English","Male",1);
INSERT INTO users (first_name,last_name,email,currently_in,password,profile_image,display_name,region,birth_date,language,gender,is_completed) VALUES ("Mostufa","Al-Jalmnee", "jalmneeeeee@hotmail.com","Jordan","123456","https://images.hugoboss.com/is/image/hugobossdm/HBME_110_2021_BOSS_MTM_020_sRGB?%24large%24&align=0,-1&fit=crop,1&ts=1614091971370&wid=512","Om_Issam","Jordan","1995-04-16","English","Male",1);

-- Preferences Insertions
INSERT INTO preferences (location,start_date,finish_date,activities,similar_age,same_gender,user_id) VALUES ("Germany","2021-11-08","2022-01-02","Explore Germany",true,false,1);
INSERT INTO preferences (location,start_date,finish_date,activities,similar_age,same_gender,user_id) VALUES ("Italy","2021-10-08","2021-11-25","Eat Pizza",true,true,2);
INSERT INTO preferences (location,start_date,finish_date,activities,similar_age,same_gender,user_id) VALUES ("France","2021-09-08","2021-10-25","visit evil tower and louver museum",true,false,3);
INSERT INTO preferences (location,start_date,finish_date,activities,similar_age,same_gender,user_id) VALUES ("Germany","2021-08-08","2021-08-25","nothing in particular",true,true,4);
INSERT INTO preferences (location,start_date,finish_date,activities,similar_age,same_gender,user_id) VALUES ("Belgium","2021-08-08","2021-08-25","Eat All The Brosted Chickens",true,true,6);
INSERT INTO preferences (location,start_date,finish_date,activities,similar_age,same_gender,user_id) VALUES ("Belgium","2021-08-08","2021-08-25","Nothing Suspicious",true,true,5);
INSERT INTO preferences (location,start_date,finish_date,activities,similar_age,same_gender,user_id) VALUES ("Italy","2021-08-08","2021-08-25","Eat All The Food I Can",true,true,7);
INSERT INTO preferences (location,start_date,finish_date,activities,similar_age,same_gender,user_id) VALUES ("France","2021-09-08","2021-11-25","Spend Summer In France",true,true,8);

-- Travel_Plans insertions
INSERT INTO travel_plans (user_id,title, start_date, finish_date , countries , activities , requirements , details , images , estimated_budget) VALUES (1,"2 Week Trip To Wadi Rum","2021-09-08","2021-10-05", "Jordan", "Camping, Walking, Rock Climbing ", "get a sleeping bag", "Lets Relax and enjoy the view", "https://images.unsplash.com/photo-1559213606-41c9054a460e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1100&q=80", 200 );
INSERT INTO travel_plans (user_id,title, start_date, finish_date , countries , activities , requirements , details , images , estimated_budget) VALUES (2,"Summer Time In Germany","2021-08-08","2021-09-25", "Germany", "Just Relax", "no requirements", "ENJOY THE JOURNEY", "https://images.unsplash.com/photo-1528819837997-629b477fb7dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1097&q=80", 1000 );
INSERT INTO travel_plans (user_id,title, start_date, finish_date , countries , activities , requirements , details , images , estimated_budget) VALUES (3,"Exploring South Of France","2021-09-08","2021-10-25", "France", "sightseeing", "no requirements", "lets explore south of france", "https://images.unsplash.com/photo-1572907564143-ee1ef5882732?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1085&q=80", 1200 );
INSERT INTO travel_plans (user_id,title, start_date, finish_date , countries , activities , requirements , details , images , estimated_budget) VALUES (4,"A Month Trip To Belgium","2021-10-08","2021-11-08", "Belgium", "Rock Climbing, Swimming and Sky Diving", "Brave Heart", "ENJOY THE JOURNEY", "https://images.unsplash.com/photo-1615711088116-03b5a9fd345a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1119&q=80", 1000 );
INSERT INTO travel_plans (user_id,title, start_date, finish_date , countries , activities , requirements , details , images , estimated_budget) VALUES (5,"Tokyo","2021-10-08","2021-11-08", "Japan", "Exploring Tokyo", "Nothing Is Required", "lets have great time", "https://images.unsplash.com/photo-1553292770-c3d14b814242?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1073&q=80", 1500 );

-- Activities insertions
INSERT INTO activities (user_id,title,location, start_date, finish_date , activities , requirements , details , images , estimated_budget) VALUES (1,"weekend trip to petra","Jordan","2021-07-25","2021-7-28" ,"sightseeing", "hat to protect you from the sun", "ENJOY THE JOURNEY", "https://images.unsplash.com/photo-1579629625630-a99da9fd4c83?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1650&q=80", 550);
INSERT INTO activities (user_id,title,location, start_date, finish_date , activities , requirements , details , images , estimated_budget) VALUES (2,"France","France","2021-08-08","2021-09-25" ,"sightseeing", "JUST COME", "ENJOY THE JOURNEY", "https://images.unsplash.com/photo-1526893381913-e311045b8064?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1100&q=80", 550);
INSERT INTO activities (user_id,title,location, start_date, finish_date , activities , requirements , details , images , estimated_budget) VALUES (3,"Traveling In Germany","Germany","2021-08-08","2021-09-25","Hiking", "JUST COME", "ENJOY THE JOURNEY", "https://images.unsplash.com/photo-1582785513879-fcd3ea2b5af8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1100&q=80", 200);
INSERT INTO activities (user_id,title,location, start_date, finish_date , activities , requirements , details , images , estimated_budget) VALUES (4,"Wadi Rum","Jordan","2021-08-08","2021-09-25", "Climbing and Hiking", "JUST COME", "ENJOY THE JOURNEY", "https://images.unsplash.com/photo-1492693429561-1c283eb1b2e8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1100&q=80", 80);

-- Activiy_comments insertions
INSERT INTO activity_comments (content,user_id,activity_id) VALUES ("Sounds Great To Join !",1,1);
INSERT INTO activity_comments (content,user_id,activity_id) VALUES ("Looking forward for it  !",2,2);
INSERT INTO activity_comments (content,user_id,activity_id) VALUES ("Sounds allot of Fun !",3,2);
INSERT INTO activity_comments (content,user_id,activity_id) VALUES ("That's Looks Awesome !",4,1);

-- Travel_Plans_Comments insertions
INSERT INTO travel_plans_comments (content,user_id,travel_plans_id) VALUES ("Sounds Great To Join !",1,1);
INSERT INTO travel_plans_comments (content,user_id,travel_plans_id) VALUES ("Looking forward for it !",2,2);
INSERT INTO travel_plans_comments (content,user_id,travel_plans_id) VALUES ("Sounds allot of Fun !",3,2);
INSERT INTO travel_plans_comments (content,user_id,travel_plans_id) VALUES ("That's Looks Awesome !",7,1);
INSERT INTO travel_plans_comments (content,user_id,travel_plans_id) VALUES ("That's Looks Awesome !",6,5);
INSERT INTO travel_plans_comments (content,user_id,travel_plans_id) VALUES ("That's Looks Awesome !",4,5);

-- friend_list insertions
INSERT INTO friend_list (user_id, friend_id) VALUES (1,2);
INSERT INTO friend_list (user_id, friend_id) VALUES (1,3);
INSERT INTO friend_list (user_id, friend_id) VALUES (1,4);
INSERT INTO friend_list (user_id, friend_id) VALUES (3,2);
INSERT INTO friend_list (user_id, friend_id) VALUES (4,2);
INSERT INTO friend_list (user_id, friend_id) VALUES (5,2);
INSERT INTO friend_list (user_id, friend_id) VALUES (6,7);
INSERT INTO friend_list (user_id, friend_id) VALUES (6,1);
INSERT INTO friend_list (user_id, friend_id) VALUES (6,2);

-- plan_members
INSERT INTO plan_members (user_id, plan_id) VALUES (1,1);
INSERT INTO plan_members (user_id, plan_id) VALUES (2,2);
INSERT INTO plan_members (user_id, plan_id) VALUES (3,3);
INSERT INTO plan_members (user_id, plan_id) VALUES (4,4);
INSERT INTO plan_members (user_id, plan_id) VALUES (5,5);

-- activity_members
INSERT INTO activity_members (user_id, activity_id) VALUES (1,1);
INSERT INTO activity_members (user_id, activity_id) VALUES (2,2);
INSERT INTO activity_members (user_id, activity_id) VALUES (3,3);
INSERT INTO activity_members (user_id, activity_id) VALUES (4,4);

-- images
INSERT INTO images (user_id, images) VALUES (1,"https://images.unsplash.com/photo-1543965860-0a2c912bc32f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1056&q=80");
INSERT INTO images (user_id, images) VALUES (2,"https://images.unsplash.com/photo-1471180625745-944903837c22?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1100&q=80");
INSERT INTO images (user_id, images) VALUES (2,"https://images.unsplash.com/photo-1566704351700-da9069468d94?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1100&q=80");
INSERT INTO images (user_id, images) VALUES (3,"https://images.unsplash.com/photo-1553856622-d1b352e9a211?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1100&q=80");
INSERT INTO images (user_id, images) VALUES (4,"https://images.unsplash.com/photo-1606318621597-c057f7d4926e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1100&q=80");