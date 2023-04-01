SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";CREATE TABLE `analytics` (
  `id` int(11) NOT NULL,
  `requests` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
INSERT INTO `analytics` (`id`, `requests`) VALUES
(1, '0');CREATE TABLE `auth` (
  `id` int(11) NOT NULL,
  `username` varchar(200) NOT NULL,
  `email` varchar(500) NOT NULL,
  `pass` varchar(500) NOT NULL,
  `credits` int(11) NOT NULL,
  `auth_key` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;CREATE TABLE `contact` (
  `id` int(11) NOT NULL,
  `name` varchar(500) NOT NULL,
  `email` varchar(500) NOT NULL,
  `subject` varchar(500) NOT NULL,
  `message` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;CREATE TABLE `requests` (
  `id` int(11) NOT NULL,
  `username` varchar(200) NOT NULL,
  `sentence` varchar(600) NOT NULL,
  `max_resp_time` varchar(100) NOT NULL,
  `ip` varchar(120) NOT NULL,
  `isLoggedIn` varchar(100) NOT NULL,
  `req_time` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
ALTER TABLE `analytics`
  ADD PRIMARY KEY (`id`);ALTER TABLE `auth`
  ADD PRIMARY KEY (`id`);ALTER TABLE `contact`
  ADD PRIMARY KEY (`id`);ALTER TABLE `requests`
  ADD PRIMARY KEY (`id`);
ALTER TABLE `analytics`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;ALTER TABLE `auth`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;ALTER TABLE `contact`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;ALTER TABLE `requests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;