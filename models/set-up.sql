-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Jan 13, 2019 at 05:12 AM
-- Server version: 5.7.23
-- PHP Version: 7.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `pbstats_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `Examples`
--

CREATE TABLE `Examples` (
  `id` int(11) NOT NULL,
  `text` varchar(255) DEFAULT NULL,
  `description` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `firstName` varchar(30) DEFAULT NULL,
  `lastName` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`id`, `email`, `password`, `createdAt`, `updatedAt`, `firstName`, `lastName`) VALUES
(1, 'email@email.com', '$2a$10$x0KoIANYFciiztU1Rmw9l.qjhE9AolMxw6D1KwzT2JApyDirgisWW', '2019-01-09 23:54:18', '2019-01-09 23:54:18', NULL, NULL),
(7, 'email@gmail.com', '$2a$10$kQngghGwLtHTcl07ilDyaODP0kOmXxPYTNi4e2oZ.FmfQGRYpjpza', '2019-01-10 02:05:50', '2019-01-10 02:05:50', NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Examples`
--
ALTER TABLE `Examples`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Examples`
--
ALTER TABLE `Examples`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Users`
--
ALTER TABLE `Users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;
