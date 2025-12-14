CREATE TABLE users(
  userId INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255),
  password VARCHAR(255),
  type VARCHAR(50),
  active TINYINT(1)
);
DELIMITER $$

CREATE PROCEDURE addUser(
  IN pemail VARCHAR(255),
  IN ppassword VARCHAR(255),
  IN ptype VARCHAR(50),
  IN pactive TINYINT
)
BEGIN
  INSERT INTO users(email, password, type, active)
  VALUES(pemail, ppassword, ptype, pactive);
END$$

DELIMITER ;

CALL addUser(
  'arham@gmail.com',
  'arham1234',
  'arham',
  1
);
