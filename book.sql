-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1:3306
-- Thời gian đã tạo: Th12 28, 2025 lúc 12:49 PM
-- Phiên bản máy phục vụ: 8.2.0
-- Phiên bản PHP: 8.2.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `bookstore`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `authors`
--

DROP TABLE IF EXISTS `authors`;
CREATE TABLE IF NOT EXISTS `authors` (
  `author_id` char(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `bio` text,
  `birth_date` date DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`author_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `authors`
--

INSERT INTO `authors` (`author_id`, `name`, `bio`, `birth_date`, `country`) VALUES
('3135db89-dd83-11f0-958e-00155d592544', 'Nguyễn Nhật Ánh', 'Nhà văn nổi tiếng với các tác phẩm dành cho thiếu nhi', '1955-05-07', 'Việt Nam'),
('3135dd76-dd83-11f0-958e-00155d592544', 'Haruki Murakami', 'Tiểu thuyết gia Nhật Bản với phong cách siêu thực', '1949-01-12', 'Japan'),
('3135ddd5-dd83-11f0-958e-00155d592544', 'Yuval Noah Harari', 'Nhà sử học, tác giả sách về nhân loại', '1976-02-24', 'Israel'),
('3135ddfa-dd83-11f0-958e-00155d592544', 'Paulo Coelho', 'Tác giả Nhà Giả Kim', '1947-08-24', 'Brazil'),
('3135de15-dd83-11f0-958e-00155d592544', 'Dale Carnegie', 'Chuyên gia kỹ năng sống', '1888-11-24', 'USA'),
('4d0a9fbd-c687-4fb1-9fbb-948a2d8f9b73', 'Nhân VT', 'Tác giả của nhiều đầu sách khoa học viễn tưởng ...', '2002-02-16', 'Việt Nam'),
('fb2cbe23-43f1-48f2-8e1d-83a331b46888', 'Tuấn Phạm', 'He is a man who lives in District 6', '2003-02-20', 'Việt Nam');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `books`
--

DROP TABLE IF EXISTS `books`;
CREATE TABLE IF NOT EXISTS `books` (
  `book_id` char(36) NOT NULL,
  `title` varchar(255) NOT NULL,
  `isbn` varchar(20) DEFAULT NULL,
  `description` text,
  `price` decimal(10,2) NOT NULL,
  `stock_quantity` int NOT NULL DEFAULT '0',
  `publisher_id` char(36) DEFAULT NULL,
  `published_date` date DEFAULT NULL,
  `language` varchar(50) DEFAULT NULL,
  `cover_image` text,
  PRIMARY KEY (`book_id`),
  KEY `fk_books_publisher` (`publisher_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `books`
--

INSERT INTO `books` (`book_id`, `title`, `isbn`, `description`, `price`, `stock_quantity`, `publisher_id`, `published_date`, `language`, `cover_image`) VALUES
('45bafb35-dd83-11f0-958e-00155d592544', 'Mắt Biếc', '97801', 'Tuổi học trò và mối tình đầu', 78000.00, 49, '3ba984a1-dd83-11f0-958e-00155d592544', '2018-12-29', 'Tiếng Việt', 'https://res.cloudinary.com/daz0oicfs/image/upload/v1766826636/uploads/ovo0ymoqygahd0wwzbgt.jpg'),
('45bb1031-dd83-11f0-958e-00155d592544', 'Cho Tôi Xin Một Vé Đi Tuổi Thơ', '97802', 'Ký ức tuổi thơ', 65000.00, 40, '3ba984a1-dd83-11f0-958e-00155d592544', '2018-05-31', 'Tiếng Việt', 'https://res.cloudinary.com/daz0oicfs/image/upload/v1766826474/uploads/fhoxd8dq8k6m0admu8m9.jpg'),
('45bb125d-dd83-11f0-958e-00155d592544', 'Tôi Thấy Hoa Vàng Trên Cỏ Xanh', '97803', 'Tuổi thơ miền quê', 75000.00, 90, '3ba984a1-dd83-11f0-958e-00155d592544', '2015-08-14', 'Tiếng Việt', 'https://res.cloudinary.com/daz0oicfs/image/upload/v1766826532/uploads/bsyhrvnwonacc6h80wrg.jpg'),
('45bb133b-dd83-11f0-958e-00155d592544', 'Norwegian Wood', '97804', 'Tiểu thuyết lãng mạn', 120000.00, 30, '3ba986c6-dd83-11f0-958e-00155d592544', '2017-09-09', 'English', 'https://res.cloudinary.com/daz0oicfs/image/upload/v1766826596/uploads/oncfcdc8zb4cztgue6wp.jpg'),
('45bb141c-dd83-11f0-958e-00155d592544', 'Kafka On The Shore', '97805', 'Thế giới siêu thực', 135000.00, 25, '3ba986c6-dd83-11f0-958e-00155d592544', '2016-03-14', 'English', 'https://res.cloudinary.com/daz0oicfs/image/upload/v1766826724/uploads/kgfbixmjxjmqlkc2lmm8.jpg'),
('45bb14c6-dd83-11f0-958e-00155d592544', 'Biên Niên Ký Chim Vặn Dây Cót', '97806', 'Tác phẩm Murakami', 179000.00, 22, '3ba986c6-dd83-11f0-958e-00155d592544', '2018-12-11', 'Tiếng Việt', 'https://res.cloudinary.com/daz0oicfs/image/upload/v1766826859/uploads/b2jyz48cqob0k7owwzjm.jpg'),
('45bb1569-dd83-11f0-958e-00155d592544', 'Sapiens – Lược Sử Loài Người', '97807', 'Lịch sử nhân loại', 150000.00, 58, '3ba98662-dd83-11f0-958e-00155d592544', '2020-08-19', 'Tiếng Việt', 'https://res.cloudinary.com/daz0oicfs/image/upload/v1766826929/uploads/zkp9jqjiyau3mrptt9xb.webp'),
('45bb1621-dd83-11f0-958e-00155d592544', 'Homo Deus', '97808', 'Tương lai loài người', 155000.00, 53, '3ba98662-dd83-11f0-958e-00155d592544', '2021-01-09', 'Tiếng Việt', 'https://res.cloudinary.com/daz0oicfs/image/upload/v1766827127/uploads/jild16ajoqgigbtzeqj0.jpg'),
('45bb16b3-dd83-11f0-958e-00155d592544', '21 Lessons for the 21st Century', '97809', 'Bài học thế kỷ 21', 160000.00, 45, '3ba98662-dd83-11f0-958e-00155d592544', '2021-08-31', 'Tiếng Việt', 'https://res.cloudinary.com/daz0oicfs/image/upload/v1766827158/uploads/mpbmc58sytjfyvopunvx.webp'),
('45bb1826-dd83-11f0-958e-00155d592544', 'Nhà Giả Kim', '97810', 'Hành trình khám phá bản thân', 70000.00, 80, '3ba984a1-dd83-11f0-958e-00155d592544', '2015-04-30', 'Tiếng Việt', 'https://res.cloudinary.com/daz0oicfs/image/upload/v1766827209/uploads/v9zz01wbxvf1n2q7ufzo.webp'),
('45bb18bc-dd83-11f0-958e-00155d592544', 'Brida', '97811', 'Tâm linh và tình yêu', 72000.00, 34, '3ba984a1-dd83-11f0-958e-00155d592544', '2016-11-10', 'Tiếng Việt', 'https://res.cloudinary.com/daz0oicfs/image/upload/v1766827220/uploads/a1nqebcveogzozix7ii6.jpg'),
('45bb196f-dd83-11f0-958e-00155d592544', 'Đắc Nhân Tâm', '97812', 'Nghệ thuật giao tiếp', 90000.00, 100, '3ba98662-dd83-11f0-958e-00155d592544', '2013-12-31', 'Tiếng Việt', 'https://res.cloudinary.com/daz0oicfs/image/upload/v1766422166/uploads/ktfvbzatr3jd6deaqbrm.webp'),
('45bb1a0d-dd83-11f0-958e-00155d592544', 'Quẳng Gánh Lo Đi Và Vui Sống', '97813', 'Giảm căng thẳng cuộc sống', 88000.00, 70, '3ba98662-dd83-11f0-958e-00155d592544', '2014-05-31', 'Tiếng Việt', 'https://res.cloudinary.com/daz0oicfs/image/upload/v1766827311/uploads/tvsutnkpubzmrdqgfvan.webp'),
('45bb1aab-dd83-11f0-958e-00155d592544', 'Cà Phê Cùng Tony', '97814', 'Bài học cho người trẻ', 68000.00, 59, '3ba98662-dd83-11f0-958e-00155d592544', '2017-07-04', 'Tiếng Việt', 'https://res.cloudinary.com/daz0oicfs/image/upload/v1766827340/uploads/zw2cu66pjhgfs3gaaoja.webp'),
('45bb1b4b-dd83-11f0-958e-00155d592544', 'Rừng Na Uy (Bản Việt)', '97815', 'Tình yêu & mất mát', 115000.00, 28, '3ba984a1-dd83-11f0-958e-00155d592544', '2019-03-02', 'Tiếng Việt', 'https://res.cloudinary.com/dw8subctq/image/upload/v1766222113/uploads/iylcxgno5nsobow7md8h.webp'),
('981bf8ee-ae41-4456-9e6f-35ef8738d028', 'Sherlock Holmes', '85541', 'Sherlock Holmes là một nhân vật thám tử tư hư cấu, do nhà văn người Anh Arthur Conan Doyle sáng tạo nên. Tự coi mình là \"thám tử tư vấn\" trong các câu chuyện, Holmes nổi danh với khả năng quan sát, diễn dịch, khoa học pháp y điêu luyện và suy luận logic tuyệt vời, những yếu tố mà anh áp dụng khi điều tra các vụ án của nhiều dạng khách hàng, bao gồm cả Scotland Yard.', 50000.00, 11, '3ba98662-dd83-11f0-958e-00155d592544', '2023-01-13', 'Tiếng Việt', 'https://res.cloudinary.com/daz0oicfs/image/upload/v1764869264/uploads/q9ljl2zou4lyz84ucvwf.jpg');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `book_authors`
--

DROP TABLE IF EXISTS `book_authors`;
CREATE TABLE IF NOT EXISTS `book_authors` (
  `book_id` char(36) NOT NULL,
  `author_id` char(36) NOT NULL,
  PRIMARY KEY (`book_id`,`author_id`),
  KEY `fk_bookauthors_author` (`author_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `book_authors`
--

INSERT INTO `book_authors` (`book_id`, `author_id`) VALUES
('45bafb35-dd83-11f0-958e-00155d592544', '3135db89-dd83-11f0-958e-00155d592544'),
('45bb1031-dd83-11f0-958e-00155d592544', '3135db89-dd83-11f0-958e-00155d592544'),
('45bb125d-dd83-11f0-958e-00155d592544', '3135db89-dd83-11f0-958e-00155d592544'),
('45bb133b-dd83-11f0-958e-00155d592544', '3135db89-dd83-11f0-958e-00155d592544'),
('45bb1569-dd83-11f0-958e-00155d592544', '3135db89-dd83-11f0-958e-00155d592544'),
('45bb133b-dd83-11f0-958e-00155d592544', '3135dd76-dd83-11f0-958e-00155d592544'),
('45bb14c6-dd83-11f0-958e-00155d592544', '3135dd76-dd83-11f0-958e-00155d592544'),
('45bb1569-dd83-11f0-958e-00155d592544', '3135dd76-dd83-11f0-958e-00155d592544'),
('45bb133b-dd83-11f0-958e-00155d592544', '3135ddd5-dd83-11f0-958e-00155d592544'),
('45bb141c-dd83-11f0-958e-00155d592544', '3135ddd5-dd83-11f0-958e-00155d592544'),
('45bb1569-dd83-11f0-958e-00155d592544', '3135ddd5-dd83-11f0-958e-00155d592544'),
('45bb1621-dd83-11f0-958e-00155d592544', '3135ddd5-dd83-11f0-958e-00155d592544'),
('45bb16b3-dd83-11f0-958e-00155d592544', '3135ddd5-dd83-11f0-958e-00155d592544'),
('45bb133b-dd83-11f0-958e-00155d592544', '3135ddfa-dd83-11f0-958e-00155d592544'),
('45bb1569-dd83-11f0-958e-00155d592544', '3135ddfa-dd83-11f0-958e-00155d592544'),
('45bb1826-dd83-11f0-958e-00155d592544', '3135ddfa-dd83-11f0-958e-00155d592544'),
('45bb18bc-dd83-11f0-958e-00155d592544', '3135ddfa-dd83-11f0-958e-00155d592544'),
('45bb133b-dd83-11f0-958e-00155d592544', '3135de15-dd83-11f0-958e-00155d592544'),
('45bb141c-dd83-11f0-958e-00155d592544', '3135de15-dd83-11f0-958e-00155d592544'),
('45bb196f-dd83-11f0-958e-00155d592544', '3135de15-dd83-11f0-958e-00155d592544'),
('45bb1a0d-dd83-11f0-958e-00155d592544', '3135de15-dd83-11f0-958e-00155d592544'),
('45bb133b-dd83-11f0-958e-00155d592544', '4d0a9fbd-c687-4fb1-9fbb-948a2d8f9b73'),
('45bb1621-dd83-11f0-958e-00155d592544', '4d0a9fbd-c687-4fb1-9fbb-948a2d8f9b73'),
('45bb1b4b-dd83-11f0-958e-00155d592544', '4d0a9fbd-c687-4fb1-9fbb-948a2d8f9b73'),
('981bf8ee-ae41-4456-9e6f-35ef8738d028', '4d0a9fbd-c687-4fb1-9fbb-948a2d8f9b73'),
('45bb133b-dd83-11f0-958e-00155d592544', 'fb2cbe23-43f1-48f2-8e1d-83a331b46888'),
('45bb1621-dd83-11f0-958e-00155d592544', 'fb2cbe23-43f1-48f2-8e1d-83a331b46888'),
('45bb1aab-dd83-11f0-958e-00155d592544', 'fb2cbe23-43f1-48f2-8e1d-83a331b46888');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `book_categories`
--

DROP TABLE IF EXISTS `book_categories`;
CREATE TABLE IF NOT EXISTS `book_categories` (
  `book_id` char(36) NOT NULL,
  `category_id` char(36) NOT NULL,
  PRIMARY KEY (`book_id`,`category_id`),
  KEY `fk_bookcategories_category` (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `book_categories`
--

INSERT INTO `book_categories` (`book_id`, `category_id`) VALUES
('45bafb35-dd83-11f0-958e-00155d592544', '06f4894b-4587-4019-8eaf-1a9402d13d9f'),
('45bb125d-dd83-11f0-958e-00155d592544', '06f4894b-4587-4019-8eaf-1a9402d13d9f'),
('45bb133b-dd83-11f0-958e-00155d592544', '06f4894b-4587-4019-8eaf-1a9402d13d9f'),
('45bb1b4b-dd83-11f0-958e-00155d592544', '06f4894b-4587-4019-8eaf-1a9402d13d9f'),
('45bafb35-dd83-11f0-958e-00155d592544', '0cf13298-8ae7-43fa-b5b1-3305f8f90b6a'),
('45bb125d-dd83-11f0-958e-00155d592544', '0cf13298-8ae7-43fa-b5b1-3305f8f90b6a'),
('45bb141c-dd83-11f0-958e-00155d592544', '0cf13298-8ae7-43fa-b5b1-3305f8f90b6a'),
('45bb14c6-dd83-11f0-958e-00155d592544', '0cf13298-8ae7-43fa-b5b1-3305f8f90b6a'),
('45bb1826-dd83-11f0-958e-00155d592544', '0cf13298-8ae7-43fa-b5b1-3305f8f90b6a'),
('45bb18bc-dd83-11f0-958e-00155d592544', '0cf13298-8ae7-43fa-b5b1-3305f8f90b6a'),
('981bf8ee-ae41-4456-9e6f-35ef8738d028', '0cf13298-8ae7-43fa-b5b1-3305f8f90b6a'),
('981bf8ee-ae41-4456-9e6f-35ef8738d028', '85600730-1944-4e53-b637-0d1035643caa'),
('45bb1031-dd83-11f0-958e-00155d592544', '89abc602-91b7-440a-b333-587d279121bc'),
('45bb125d-dd83-11f0-958e-00155d592544', '89abc602-91b7-440a-b333-587d279121bc'),
('45bb1569-dd83-11f0-958e-00155d592544', '96dcd266-6897-4390-a42f-1a1e3952e813'),
('45bb196f-dd83-11f0-958e-00155d592544', 'b50b281b-9c29-4e7c-be57-b811853c2d83'),
('45bb1a0d-dd83-11f0-958e-00155d592544', 'b50b281b-9c29-4e7c-be57-b811853c2d83'),
('45bb1aab-dd83-11f0-958e-00155d592544', 'b50b281b-9c29-4e7c-be57-b811853c2d83'),
('45bb1621-dd83-11f0-958e-00155d592544', 'd639ce0d-43ee-46a8-8fe1-37f18bfd50d4'),
('45bb16b3-dd83-11f0-958e-00155d592544', 'd639ce0d-43ee-46a8-8fe1-37f18bfd50d4'),
('45bb1569-dd83-11f0-958e-00155d592544', 'fcfed402-51a0-4326-b493-49ec7b3f4bdf');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `categories`
--

DROP TABLE IF EXISTS `categories`;
CREATE TABLE IF NOT EXISTS `categories` (
  `category_id` char(36) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `categories`
--

INSERT INTO `categories` (`category_id`, `name`, `description`) VALUES
('01d7e8bc-a143-41e4-bbf2-babaa326fe7a', 'Geopraphic', 'Ghi lại hành trình khám phá các vùng đất xa xôi, cung cấp thông tin chi tiết về văn hóa, phong tục và cảnh quan thiên nhiên. Truyền cảm hứng xê dịch và mở rộng tầm nhìn cho độc giả.'),
('06f4894b-4587-4019-8eaf-1a9402d13d9f', 'Tiểu Thuyết Lãng Mạn', 'Tập trung vào mối quan hệ tình cảm, sự phát triển của nhân vật chính và hành trình họ vượt qua thử thách để đến với nhau. Mang lại cảm xúc ấm áp và cái kết viên mãn.'),
('0cf13298-8ae7-43fa-b5b1-3305f8f90b6a', 'Văn Học Giả Tưởng', 'Khám phá những thế giới huyền ảo, nơi phép thuật và các sinh vật kỳ bí tồn tại. Tập trung vào những cuộc phiêu lưu vĩ đại, xây dựng thế giới phức tạp, và cuộc chiến thiện ác.'),
('2e3b592b-ede6-4987-8f48-3d52e8128a19', 'Nghệ Thuật & Kiến Trúc', 'Phân tích các trường phái nghệ thuật, tiểu sử họa sĩ, và lịch sử kiến trúc. Giúp độc giả hiểu sâu hơn về tính thẩm mỹ, sự sáng tạo và tầm quan trọng của cái đẹp.'),
('5a4c15b4-1566-4673-94f9-796dff23da81', 'Tâm Lý Học', 'Khám phá cách thức hoạt động của tâm trí và hành vi con người. Giúp độc giả thấu hiểu bản thân, cải thiện các mối quan hệ xã hội và giải quyết các vấn đề tâm lý'),
('74fa9d21-457b-4ac3-a88b-cb71e9355d1b', 'Kinh Dị', 'Mang đến cảm giác sợ hãi, căng thẳng tột độ và sự bất ngờ. Thể loại này thường xoay quanh những bí ẩn đen tối, các vụ án rùng rợn, hoặc sự đe dọa siêu nhiên.'),
('85600730-1944-4e53-b637-0d1035643caa', 'Trinh Thám', 'Đặt độc giả vào một cuộc truy tìm manh mối căng thẳng, lật mở những vụ án phức tạp. Các nhân vật chính là thám tử tài ba phải đối đầu với những tên tội phạm xảo quyệt.'),
('89abc602-91b7-440a-b333-587d279121bc', 'Sách Thiếu Nhi ', 'Bộ sưu tập những câu chuyện giàu trí tưởng tượng, mang tính giáo dục và giải trí cao. Giúp trẻ em học hỏi đạo đức, phát triển ngôn ngữ, và khơi gợi niềm yêu thích đọc sách.'),
('96dcd266-6897-4390-a42f-1a1e3952e813', 'Khoa Học Viễn Tưởng ', 'Đề cập đến các chủ đề về tương lai, công nghệ đột phá, du hành thời gian và sự sống ngoài Trái Đất. Thường dùng để suy ngẫm về các vấn đề xã hội và nhân loại.'),
('9c14bf6e-b6fb-4403-a685-3106ca4a6570', 'Kinh Tế & Quản Lý', 'Cung cấp kiến thức chuyên sâu về tài chính, thị trường, chiến lược kinh doanh và kỹ năng lãnh đạo. Hỗ trợ người đọc nâng cao khả năng quản lý cá nhân và doanh nghiệp hiệu quả.'),
('b50b281b-9c29-4e7c-be57-b811853c2d83', 'Kỹ Năng Sống & Phát Triển Bản Thân', 'Cung cấp các công cụ, chiến lược và lời khuyên thiết thực để cải thiện mọi khía cạnh của cuộc sống. Giúp độc giả phát huy tiềm năng, quản lý thời gian, và đạt được mục tiêu cá nhân.'),
('c88b89ae-4e0c-406b-a476-82c27563fbd0', 'Sách Nấu Ăn & Ẩm Thực', 'Tổng hợp các công thức độc đáo, bí quyết nấu nướng từ cơ bản đến nâng cao. Khám phá văn hóa ẩm thực đa dạng của các vùng miền và quốc gia trên thế giới.'),
('d639ce0d-43ee-46a8-8fe1-37f18bfd50d4', 'Khoa Học & Công Nghệ', 'Giải thích các khái niệm khoa học phức tạp một cách dễ hiểu, từ vật lý thiên văn đến công nghệ sinh học. Cập nhật những phát minh và xu hướng công nghệ mới nhất.'),
('fcfed402-51a0-4326-b493-49ec7b3f4bdf', 'Historical ', 'Đào sâu vào các sự kiện, nhân vật và giai đoạn quan trọng trong quá khứ. Cung cấp cái nhìn sâu sắc về nguồn gốc của các thể chế, văn hóa và hệ thống chính trị hiện đại.'),
('fddab122-7b94-4b90-9773-10425580fdfa', 'Khoa Học Viễn Tưởng', 'Đề cập đến các chủ đề về tương lai, công nghệ đột phá, du hành thời gian và sự sống ngoài Trái Đất. Thường dùng để suy ngẫm về các vấn đề xã hội và nhân loại.');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `customers`
--

DROP TABLE IF EXISTS `customers`;
CREATE TABLE IF NOT EXISTS `customers` (
  `customer_id` char(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(30) DEFAULT NULL,
  `address` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`customer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `customers`
--

INSERT INTO `customers` (`customer_id`, `name`, `email`, `phone`, `address`, `created_at`) VALUES
('8aff110e-28e0-48e4-bbbe-8e6f9bb8196d', 'Vo Nguyen', 'ngoctran@gmail.com', '0969988464', '70 Nguyen Trai', '2025-12-20 08:48:33'),
('e4eff9dc-59e4-4c34-a47c-b2dbbd9d38c3', 'Vo Nhan', 'appleofcze@gmail.com', '0969988464', '70 Nguyen Trai, D1, HCMC', '2025-12-27 09:28:31');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `orders`
--

DROP TABLE IF EXISTS `orders`;
CREATE TABLE IF NOT EXISTS `orders` (
  `order_id` char(36) NOT NULL,
  `customer_id` char(36) NOT NULL,
  `order_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `status` enum('pending','paid','shipped','delivered','cancelled') DEFAULT 'pending',
  `total_amount` decimal(10,2) NOT NULL,
  `payment_method` enum('cash','credit_card','paypal','bank_transfer') DEFAULT 'cash',
  PRIMARY KEY (`order_id`),
  KEY `fk_orders_customer` (`customer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `orders`
--

INSERT INTO `orders` (`order_id`, `customer_id`, `order_date`, `status`, `total_amount`, `payment_method`) VALUES
('581c3a34-192f-45c5-9960-8fb0a856951e', 'e4eff9dc-59e4-4c34-a47c-b2dbbd9d38c3', '2025-12-27 09:28:31', 'paid', 378000.00, 'cash'),
('8e0cf0cf-c7b7-4197-bd1b-be7d29c81369', 'e4eff9dc-59e4-4c34-a47c-b2dbbd9d38c3', '2025-12-27 10:32:33', 'pending', 450000.00, 'bank_transfer');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `order_items`
--

DROP TABLE IF EXISTS `order_items`;
CREATE TABLE IF NOT EXISTS `order_items` (
  `order_item_id` char(36) NOT NULL,
  `order_id` char(36) NOT NULL,
  `book_id` char(36) NOT NULL,
  `quantity` int NOT NULL,
  `price` decimal(10,2) NOT NULL,
  PRIMARY KEY (`order_item_id`),
  KEY `fk_orderitems_order` (`order_id`),
  KEY `fk_orderitems_book` (`book_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `order_items`
--

INSERT INTO `order_items` (`order_item_id`, `order_id`, `book_id`, `quantity`, `price`) VALUES
('0076877f-2610-4b6c-90cb-808d08b309e7', '581c3a34-192f-45c5-9960-8fb0a856951e', '45bb1aab-dd83-11f0-958e-00155d592544', 1, 68000.00),
('4bb541cf-b4fd-4183-aae1-6fbbe5e66070', '8e0cf0cf-c7b7-4197-bd1b-be7d29c81369', '45bb1569-dd83-11f0-958e-00155d592544', 2, 150000.00),
('5da66bba-f8a2-4ae8-a071-26e3bfc87fa2', '581c3a34-192f-45c5-9960-8fb0a856951e', '45bb1621-dd83-11f0-958e-00155d592544', 2, 155000.00),
('9bcb2805-1ef6-4b1e-8304-189987d8f45b', '8e0cf0cf-c7b7-4197-bd1b-be7d29c81369', '45bafb35-dd83-11f0-958e-00155d592544', 1, 78000.00),
('cf961a4e-fa91-401b-81a1-d71477756e92', '8e0cf0cf-c7b7-4197-bd1b-be7d29c81369', '45bb18bc-dd83-11f0-958e-00155d592544', 1, 72000.00);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `publishers`
--

DROP TABLE IF EXISTS `publishers`;
CREATE TABLE IF NOT EXISTS `publishers` (
  `publisher_id` char(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `address` text,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`publisher_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `publishers`
--

INSERT INTO `publishers` (`publisher_id`, `name`, `address`, `email`, `phone`) VALUES
('3ba984a1-dd83-11f0-958e-00155d592544', 'NXB Trẻ', '161B Lý Chính Thắng, TP.HCM', 'info@nxbtre.vn', '02839316289'),
('3ba98662-dd83-11f0-958e-00155d592544', 'NXB Lao Động', '175 Giảng Võ, Hà Nội', 'contact@nxbld.vn', '02438439632'),
('3ba986c6-dd83-11f0-958e-00155d592544', 'NXB Thế Giới', '46 Trần Hưng Đạo, Hà Nội', 'info@nxbthegioi.vn', '02438222136'),
('67faef72-5d7d-45fb-a577-104e54f0b677', 'Nụ Cười Mới', '47 Âu Cơ', 'nucuoimoi@nucuoi.com', '0933654852'),
('7da75e2f-1829-46a1-a38b-6af98f57e92e', 'admin admin', 'admin address', 'admin@gmail.com', '1231231231'),
('ef470c63-0f6f-4a66-8720-2d4ed8a6e9cd', 'Kim Đồng', '58 Cao Lỗ', 'kimdong@kimdong.hcm.com', '0958858888');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `reviews`
--

DROP TABLE IF EXISTS `reviews`;
CREATE TABLE IF NOT EXISTS `reviews` (
  `review_id` char(36) NOT NULL,
  `book_id` char(36) NOT NULL,
  `customer_id` char(36) NOT NULL,
  `rating` int NOT NULL,
  `comment` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`review_id`),
  KEY `fk_reviews_book` (`book_id`),
  KEY `fk_reviews_customer` (`customer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `reviews`
--

INSERT INTO `reviews` (`review_id`, `book_id`, `customer_id`, `rating`, `comment`, `created_at`) VALUES
('4de8b653-3ffb-4c79-a9ab-0e602747297a', '45bb141c-dd83-11f0-958e-00155d592544', 'e4eff9dc-59e4-4c34-a47c-b2dbbd9d38c3', 5, '12312', '2025-12-28 12:18:32'),
('a5083cfe-fe04-4621-b713-d246b3337fae', '45bb133b-dd83-11f0-958e-00155d592544', 'e4eff9dc-59e4-4c34-a47c-b2dbbd9d38c3', 5, '12312', '2025-12-28 12:07:07');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id_user` char(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(30) DEFAULT NULL,
  `role` enum('user','admin') DEFAULT 'user',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_user`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`id_user`, `name`, `email`, `password`, `phone`, `role`, `created_at`) VALUES
('05fc5f63-0f93-46e6-867f-94a98744ab5a', 'USER admin', 'user@gmail.com', '$2b$10$rWAFFrcuLoYUaFHyz/EIY.VJ4xzre9t2VhBxziQx7tMYFnhTQJdna', '0123123123', 'user', '2025-11-28 15:19:51'),
('22af825e-33b4-4c9f-843c-094c36a66eaf', 'admin admin', 'admin@gmail.com', '$2b$10$gJj8MbHoOVJTW6.82g.bbeFzmQYY9W6QWyOLc4DS5JUeKUAvqT00m', '0123123123', 'admin', '2025-11-28 13:52:49'),
('8aff110e-28e0-48e4-bbbe-8e6f9bb8196d', 'Vo Nguyen', 'ngoctran@gmail.com', '$2b$10$BqW9jGV50ukfvWP0pILoXO/AJpyCM4wZU8IQKFOt8pZFqfiHwsTUi', '0969988464', 'user', '2025-12-20 08:47:50'),
('8b922fb0-e6ee-4d9b-ac0f-15568be28d5b', 'Vo Nhan', 'appleofcz@gmail.com', '$2b$10$aC9LAsZTb1fmvz0oEg77V.JfqeyoLjpXxBC.EuBV5iWPrJfXzq9WG', '0969988464', 'user', '2025-12-04 16:45:52'),
('e4eff9dc-59e4-4c34-a47c-b2dbbd9d38c3', 'Vo Nhan', 'appleofcze@gmail.com', '$2b$10$senTYMx7L./eVZWhS8pWde5t7aM5zEXV8qbSER8Pj8M5VOcToGonC', '0969988464', 'user', '2025-12-27 09:27:27');

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `books`
--
ALTER TABLE `books`
  ADD CONSTRAINT `fk_books_publisher` FOREIGN KEY (`publisher_id`) REFERENCES `publishers` (`publisher_id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `book_authors`
--
ALTER TABLE `book_authors`
  ADD CONSTRAINT `fk_bookauthors_author` FOREIGN KEY (`author_id`) REFERENCES `authors` (`author_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_bookauthors_book` FOREIGN KEY (`book_id`) REFERENCES `books` (`book_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `book_categories`
--
ALTER TABLE `book_categories`
  ADD CONSTRAINT `fk_bookcategories_book` FOREIGN KEY (`book_id`) REFERENCES `books` (`book_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_bookcategories_category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `fk_orders_customer` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `fk_orderitems_book` FOREIGN KEY (`book_id`) REFERENCES `books` (`book_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_orderitems_order` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `fk_reviews_book` FOREIGN KEY (`book_id`) REFERENCES `books` (`book_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_reviews_customer` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
