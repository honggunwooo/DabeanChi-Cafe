-- 1) users
CREATE TABLE users (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  nickname VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2) coffee
CREATE TABLE coffee (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT NOT NULL,
  name VARCHAR(255) NOT NULL,
  country VARCHAR(100) NOT NULL,
  region VARCHAR(100),
  roast_level VARCHAR(50),
  variety VARCHAR(120),
  altitude_meters INT,
  flavor_notes VARCHAR(255),
  description TEXT,
  seller_description TEXT,
  image_url VARCHAR(500),
  roastery VARCHAR(120),
  price_krw INT NOT NULL DEFAULT 0,
  weight_grams INT NOT NULL DEFAULT 200,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY fk_coffee_user (user_id),
  CONSTRAINT fk_coffee_user FOREIGN KEY (user_id)
    REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3) favorites
CREATE TABLE favorites (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  coffee_id BIGINT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uq_user_coffee (user_id, coffee_id),
  KEY idx_user (user_id),
  KEY idx_coffee (coffee_id),
  CONSTRAINT fk_fav_user FOREIGN KEY (user_id)
      REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_fav_coffee FOREIGN KEY (coffee_id)
      REFERENCES coffee(id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;