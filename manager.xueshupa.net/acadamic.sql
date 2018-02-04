/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50717
Source Host           : localhost:3306
Source Database       : acadamic

Target Server Type    : MYSQL
Target Server Version : 50717
File Encoding         : 65001

Date: 2018-02-05 00:31:01
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for answer
-- ----------------------------
DROP TABLE IF EXISTS `answer`;
CREATE TABLE `answer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `exerciseDetailId` int(11) DEFAULT NULL COMMENT '练习题ID,如果为空,则为预设的答案选项',
  `answer` varchar(300) COLLATE utf8_bin NOT NULL COMMENT '正确答案',
  `orderIndex` int(11) DEFAULT NULL COMMENT '顺序',
  `lastUpdater` varchar(40) CHARACTER SET utf8 DEFAULT NULL COMMENT '最后操作者账号',
  `lastUpdateTime` datetime DEFAULT NULL COMMENT '最后操作时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=84 DEFAULT CHARSET=utf8 COLLATE=utf8_bin ROW_FORMAT=DYNAMIC COMMENT='答案选项表';

-- ----------------------------
-- Records of answer
-- ----------------------------
INSERT INTO `answer` VALUES ('45', null, 'http://acadamic-video-test.oss-cn-beijing.aliyuncs.com/answer/AyJPznndfhkBhNkJcmPEMhKiENDDNQKM.png', '1', 'acadamicparty', '2017-11-07 02:02:05');
INSERT INTO `answer` VALUES ('46', null, 'http://acadamic-video-test.oss-cn-beijing.aliyuncs.com/answer/k57ZmjY67Wjf8dDfQbyQBXYtTsiFWEdm.png', '2', 'acadamicparty', '2017-11-07 02:02:08');
INSERT INTO `answer` VALUES ('47', null, 'http://acadamic-video-test.oss-cn-beijing.aliyuncs.com/answer/srGwcj3a4B8YC6NTFRarmrC6iHCm4QGW.png', '3', 'acadamicparty', '2017-11-07 02:02:09');
INSERT INTO `answer` VALUES ('50', '30', 'http://acadamic-video-test.oss-cn-beijing.aliyuncs.com/answer/pwpCkbSK3sW7WQad5C8rZb4ZHSFzmJeC.jpeg', '4', 'acadamicparty', '2017-11-12 01:03:07');
INSERT INTO `answer` VALUES ('51', '30', 'http://acadamic-video-test.oss-cn-beijing.aliyuncs.com/answer/stWcGyYnm44hXWDDQCRaRSr4ew2NfAQ2.jpeg', '5', 'acadamicparty', '2017-11-12 01:03:07');
INSERT INTO `answer` VALUES ('52', '30', 'http://acadamic-video-test.oss-cn-beijing.aliyuncs.com/answer/8n4nbxXnaZMhGd3bih4GK8m3wX6N6wGB.jpeg', '6', 'acadamicparty', '2017-11-12 01:03:07');
INSERT INTO `answer` VALUES ('53', '30', 'http://acadamic-video-test.oss-cn-beijing.aliyuncs.com/answer/pwpCkbSK3sW7WQad5C8rZb4ZHSFzmJeC.jpeg', '7', 'acadamicparty', '2017-11-12 01:03:16');
INSERT INTO `answer` VALUES ('54', '30', 'http://acadamic-video-test.oss-cn-beijing.aliyuncs.com/answer/stWcGyYnm44hXWDDQCRaRSr4ew2NfAQ2.jpeg', '8', 'acadamicparty', '2017-11-12 01:03:16');
INSERT INTO `answer` VALUES ('55', '30', 'http://acadamic-video-test.oss-cn-beijing.aliyuncs.com/answer/8n4nbxXnaZMhGd3bih4GK8m3wX6N6wGB.jpeg', '9', 'acadamicparty', '2017-11-12 01:03:16');
INSERT INTO `answer` VALUES ('56', '30', 'http://acadamic-video-test.oss-cn-beijing.aliyuncs.com/answer/d6feazChKhkDcXAE8NdMiywzxTTXhB4d.jpg', '10', 'acadamicparty', '2017-11-12 01:03:16');
INSERT INTO `answer` VALUES ('57', '30', 'http://acadamic-video-test.oss-cn-beijing.aliyuncs.com/answer/f22zHRSapr4fMjtN3zMRWMY4hAd43erm.jpg', '11', 'acadamicparty', '2017-11-12 01:03:16');
INSERT INTO `answer` VALUES ('58', '31', 'http://acadamic-video-test.oss-cn-beijing.aliyuncs.com/answer/rh7F8ddkKDeF5t4Wjt6TprNNtCisJkhs.jpeg', '4', 'acadamicparty', '2017-11-12 01:04:42');
INSERT INTO `answer` VALUES ('59', '31', 'http://acadamic-video-test.oss-cn-beijing.aliyuncs.com/answer/mEnrGSDTSWZccGtsZy8eyyZDbxdDmmZd.jpeg', '5', 'acadamicparty', '2017-11-12 01:04:42');
INSERT INTO `answer` VALUES ('60', '31', 'http://acadamic-video-test.oss-cn-beijing.aliyuncs.com/answer/zRGfNPfSfCDpcw8TZY33xdsZwEmFSTyf.jpeg', '6', 'acadamicparty', '2017-11-12 01:04:42');
INSERT INTO `answer` VALUES ('61', '30', 'http://acadamic-video-test.oss-cn-beijing.aliyuncs.com/answer/tYGKmkJPK4KwGGZyTJR3BQWWY478KbCt.jpg', '12', 'acadamicparty', '2017-11-12 01:29:42');
INSERT INTO `answer` VALUES ('63', '30', 'http://acadamic-video-test.oss-cn-beijing.aliyuncs.com/answer/e4bNfRj4emXrHHXZAYr5YSi2Fa4tww27.jpg', '14', 'acadamicparty', '2017-11-12 01:29:48');
INSERT INTO `answer` VALUES ('67', '30', 'http://acadamic-video-test.oss-cn-beijing.aliyuncs.com/answer/GCs4NTSwpbeJZzYcABNa2Haj5Cmd6Qkj.jpg', '18', 'acadamicparty', '2017-11-12 01:33:06');
INSERT INTO `answer` VALUES ('68', '30', 'http://acadamic-video-test.oss-cn-beijing.aliyuncs.com/answer/SKXnP7kptzFxwrzJWJ87r4zZD652cWh2.jpg', '19', 'acadamicparty', '2017-11-12 01:33:07');
INSERT INTO `answer` VALUES ('69', '30', 'http://acadamic-video-test.oss-cn-beijing.aliyuncs.com/answer/scpKbdkJ3WzkPywWBmPZH4tnHTYhTyXA.jpg', '20', 'acadamicparty', '2017-11-12 01:33:11');
INSERT INTO `answer` VALUES ('70', '30', 'http://acadamic-video-test.oss-cn-beijing.aliyuncs.com/answer/6Az2yxQNB3mY3HwjzNm57eFTJSz4azTP.jpg', '21', 'acadamicparty', '2017-11-12 01:33:18');
INSERT INTO `answer` VALUES ('71', '30', 'http://acadamic-video-test.oss-cn-beijing.aliyuncs.com/answer/ycQMYfDXhfCifrH4DDBbbx3zef2MRdeN.jpg', '22', 'acadamicparty', '2017-11-12 01:33:18');
INSERT INTO `answer` VALUES ('72', '30', 'http://acadamic-video-test.oss-cn-beijing.aliyuncs.com/answer/X7Wf5mh2Gf7pHFphafHiANyfYNEQztX5.jpeg', '23', 'acadamicparty', '2017-11-12 01:33:30');
INSERT INTO `answer` VALUES ('73', '30', 'http://acadamic-video-test.oss-cn-beijing.aliyuncs.com/answer/S6tzRr6i5HyBmPN55wbwHMbrxZ46nDPr.jpeg', '24', 'acadamicparty', '2017-11-12 01:33:30');
INSERT INTO `answer` VALUES ('74', '30', 'http://acadamic-video-test.oss-cn-beijing.aliyuncs.com/answer/FA87zApAhyrsBbADmt3STKJpc3XWS26P.jpeg', '25', 'acadamicparty', '2017-11-12 01:33:30');
INSERT INTO `answer` VALUES ('75', '30', 'http://acadamic-video-test.oss-cn-beijing.aliyuncs.com/answer/aJFNH8aMCZEPihW5CmmrtWZJskRDAYYn.jpeg', '26', 'acadamicparty', '2017-11-12 01:33:39');
INSERT INTO `answer` VALUES ('76', '30', 'http://acadamic-video-test.oss-cn-beijing.aliyuncs.com/answer/NiEPZbzaJytPPrMkDbw6cXefEzKazJFZ.jpeg', '27', 'acadamicparty', '2017-11-12 01:33:39');
INSERT INTO `answer` VALUES ('77', '30', 'http://acadamic-video-test.oss-cn-beijing.aliyuncs.com/answer/MG5a5HRGrTGXJ5Z55M3yHQwfCezJRkRB.jpeg', '28', 'acadamicparty', '2017-11-12 01:33:39');
INSERT INTO `answer` VALUES ('78', '30', 'http://acadamic-video-test.oss-cn-beijing.aliyuncs.com/answer/2RYjDSQR4MJrf8BdbTcGZfQmdKkhkMz7.jpeg', '29', 'acadamicparty', '2017-11-12 01:33:39');
INSERT INTO `answer` VALUES ('79', '30', 'http://acadamic-video-test.oss-cn-beijing.aliyuncs.com/answer/EHhnDP7EjCX5rEhif3b3cPFbEnTzxYsD.jpeg', '30', 'acadamicparty', '2017-11-12 01:33:49');
INSERT INTO `answer` VALUES ('80', '30', 'http://acadamic-video-test.oss-cn-beijing.aliyuncs.com/answer/jdrS4nrazZGAbE3hWpdbZcwZisnrtCfT.jpeg', '31', 'acadamicparty', '2017-11-12 01:33:49');
INSERT INTO `answer` VALUES ('81', '30', 'http://acadamic-video-test.oss-cn-beijing.aliyuncs.com/answer/z55QR26SjBayHh3Zikz4yJ85bQ6SYxzd.jpeg', '32', 'acadamicparty', '2017-11-12 01:33:49');
INSERT INTO `answer` VALUES ('82', '30', 'http://acadamic-video-test.oss-cn-beijing.aliyuncs.com/answer/FPCypn7KMW84PZrAiPNKP4hmpSj8a63i.jpeg', '33', 'acadamicparty', '2017-11-12 01:33:49');
INSERT INTO `answer` VALUES ('83', '30', 'http://acadamic-video-test.oss-cn-beijing.aliyuncs.com/answer/HQ3hDX3GbTtJGyyDkXjHxQmEhJ6EATKZ.jpeg', '34', 'acadamicparty', '2017-11-12 01:33:49');

-- ----------------------------
-- Table structure for answer_copy
-- ----------------------------
DROP TABLE IF EXISTS `answer_copy`;
CREATE TABLE `answer_copy` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `exerciseDetailId` int(11) DEFAULT NULL COMMENT '练习题ID,如果为空,则为预设的答案选项',
  `answer` varchar(300) COLLATE utf8_bin NOT NULL COMMENT '正确答案',
  `orderIndex` int(11) DEFAULT NULL COMMENT '顺序',
  `lastUpdater` varchar(40) CHARACTER SET utf8 DEFAULT NULL COMMENT '最后操作者账号',
  `lastUpdateTime` datetime DEFAULT NULL COMMENT '最后操作时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=85 DEFAULT CHARSET=utf8 COLLATE=utf8_bin ROW_FORMAT=DYNAMIC COMMENT='答案选项表';

-- ----------------------------
-- Records of answer_copy
-- ----------------------------
INSERT INTO `answer_copy` VALUES ('45', null, 'http://acadamic-video-test.oss-cn-beijing.aliyuncs.com/answer/AyJPznndfhkBhNkJcmPEMhKiENDDNQKM.png', '1', 'acadamicparty', '2017-11-07 02:02:05');
INSERT INTO `answer_copy` VALUES ('46', null, 'http://acadamic-video-test.oss-cn-beijing.aliyuncs.com/answer/k57ZmjY67Wjf8dDfQbyQBXYtTsiFWEdm.png', '2', 'acadamicparty', '2017-11-07 02:02:08');
INSERT INTO `answer_copy` VALUES ('47', null, 'http://acadamic-video-test.oss-cn-beijing.aliyuncs.com/answer/srGwcj3a4B8YC6NTFRarmrC6iHCm4QGW.png', '3', 'acadamicparty', '2017-11-07 02:02:09');
INSERT INTO `answer_copy` VALUES ('62', '30', 'http://acadamic-video-test.oss-cn-beijing.aliyuncs.com/answer/tYGKmkJPK4KwGGZyTJR3BQWWY478KbCt.jpg', '13', 'acadamicparty', '2017-11-12 01:37:13');
INSERT INTO `answer_copy` VALUES ('64', '30', 'http://acadamic-video-test.oss-cn-beijing.aliyuncs.com/answer/F4DdazBsRXHFYfcNjzz4AFQWpwj2ieif.jpg', '15', 'acadamicparty', '2017-11-12 01:37:10');
INSERT INTO `answer_copy` VALUES ('65', '30', 'http://acadamic-video-test.oss-cn-beijing.aliyuncs.com/answer/F4DdazBsRXHFYfcNjzz4AFQWpwj2ieif.jpg', '16', 'acadamicparty', '2017-11-12 01:37:11');
INSERT INTO `answer_copy` VALUES ('66', '30', 'http://acadamic-video-test.oss-cn-beijing.aliyuncs.com/answer/HTseCZrtTc6y38JTcChKSXhpFXEzJZp7.jpg', '17', 'acadamicparty', '2017-11-12 01:37:12');
INSERT INTO `answer_copy` VALUES ('84', '30', 'http://acadamic-video-test.oss-cn-beijing.aliyuncs.com/answer/P6kSDwNjzQN3y44YGs3NKMsNrwnZ3bN6.jpeg', '35', 'acadamicparty', '2017-11-12 01:37:08');

-- ----------------------------
-- Table structure for chapter
-- ----------------------------
DROP TABLE IF EXISTS `chapter`;
CREATE TABLE `chapter` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `courseId` int(11) NOT NULL COMMENT '课程ID',
  `code` varchar(20) NOT NULL COMMENT '编号规则：6位课程编号+3位章节编号+3位知识点编号+2位难度级别编号+2位习题编号',
  `name` varchar(40) NOT NULL COMMENT '章节名称',
  `info` varchar(200) NOT NULL COMMENT '章节介绍',
  `orderIndex` int(11) NOT NULL DEFAULT '0' COMMENT '顺序',
  `originPrice` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '原价',
  `price` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '销售价格',
  `buyCount` int(11) NOT NULL DEFAULT '0' COMMENT '购买次数',
  `lastUpdater` varchar(40) DEFAULT NULL COMMENT '最后操作者账号',
  `lastUpdateTime` datetime DEFAULT NULL COMMENT '最后操作时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of chapter
-- ----------------------------
INSERT INTO `chapter` VALUES ('1', '0', '000004001', '663', '66dd', '1', '0.00', '663.00', '0', 'acadamicparty', '2017-11-12 13:43:51');
INSERT INTO `chapter` VALUES ('2', '0', '00002', '663', '66dd', '2', '0.00', '663.00', '0', 'acadamicparty', '2017-11-12 13:43:51');
INSERT INTO `chapter` VALUES ('3', '0', '00003', '663', '66dd', '3', '0.00', '663.00', '0', 'acadamicparty', '2017-11-12 13:43:51');
INSERT INTO `chapter` VALUES ('8', '1', '000012001', 'Limits', '', '1', '0.00', '0.01', '0', 'acadamicparty', '2017-11-13 02:27:33');
INSERT INTO `chapter` VALUES ('9', '14', '000014001', '1.Limit', 'Limit', '1', '0.00', '0.01', '0', 'acadamicparty', '2017-12-20 14:52:48');
INSERT INTO `chapter` VALUES ('10', '1', '00004', '11', '', '4', '0.00', '11.00', '0', 'acadamicparty', '2017-12-20 15:41:46');
INSERT INTO `chapter` VALUES ('11', '15', '000015001', '测试章节1', '测试章节1', '1', '0.00', '0.00', '0', 'acadamicparty', '2017-12-30 19:03:04');
INSERT INTO `chapter` VALUES ('12', '14', '000014002', '2.Important Limits', '2.Important Limits', '2', '0.00', '0.01', '0', null, null);
INSERT INTO `chapter` VALUES ('13', '14', '000014003', '3.Continuity', '3.Continuity', '3', '0.00', '0.01', '0', null, null);
INSERT INTO `chapter` VALUES ('14', '14', '000014004', '4.Introduction to Derivative', '4.Introduction to Derivative', '4', '0.00', '0.01', '0', null, null);

-- ----------------------------
-- Table structure for chapter_copy
-- ----------------------------
DROP TABLE IF EXISTS `chapter_copy`;
CREATE TABLE `chapter_copy` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(20) NOT NULL COMMENT '编号规则：6位课程编号+3位章节编号+3位知识点编号+2位难度级别编号+2位习题编号',
  `name` varchar(40) NOT NULL COMMENT '章节名称',
  `info` varchar(200) NOT NULL COMMENT '章节介绍',
  `orderIndex` int(11) NOT NULL DEFAULT '0' COMMENT '顺序',
  `originPrice` decimal(10,0) NOT NULL DEFAULT '0' COMMENT '原价',
  `price` decimal(10,0) NOT NULL DEFAULT '0' COMMENT '销售价格',
  `buyCount` int(11) NOT NULL DEFAULT '0' COMMENT '购买次数',
  `lastUpdater` varchar(40) DEFAULT NULL COMMENT '最后操作者账号',
  `lastUpdateTime` datetime DEFAULT NULL COMMENT '最后操作时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of chapter_copy
-- ----------------------------
INSERT INTO `chapter_copy` VALUES ('1', '000004001', '663', '66dd', '1', '0', '663', '0', 'acadamicparty', '2017-11-12 13:43:51');
INSERT INTO `chapter_copy` VALUES ('2', '00002', '663', '66dd', '2', '0', '663', '0', 'acadamicparty', '2017-11-12 13:43:51');
INSERT INTO `chapter_copy` VALUES ('3', '00003', '663', '66dd', '3', '0', '663', '0', 'acadamicparty', '2017-11-12 13:43:51');
INSERT INTO `chapter_copy` VALUES ('7', '000012001', '11', '', '1', '0', '0', '0', 'acadamicparty', '2017-11-13 02:04:51');

-- ----------------------------
-- Table structure for course
-- ----------------------------
DROP TABLE IF EXISTS `course`;
CREATE TABLE `course` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `code` varchar(20) DEFAULT NULL COMMENT '编号规则：6位课程编号+3位章节编号+3位知识点编号+2位难度级别编号+2位习题编号',
  `name` varchar(40) NOT NULL COMMENT '课程名称',
  `originPrice` decimal(10,0) NOT NULL DEFAULT '0' COMMENT '原价',
  `price` decimal(10,0) NOT NULL DEFAULT '0' COMMENT '销售价格',
  `chapterCount` int(11) NOT NULL DEFAULT '0' COMMENT '章节数量',
  `buyCount` int(11) NOT NULL DEFAULT '0' COMMENT '购买次数',
  `state` int(2) NOT NULL DEFAULT '0' COMMENT '状态：0未上线，1已上线',
  `lastUpdater` varchar(40) DEFAULT NULL COMMENT '最后操作者账号',
  `lastUpdateTime` datetime DEFAULT NULL COMMENT '最后操作时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of course
-- ----------------------------
INSERT INTO `course` VALUES ('1', '1', '00', '测试', '100', '100', '2', '2', '0', 'ttt', '2017-07-26 19:13:35');
INSERT INTO `course` VALUES ('14', '14', '000014', 'Calculus BC', '1', '1', '1', '1', '0', 'acadamicparty', '2017-12-20 14:51:11');
INSERT INTO `course` VALUES ('15', '14', '000015', '新课程测试', '0', '0', '1', '0', '0', 'acadamicparty', '2017-12-30 19:02:45');

-- ----------------------------
-- Table structure for course_copy
-- ----------------------------
DROP TABLE IF EXISTS `course_copy`;
CREATE TABLE `course_copy` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `code` varchar(20) DEFAULT NULL COMMENT '编号规则：6位课程编号+3位章节编号+3位知识点编号+2位难度级别编号+2位习题编号',
  `name` varchar(40) NOT NULL COMMENT '课程名称',
  `originPrice` decimal(10,0) NOT NULL DEFAULT '0' COMMENT '原价',
  `price` decimal(10,0) NOT NULL DEFAULT '0' COMMENT '销售价格',
  `buyCount` int(11) NOT NULL DEFAULT '0' COMMENT '购买次数',
  `state` int(2) NOT NULL DEFAULT '0' COMMENT '状态：0未上线，1已上线',
  `lastUpdater` varchar(40) DEFAULT NULL COMMENT '最后操作者账号',
  `lastUpdateTime` datetime DEFAULT NULL COMMENT '最后操作时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of course_copy
-- ----------------------------
INSERT INTO `course_copy` VALUES ('1', '1', '00', '测试', '0', '100', '0', '0', 'ttt', '2017-07-26 19:13:35');
INSERT INTO `course_copy` VALUES ('3', '1', '000004', '测试', '0', '100', '0', '0', 'ttt', '2017-07-26 19:15:57');
INSERT INTO `course_copy` VALUES ('4', '1', '000005', '测试', '0', '100', '0', '0', 'ttt', '2017-07-26 20:27:24');
INSERT INTO `course_copy` VALUES ('5', '1', '000006', '测试', '0', '10012', '0', '0', 'acadamicparty', '2017-11-12 16:14:26');
INSERT INTO `course_copy` VALUES ('12', '14', '000012', 'AP-微积分', '0', '1680', '0', '0', 'acadamicparty', '2017-11-13 01:19:49');
INSERT INTO `course_copy` VALUES ('13', '14', '000013', '11', '0', '0', '0', '0', 'acadamicparty', '2017-11-13 02:02:33');

-- ----------------------------
-- Table structure for difflevel
-- ----------------------------
DROP TABLE IF EXISTS `difflevel`;
CREATE TABLE `difflevel` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(20) NOT NULL COMMENT '编号规则：6位课程编号+3位章节编号+3位知识点编号+2位难度级别编号+2位习题编号',
  `sequence` varchar(40) NOT NULL COMMENT '难度级别中文序号',
  `orderIndex` int(11) NOT NULL DEFAULT '0',
  `answerInfo` varchar(300) DEFAULT NULL COMMENT '答疑材料，视频Url或者图片Url',
  `answerType` int(11) DEFAULT NULL COMMENT '答疑内容类型，0：图片类型，1：短视频类型',
  `lastUpdater` varchar(40) DEFAULT NULL COMMENT '最后操作者账号',
  `lastUpdateTime` datetime DEFAULT NULL COMMENT '最后操作时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='难度级别';

-- ----------------------------
-- Records of difflevel
-- ----------------------------
INSERT INTO `difflevel` VALUES ('1', '00000400100101', '难度一', '1', null, null, 'admin', '2017-08-01 01:17:15');
INSERT INTO `difflevel` VALUES ('2', '00000400100102', '难度二', '2', null, null, 'admin', '2017-08-01 18:48:37');

-- ----------------------------
-- Table structure for exercise
-- ----------------------------
DROP TABLE IF EXISTS `exercise`;
CREATE TABLE `exercise` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `knowledgeInfoId` int(11) NOT NULL,
  `exerciseUrl` varchar(300) COLLATE utf8_bin DEFAULT NULL COMMENT '练习题题目上传的图片url',
  `orderIndex` int(11) NOT NULL DEFAULT '0',
  `lastUpdater` varchar(40) CHARACTER SET utf8 DEFAULT NULL COMMENT '最后操作者账号',
  `lastUpdateTime` datetime DEFAULT NULL COMMENT '最后操作时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=87 DEFAULT CHARSET=utf8 COLLATE=utf8_bin ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of exercise
-- ----------------------------
INSERT INTO `exercise` VALUES ('69', '1', null, '1', 'acadamicparty', '2017-11-09 23:45:37');
INSERT INTO `exercise` VALUES ('70', '1', null, '2', 'acadamicparty', '2017-11-10 01:28:53');
INSERT INTO `exercise` VALUES ('71', '1', 'http://acadamic-video-test.oss-cn-beijing.aliyuncs.com/exercise/yhiBh5CRcyY4eP356zYBGttBc2Dwz6f3.jpeg', '3', 'acadamicparty', '2017-11-10 01:35:11');
INSERT INTO `exercise` VALUES ('82', '93', null, '1', 'acadamicparty', '2017-11-10 18:30:37');
INSERT INTO `exercise` VALUES ('83', '93', null, '2', 'acadamicparty', '2017-11-10 18:30:38');
INSERT INTO `exercise` VALUES ('85', '120', 'http://acadamic-video-test.oss-cn-beijing.aliyuncs.com/exercise/zzStf5wW64JNk6DWMrrr4JGwwmMjHpWh.jpg', '1', 'acadamicparty', '2017-11-12 13:16:32');
INSERT INTO `exercise` VALUES ('86', '124', 'http://acadamic-video-test.oss-cn-beijing.aliyuncs.com/exercise/Dhj2yjyTDzC4ZrAtGbRyFyDX2cyhak7x.jpg', '1', 'acadamicparty', '2017-11-12 13:21:05');

-- ----------------------------
-- Table structure for exercisedetail
-- ----------------------------
DROP TABLE IF EXISTS `exercisedetail`;
CREATE TABLE `exercisedetail` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `exerciseId` int(11) NOT NULL,
  `type` varchar(20) COLLATE utf8_bin NOT NULL DEFAULT 'NUMBER' COMMENT '明细题类型',
  `answer` varchar(50) COLLATE utf8_bin DEFAULT NULL COMMENT '正确答案',
  `orderIndex` int(11) DEFAULT '0',
  `lastUpdater` varchar(40) CHARACTER SET utf8 DEFAULT NULL COMMENT '最后操作者账号',
  `lastUpdateTime` datetime DEFAULT NULL COMMENT '最后操作时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8 COLLATE=utf8_bin ROW_FORMAT=DYNAMIC COMMENT='练习填空处';

-- ----------------------------
-- Records of exercisedetail
-- ----------------------------
INSERT INTO `exercisedetail` VALUES ('21', '70', 'NUMBER', null, '1', 'acadamicparty', '2017-11-10 01:28:58');
INSERT INTO `exercisedetail` VALUES ('22', '71', 'NUMBER', '4', '1', 'acadamicparty', '2017-11-10 01:35:13');
INSERT INTO `exercisedetail` VALUES ('28', '82', 'TEXT', 'uu', '1', 'acadamicparty', '2017-11-10 19:50:51');
INSERT INTO `exercisedetail` VALUES ('29', '82', 'TEXT', 'hh', '2', 'acadamicparty', '2017-11-10 19:50:51');
INSERT INTO `exercisedetail` VALUES ('32', '85', 'NUMBER', '55', '3', 'acadamicparty', '2017-11-12 12:10:27');
INSERT INTO `exercisedetail` VALUES ('33', '85', 'TEXT', 'aa', '4', 'acadamicparty', '2017-11-12 12:10:32');
INSERT INTO `exercisedetail` VALUES ('34', '85', 'NUMBER', null, '5', 'acadamicparty', '2017-11-12 13:16:24');
INSERT INTO `exercisedetail` VALUES ('35', '85', 'NUMBER', null, '6', 'acadamicparty', '2017-11-12 13:16:26');
INSERT INTO `exercisedetail` VALUES ('36', '86', 'TEXT', 'v', '1', 'acadamicparty', '2017-11-12 13:21:02');
INSERT INTO `exercisedetail` VALUES ('37', '86', 'NUMBER', '5', '2', 'acadamicparty', '2017-11-12 13:21:04');
INSERT INTO `exercisedetail` VALUES ('38', '86', 'SELECTOR', '47', '3', 'acadamicparty', '2017-11-12 13:21:14');

-- ----------------------------
-- Table structure for exercisedetail_copy
-- ----------------------------
DROP TABLE IF EXISTS `exercisedetail_copy`;
CREATE TABLE `exercisedetail_copy` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `exerciseId` int(11) NOT NULL,
  `type` varchar(20) COLLATE utf8_bin NOT NULL DEFAULT 'NUMBER' COMMENT '明细题类型',
  `answer` varchar(50) COLLATE utf8_bin DEFAULT NULL COMMENT '正确答案',
  `orderIndex` int(11) DEFAULT '0',
  `lastUpdater` varchar(40) CHARACTER SET utf8 DEFAULT NULL COMMENT '最后操作者账号',
  `lastUpdateTime` datetime DEFAULT NULL COMMENT '最后操作时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8 COLLATE=utf8_bin ROW_FORMAT=DYNAMIC COMMENT='练习填空处';

-- ----------------------------
-- Records of exercisedetail_copy
-- ----------------------------
INSERT INTO `exercisedetail_copy` VALUES ('25', '72', 'NUMBER', null, '1', 'acadamicparty', '2017-11-10 02:38:38');
INSERT INTO `exercisedetail_copy` VALUES ('26', '78', 'NUMBER', null, '1', 'acadamicparty', '2017-11-10 02:38:49');
INSERT INTO `exercisedetail_copy` VALUES ('27', '78', 'NUMBER', null, '2', 'acadamicparty', '2017-11-10 02:38:49');
INSERT INTO `exercisedetail_copy` VALUES ('30', '85', 'SELECTOR', '46', '1', 'acadamicparty', '2017-11-12 13:17:08');
INSERT INTO `exercisedetail_copy` VALUES ('31', '85', 'SELECTOR', '60', '2', 'acadamicparty', '2017-11-12 13:17:09');

-- ----------------------------
-- Table structure for exercise_copy
-- ----------------------------
DROP TABLE IF EXISTS `exercise_copy`;
CREATE TABLE `exercise_copy` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `knowledgeInfoId` int(11) NOT NULL,
  `exerciseUrl` varchar(300) COLLATE utf8_bin DEFAULT NULL COMMENT '练习题题目上传的图片url',
  `orderIndex` int(11) NOT NULL DEFAULT '0',
  `lastUpdater` varchar(40) CHARACTER SET utf8 DEFAULT NULL COMMENT '最后操作者账号',
  `lastUpdateTime` datetime DEFAULT NULL COMMENT '最后操作时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=85 DEFAULT CHARSET=utf8 COLLATE=utf8_bin ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of exercise_copy
-- ----------------------------
INSERT INTO `exercise_copy` VALUES ('72', '93', 'http://acadamic-video-test.oss-cn-beijing.aliyuncs.com/exercise/fkXmMEyxsf4RQKiAKfdSki7Kb7Wcn7tB.jpeg', '1', 'acadamicparty', '2017-11-10 02:38:38');
INSERT INTO `exercise_copy` VALUES ('73', '93', null, '2', 'acadamicparty', '2017-11-10 02:38:32');
INSERT INTO `exercise_copy` VALUES ('74', '93', null, '3', 'acadamicparty', '2017-11-10 02:38:33');
INSERT INTO `exercise_copy` VALUES ('75', '93', 'http://acadamic-video-test.oss-cn-beijing.aliyuncs.com/exercise/3izAf7GBbaF3b6sHcWAiHCMrTRjMeDBw.jpeg', '4', 'acadamicparty', '2017-11-10 02:38:35');
INSERT INTO `exercise_copy` VALUES ('76', '93', null, '5', 'acadamicparty', '2017-11-10 02:38:36');
INSERT INTO `exercise_copy` VALUES ('77', '93', null, '6', 'acadamicparty', '2017-11-10 02:38:37');
INSERT INTO `exercise_copy` VALUES ('78', '93', 'http://acadamic-video-test.oss-cn-beijing.aliyuncs.com/exercise/KtszXCMNRADXaMBxHtwH8ZMFryYheJCx.jpeg', '1', 'acadamicparty', '2017-11-10 02:38:49');
INSERT INTO `exercise_copy` VALUES ('79', '93', null, '1', 'acadamicparty', '2017-11-10 18:30:33');
INSERT INTO `exercise_copy` VALUES ('80', '93', null, '2', 'acadamicparty', '2017-11-10 18:30:33');
INSERT INTO `exercise_copy` VALUES ('81', '93', null, '3', 'acadamicparty', '2017-11-10 18:30:33');
INSERT INTO `exercise_copy` VALUES ('84', '93', null, '3', 'acadamicparty', '2017-11-10 19:35:13');

-- ----------------------------
-- Table structure for knowledge
-- ----------------------------
DROP TABLE IF EXISTS `knowledge`;
CREATE TABLE `knowledge` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(20) NOT NULL COMMENT '编号规则：6位课程编号+3位章节编号+3位知识点编号+2位难度级别编号+2位习题编号',
  `name` varchar(100) NOT NULL COMMENT '知识点标题',
  `orderIndex` int(11) NOT NULL DEFAULT '0' COMMENT '顺序',
  `lastUpdater` varchar(40) DEFAULT NULL COMMENT '最后操作者账号',
  `lastUpdateTime` datetime DEFAULT NULL COMMENT '最后操作时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of knowledge
-- ----------------------------
INSERT INTO `knowledge` VALUES ('1', '000004001001', '1111', '1', 'acadamicparty', '2017-11-12 13:33:01');
INSERT INTO `knowledge` VALUES ('9', '000012001001', '1.1 Limit of Rational Functions', '1', 'acadamicparty', '2017-11-13 02:28:34');
INSERT INTO `knowledge` VALUES ('10', '000004001002', '002', '2', 'acadamicparty', '2017-12-07 14:44:37');
INSERT INTO `knowledge` VALUES ('11', '000014001001', '1.1 Limit at a Point', '1', 'acadamicparty', '2017-12-20 15:01:27');
INSERT INTO `knowledge` VALUES ('12', '000014001002', '1.2 Calculating Limits Algebraically: First Approach', '2', 'acadamicparty', '2017-12-24 16:05:31');
INSERT INTO `knowledge` VALUES ('13', '000015001001', '1.2 Calculating Limits Algebraically: First Approach', '1', 'acadamicparty', '2017-12-30 19:11:23');
INSERT INTO `knowledge` VALUES ('14', '000014002001', '2.1 The Squeeze Theorem', '1', null, null);
INSERT INTO `knowledge` VALUES ('15', '000014002002', '2.2 Assignment of Chapter2', '2', null, null);

-- ----------------------------
-- Table structure for knowledgeinfo
-- ----------------------------
DROP TABLE IF EXISTS `knowledgeinfo`;
CREATE TABLE `knowledgeinfo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `knowledgeId` int(11) NOT NULL,
  `type` varchar(20) COLLATE utf8_bin NOT NULL COMMENT '知识点内容类型',
  `orderIndex` int(11) NOT NULL DEFAULT '0' COMMENT '顺序',
  `lastUpdater` varchar(40) CHARACTER SET utf8 DEFAULT NULL COMMENT '最后操作者账号',
  `lastUpdateTime` datetime DEFAULT NULL COMMENT '最后操作时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=130 DEFAULT CHARSET=utf8 COLLATE=utf8_bin ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of knowledgeinfo
-- ----------------------------
INSERT INTO `knowledgeinfo` VALUES ('92', '1', 'DISCOVER', '1', 'acadamicparty', '2017-11-09 23:33:41');
INSERT INTO `knowledgeinfo` VALUES ('93', '1', 'GAME', '2', 'acadamicparty', '2017-11-09 23:45:31');
INSERT INTO `knowledgeinfo` VALUES ('94', '1', 'DISCOVER', '3', 'acadamicparty', '2017-11-09 23:55:07');
INSERT INTO `knowledgeinfo` VALUES ('95', '1', 'DISCOVER', '4', 'acadamicparty', '2017-11-09 23:55:53');
INSERT INTO `knowledgeinfo` VALUES ('96', '1', 'DISCOVER', '5', 'acadamicparty', '2017-11-09 23:57:45');
INSERT INTO `knowledgeinfo` VALUES ('97', '1', 'DISCOVER', '6', 'acadamicparty', '2017-11-09 23:57:46');
INSERT INTO `knowledgeinfo` VALUES ('98', '1', 'DISCOVER', '7', 'acadamicparty', '2017-11-09 23:57:47');
INSERT INTO `knowledgeinfo` VALUES ('99', '1', 'EXPLORE', '8', 'acadamicparty', '2017-11-10 00:50:11');
INSERT INTO `knowledgeinfo` VALUES ('100', '1', 'EXPLORE', '9', 'acadamicparty', '2017-11-11 12:27:42');
INSERT INTO `knowledgeinfo` VALUES ('101', '1', 'EXPLORE', '10', 'acadamicparty', '2017-11-11 12:27:47');
INSERT INTO `knowledgeinfo` VALUES ('102', '1', 'SUMMARY', '11', 'acadamicparty', '2017-11-11 12:27:48');
INSERT INTO `knowledgeinfo` VALUES ('109', '2', 'EXPLORE', '5', 'acadamicparty', '2017-11-11 20:56:54');
INSERT INTO `knowledgeinfo` VALUES ('117', '2', 'STEP', '13', 'acadamicparty', '2017-11-11 21:01:12');
INSERT INTO `knowledgeinfo` VALUES ('118', '2', 'EXPLORE', '14', 'acadamicparty', '2017-11-11 21:02:01');
INSERT INTO `knowledgeinfo` VALUES ('119', '2', 'DISCOVER', '15', 'acadamicparty', '2017-11-11 21:02:02');
INSERT INTO `knowledgeinfo` VALUES ('120', '2', 'GAME', '16', 'acadamicparty', '2017-11-11 21:02:03');
INSERT INTO `knowledgeinfo` VALUES ('124', '2', 'EXERCISE', '19', 'acadamicparty', '2017-11-12 13:20:28');
INSERT INTO `knowledgeinfo` VALUES ('125', '9', 'DISCOVER', '1', 'acadamicparty', '2017-11-13 02:28:41');
INSERT INTO `knowledgeinfo` VALUES ('126', '1', 'DISCOVER', '12', 'acadamicparty', '2017-12-07 14:44:06');
INSERT INTO `knowledgeinfo` VALUES ('127', '10', 'DISCOVER', '1', 'acadamicparty', '2017-12-07 14:45:16');
INSERT INTO `knowledgeinfo` VALUES ('129', '11', 'EXPLORE', '1', 'acadamicparty', '2017-12-20 15:32:07');

-- ----------------------------
-- Table structure for knowledgeinfodetail
-- ----------------------------
DROP TABLE IF EXISTS `knowledgeinfodetail`;
CREATE TABLE `knowledgeinfodetail` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `knowledgeInfoId` int(11) NOT NULL,
  `knowledgeInfoDetailType` varchar(20) COLLATE utf8_bin NOT NULL COMMENT '知识点内容明细类型',
  `info` varchar(1000) COLLATE utf8_bin DEFAULT NULL,
  `orderIndex` int(11) NOT NULL DEFAULT '0' COMMENT '顺序',
  `lastUpdater` varchar(40) CHARACTER SET utf8 DEFAULT NULL COMMENT '最后操作者账号',
  `lastUpdateTime` datetime DEFAULT NULL COMMENT '最后操作时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8 COLLATE=utf8_bin ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of knowledgeinfodetail
-- ----------------------------
INSERT INTO `knowledgeinfodetail` VALUES ('7', '99', 'video', 'http://acadamic-video-test.oss-cn-beijing.aliyuncs.com/knowledge-detail-video/PKTdk25ZYztPawhC3TDe3mA6wyTAfjyb.mp4', '1', 'acadamicparty', '2017-11-10 00:50:30');
INSERT INTO `knowledgeinfodetail` VALUES ('8', '98', 'video', 'http://acadamic-video-test.oss-cn-beijing.aliyuncs.com/knowledge-detail-video/mmQjTpc4j4jYXcDWiET6EChcwbWGmEz7.mp4', '1', 'acadamicparty', '2017-11-10 01:09:11');
INSERT INTO `knowledgeinfodetail` VALUES ('15', '92', 'pic', 'http://acadamic-video-test.oss-cn-beijing.aliyuncs.com/knowledge-detail-video/zRwTHD8RmYGRxD4af7CkPEjXCif46anm.jpg', '1', 'acadamicparty', '2017-11-11 18:18:50');
INSERT INTO `knowledgeinfodetail` VALUES ('16', '92', 'pic', 'http://acadamic-video-test.oss-cn-beijing.aliyuncs.com/knowledge-detail-video/Kw2kd8jWQ6PGAEWDQcxJydYAZHBfd7NK.jpg', '2', 'acadamicparty', '2017-11-11 18:19:05');
INSERT INTO `knowledgeinfodetail` VALUES ('17', '94', 'video', 'http://acadamic-video-test.oss-cn-beijing.aliyuncs.com/knowledge-detail-video/rhb62dfFHwkSAfbzJRYhnfY7sKbXhnQP.mp4', '1', 'acadamicparty', '2017-11-11 19:55:37');
INSERT INTO `knowledgeinfodetail` VALUES ('18', '94', 'video', 'http://acadamic-video-test.oss-cn-beijing.aliyuncs.com/knowledge-detail-video/7DCChs7esbrkMH4MCZdTiK8Hp2PHQXZb.mp4', '2', 'acadamicparty', '2017-11-11 19:55:49');
INSERT INTO `knowledgeinfodetail` VALUES ('19', '95', 'text', '地方都是福建师范', '1', 'acadamicparty', '2017-11-11 20:28:57');
INSERT INTO `knowledgeinfodetail` VALUES ('21', '95', 'text', '123', '3', 'acadamicparty', '2017-11-11 20:28:46');
INSERT INTO `knowledgeinfodetail` VALUES ('22', '103', 'video', 'http://acadamic-video-test.oss-cn-beijing.aliyuncs.com/knowledge-detail-video/J8B7A4JCyY37SyMWwsEZ5cMe4NEDQYnp.mp4', '1', 'acadamicparty', '2017-11-11 20:33:50');
INSERT INTO `knowledgeinfodetail` VALUES ('23', '103', 'pic', 'http://acadamic-video-test.oss-cn-beijing.aliyuncs.com/knowledge-detail-video/RHn7f77PAHyhpmwFizQBCXffhibFC24S.jpg', '2', 'acadamicparty', '2017-11-11 20:33:59');
INSERT INTO `knowledgeinfodetail` VALUES ('24', '103', 'text', '测试测试放弃国外优厚待遇测试测试放弃国外优厚待遇测试测试放弃国外优厚待遇测试测试放弃国外优厚待遇测试测试放弃国外优厚待遇测试测试放弃国外优厚待遇', '3', 'acadamicparty', '2017-11-11 20:34:16');
INSERT INTO `knowledgeinfodetail` VALUES ('25', '104', 'pic', 'http://acadamic-video-test.oss-cn-beijing.aliyuncs.com/knowledge-detail-video/GpPXPhPNbmPfPJBXri8xdQkRwM8brMMT.jpg', '1', 'acadamicparty', '2017-11-11 20:34:36');
INSERT INTO `knowledgeinfodetail` VALUES ('26', '104', 'pic', 'http://acadamic-video-test.oss-cn-beijing.aliyuncs.com/knowledge-detail-video/SPJjBCQf8jmCT7xCDwGsCB4hX2Ww48B3.jpg', '2', 'acadamicparty', '2017-11-11 20:34:44');
INSERT INTO `knowledgeinfodetail` VALUES ('27', '104', 'text', '出差我费劲儿微风为我开了但是vksvdhfeewewv', '3', 'acadamicparty', '2017-11-11 20:35:01');
INSERT INTO `knowledgeinfodetail` VALUES ('28', '109', 'video', 'http://acadamic-video-test.oss-cn-beijing.aliyuncs.com/knowledge-detail-video/yBRjpKzdtQnZRd52K8hFA7ZA2kwEjDKB.mp4', '1', 'acadamicparty', '2017-11-12 12:10:48');
INSERT INTO `knowledgeinfodetail` VALUES ('29', '109', 'pic', 'http://acadamic-video-test.oss-cn-beijing.aliyuncs.com/knowledge-detail-video/dbyhdrkp6bazBmJzWxm5WBQTf2kw7Sbz.jpg', '2', 'acadamicparty', '2017-11-12 12:10:57');
INSERT INTO `knowledgeinfodetail` VALUES ('30', '125', 'pic', 'http://acadamic-video-test.oss-cn-beijing.aliyuncs.com/knowledge-detail-video/HXe24mN26RFbFxB7M7BHaFxfNjKCidBi.png', '1', 'acadamicparty', '2017-11-13 02:28:46');
INSERT INTO `knowledgeinfodetail` VALUES ('31', '129', 'pic', 'http://acadamic-video-test.oss-cn-beijing.aliyuncs.com/knowledge-detail-video/2jhQcG24rWsDaxZ2caxJPCRCQhmkTrJA.png', '1', 'acadamicparty', '2017-12-20 15:33:53');

-- ----------------------------
-- Table structure for knowledgeinfodetail_copy
-- ----------------------------
DROP TABLE IF EXISTS `knowledgeinfodetail_copy`;
CREATE TABLE `knowledgeinfodetail_copy` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `knowledgeInfoId` int(11) NOT NULL,
  `knowledgeInfoDetailType` varchar(20) COLLATE utf8_bin NOT NULL COMMENT '知识点内容明细类型',
  `info` varchar(1000) COLLATE utf8_bin NOT NULL,
  `orderIndex` int(11) NOT NULL DEFAULT '0' COMMENT '顺序',
  `lastUpdater` varchar(40) CHARACTER SET utf8 DEFAULT NULL COMMENT '最后操作者账号',
  `lastUpdateTime` datetime DEFAULT NULL COMMENT '最后操作时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8 COLLATE=utf8_bin ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of knowledgeinfodetail_copy
-- ----------------------------
INSERT INTO `knowledgeinfodetail_copy` VALUES ('1', '92', 'video', 'tmp/wrGQJZ2GMfNzbGS85TCaHRtZpsdW4pYS.mp4', '1', 'acadamicparty', '2017-11-10 00:46:22');
INSERT INTO `knowledgeinfodetail_copy` VALUES ('2', '92', 'video', 'tmp/AAznj5J8XbXXMFt4TeyhNAAcQQ4RFYh8.mp4', '2', 'acadamicparty', '2017-11-10 00:47:30');
INSERT INTO `knowledgeinfodetail_copy` VALUES ('3', '92', 'video', 'http://acadamic-video-test.oss-cn-beijing.aliyuncs.com/knowledge-detail-video/zijBffEj4NycXJF2CCQzQNZkQxrCeFyY.mp4', '3', 'acadamicparty', '2017-11-10 00:47:31');
INSERT INTO `knowledgeinfodetail_copy` VALUES ('4', '92', 'video', 'http://acadamic-video-test.oss-cn-beijing.aliyuncs.com/knowledge-detail-video/B83KQciEwiNtwfwAsjhbBW6xfHBy3zcf.mp4', '4', 'acadamicparty', '2017-11-10 00:47:32');
INSERT INTO `knowledgeinfodetail_copy` VALUES ('5', '92', 'video', 'http://acadamic-video-test.oss-cn-beijing.aliyuncs.com/knowledge-detail-video/BfzKhhEs65cdnKmcxK25w4zSz5HcwbKD.mp4', '5', 'acadamicparty', '2017-11-10 00:47:32');
INSERT INTO `knowledgeinfodetail_copy` VALUES ('6', '92', 'video', 'http://acadamic-video-test.oss-cn-beijing.aliyuncs.com/knowledge-detail-video/MTNe8YbhYkAEG4HMctcR2rQC5hdY5hc4.mp4', '1', 'acadamicparty', '2017-11-10 00:49:28');
INSERT INTO `knowledgeinfodetail_copy` VALUES ('9', '92', 'video', 'http://acadamic-video-test.oss-cn-beijing.aliyuncs.com/knowledge-detail-video/ACPJXejEpbzY6wWh6KBFhhpnarttKxzd.mp4', '1', 'acadamicparty', '2017-11-11 17:35:29');
INSERT INTO `knowledgeinfodetail_copy` VALUES ('10', '92', 'video', 'http://acadamic-video-test.oss-cn-beijing.aliyuncs.com/knowledge-detail-video/ZRa68DFJ3fDAG7PDMGD4th8hdtfG67Df.mp4', '2', 'acadamicparty', '2017-11-11 17:35:30');
INSERT INTO `knowledgeinfodetail_copy` VALUES ('11', '94', 'pic', 'http://acadamic-video-test.oss-cn-beijing.aliyuncs.com/knowledge-detail-video/T8fRezZXPJSBNQAH2tXR8eCJMk8AJAYB.jpeg', '1', 'acadamicparty', '2017-11-11 17:36:09');
INSERT INTO `knowledgeinfodetail_copy` VALUES ('12', '92', 'pic', 'http://acadamic-video-test.oss-cn-beijing.aliyuncs.com/knowledge-detail-video/x3TEXFJ64DytHE3rCZyrWtK7GSDay5xH.jpeg', '3', 'acadamicparty', '2017-11-11 17:35:32');
INSERT INTO `knowledgeinfodetail_copy` VALUES ('13', '92', 'pic', 'http://acadamic-video-test.oss-cn-beijing.aliyuncs.com/knowledge-detail-video/CTWXJmPxsEZ6WEFRkdTbaSJwpX8GEtFw.jpg', '4', 'acadamicparty', '2017-11-11 17:36:06');
INSERT INTO `knowledgeinfodetail_copy` VALUES ('14', '92', 'pic', 'http://acadamic-video-test.oss-cn-beijing.aliyuncs.com/knowledge-detail-video/SecctKatEabyRW8hXrW5eAR6xdyink65.jpg', '5', 'acadamicparty', '2017-11-11 17:36:08');
INSERT INTO `knowledgeinfodetail_copy` VALUES ('20', '95', 'text', '321', '2', 'acadamicparty', '2017-11-11 20:32:44');

-- ----------------------------
-- Table structure for knowledgepoint
-- ----------------------------
DROP TABLE IF EXISTS `knowledgepoint`;
CREATE TABLE `knowledgepoint` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `knowledgeId` int(11) NOT NULL,
  `code` varchar(40) NOT NULL,
  `title` varchar(255) NOT NULL COMMENT '知识点标题',
  `orderIndex` int(11) NOT NULL DEFAULT '0',
  `lastUpdater` varchar(40) DEFAULT NULL COMMENT '最后操作者账号',
  `lastUpdateTime` datetime DEFAULT NULL COMMENT '最后操作时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of knowledgepoint
-- ----------------------------
INSERT INTO `knowledgepoint` VALUES ('1', '11', '00001400100101', '1.1.1 Definition of Limits', '1', null, null);
INSERT INTO `knowledgepoint` VALUES ('2', '11', '00001400100102', '1.1.2 left-hand Limits and right-hand Limits', '2', null, null);
INSERT INTO `knowledgepoint` VALUES ('3', '11', '00001400100103', '1.1.3 Limits from graphs', '3', null, null);
INSERT INTO `knowledgepoint` VALUES ('4', '11', '00001400100104', '1.1.4 Does the Limit exist?', '4', null, null);
INSERT INTO `knowledgepoint` VALUES ('5', '11', '00001400100105', '1.1.5 章节小节', '5', null, null);
INSERT INTO `knowledgepoint` VALUES ('6', '14', '00001400200101', '2.1.1 Test1', '1', null, null);
INSERT INTO `knowledgepoint` VALUES ('7', '14', '00001400200102', '2.1.2 Test2', '2', null, null);
INSERT INTO `knowledgepoint` VALUES ('8', '15', '00001400200201', '2.2.1 Test2-2-1', '1', null, null);
INSERT INTO `knowledgepoint` VALUES ('9', '15', '00001400200202', '2.2.2 Test2-2-2', '2', null, null);

-- ----------------------------
-- Table structure for knowledgepointcontent
-- ----------------------------
DROP TABLE IF EXISTS `knowledgepointcontent`;
CREATE TABLE `knowledgepointcontent` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `knowledgePointId` int(11) NOT NULL,
  `code` varchar(40) NOT NULL,
  `type` varchar(20) NOT NULL COMMENT '知识内容类型',
  `content` text COMMENT '知识点内容',
  `orderIndex` int(11) NOT NULL DEFAULT '0' COMMENT '顺序',
  `lastUpdater` varchar(40) DEFAULT NULL COMMENT '最后操作者账号',
  `lastUpdateTime` datetime DEFAULT NULL COMMENT '最后操作时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of knowledgepointcontent
-- ----------------------------
INSERT INTO `knowledgepointcontent` VALUES ('1', '1', '0000140010010101', 'EXPLORE', '<h1>Definition of Limits</h1>\r\n<section>\r\n    <h2>探索</h2></section>\r\n<section>\r\n    如果你面前摆着一盘比萨，你会非常愿意把头伸过去闻它的味道。你的鼻子离比萨越近，你闻到的香味就越浓——但是注意！你的鼻子可不能碰到那个比萨，不然别人就甭吃了... </p>\r\n    <p>我们可以把你和比萨的距离vs.你闻到的比萨的香味写成一个最简单的函数：</p>\r\n    <p>\r\n        <table border=\"1\">\r\n            <tr>\r\n                <th>你和比萨的距离,x</th>\r\n                <th>10</th>\r\n                <th>8</th>\r\n                <th>5</th>\r\n                <th>3</th>\r\n            </tr>\r\n            <tr>\r\n                <td>比萨的香味，f(x)</td>\r\n                <td>5</td>\r\n                <td>6</td>\r\n                <td>7</td>\r\n                <td>8</td>\r\n            </tr>\r\n        </table>\r\n    </p>\r\n    <p>\r\n        你可以看出来，你离比萨<u>（越远/越近）</u>，你闻到的比萨味道<u>（越小/越大）</u>\r\n    </p>\r\n    <p>但是你就是说“小爷我任性，就是想把鼻子贴在比萨上闻味儿”，可是旁边又有10个彪形大汉对着你虎视眈眈，声称只要你的鼻子敢碰到比萨上就把你揍成比萨。</p>\r\n    <p>怎么办？</p>\r\n    <p>聪明的你想出了一个办法：我们可以来猜啊！</p>\r\n    <p>根据上面的那个表格，我们可以猜测，如果函数$f(x)$图像不是变化的非常剧烈的话，在你和比萨的距离等于0的时候，比萨的香味应该是<u>    </u>。</p>\r\n    <p>但是靠这么猜我们依然是很心慌的，因为我们不知道$f(x)$图像在最后一刻是不是会“抽风”...？保险起见，我们把我们的鼻子进一步向比萨靠近。。。</p>\r\n    <p>\r\n        <table border=\"1\">\r\n            <tr>\r\n                <th>你和比萨的距离,x</th>\r\n                <th>1</th>\r\n                <th>0.1</th>\r\n                <th>0.01</th>\r\n                <th>0.001</th>\r\n            </tr>\r\n            <tr>\r\n                <td>比萨的香味，f(x)</td>\r\n                <td>8.52</td>\r\n                <td>8.71</td>\r\n                <td>8.94</td>\r\n                <td>8.992</td>\r\n            </tr>\r\n        </table>\r\n    </p>\r\n    <p>\r\n        根据上面的那个表格，我们可以猜测，如果函数$f(x)$图像不是变化的非常剧烈的话，在你和比萨的距离等于0的时候，比萨的香味应该是\r\n        <input class=\"weui-input\" type=\"number\">。\r\n    </p>\r\n    <p>\r\n        用数学的话语来说，我们可以这么讲：当函数自变量x\r\n        <font color=\"red\">approaches to</font>0的时候，函数值x\r\n        <font color=\"red\">approaches to</font><u>&nbsp;&nbsp;&nbsp;&nbsp;</u>，这个数字就是 x\r\n        <font color=\"red\">approaches to </font>0时的\r\n        <font color=\"red\">limit</font>。 The limit of f(x), as x approaches a, equals L.\r\n    </p>\r\n    <p>\r\n        用数学符号来表示，可以表示为\\[{\\lim_{x\\to 0}} f(x) = 9\\]\r\n    </p>\r\n</section>', '0', null, null);
INSERT INTO `knowledgepointcontent` VALUES ('2', '1', '0000140010010102', 'GAME', null, '0', null, null);
INSERT INTO `knowledgepointcontent` VALUES ('3', '2', '0000140010010201', 'EXPLORE', null, '0', null, null);
INSERT INTO `knowledgepointcontent` VALUES ('4', '2', '0000140010010202', 'GAME', null, '0', null, null);
INSERT INTO `knowledgepointcontent` VALUES ('5', '3', '0000140010010301', 'EXPLORE', null, '0', null, null);

-- ----------------------------
-- Table structure for knowledgequestion
-- ----------------------------
DROP TABLE IF EXISTS `knowledgequestion`;
CREATE TABLE `knowledgequestion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `knowledgePointContentId` int(11) NOT NULL,
  `content` text,
  `lastUpdater` varchar(40) DEFAULT NULL COMMENT '最后操作者账号',
  `lastUpdateTime` datetime DEFAULT NULL COMMENT '最后操作时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of knowledgequestion
-- ----------------------------
INSERT INTO `knowledgequestion` VALUES ('1', '1', '<h1>探索</h1>\r\n<p>\r\n    如果你面前摆着一盘比萨，你会非常愿意把头伸过去闻它的味道。你的鼻子离比萨越近，你闻到的香味就越浓——但是注意！你的鼻子可不能碰到那个比萨，不然别人就甭吃了... </p>\r\n<p>我们可以把你和比萨的距离vs.你闻到的比萨的香味写成一个最简单的函数：</p>\r\n<p>\r\n    <table border=\"1\">\r\n        <tr>\r\n            <th>你和比萨的距离,x</th>\r\n            <th>10</th>\r\n            <th>8</th>\r\n            <th>5</th>\r\n            <th>3</th>\r\n        </tr>\r\n        <tr>\r\n            <td>比萨的香味，f(x)</td>\r\n            <td>5</td>\r\n            <td>6</td>\r\n            <td>7</td>\r\n            <td>8</td>\r\n        </tr>\r\n    </table>\r\n</p>\r\n<p>\r\n    你可以看出来，你离比萨越<u>近</u>，你闻到的比萨味道越\r\n    <input type=\"text\" class=\"weui-input\" code=\"x1\" placeholder=\"大 or 小\" />\r\n</p>\r\n<p>\r\n    但是你就是说“小爷我任性，就是想把鼻子贴在比萨上闻味儿”，可是旁边又有10个彪形大汉对着你虎视眈眈，声称只要你的鼻子敢碰到比萨上就把你揍成比萨。</p>\r\n<p>怎么办？</p>\r\n<p>聪明的你想出了一个办法：我们可以来猜啊！</p>\r\n<p>根据上面的那个表格，我们可以猜测，如果函数$f(x)$图像不是变化的非常剧烈的话，在你和比萨的距离等于0的时候，比萨的香味应该是<input class=\"weui-input\" type=\"number\" code=\"x5\">。</p>', null, null);
INSERT INTO `knowledgequestion` VALUES ('2', '1', '<p>但是靠这么猜我们依然是很心慌的，因为我们不知道$f(x)$图像在最后一刻是不是会“抽风”...？保险起见，我们把我们的鼻子进一步向比萨靠近。。。</p>\r\n<p>\r\n    <table border=\"1\">\r\n        <tr>\r\n            <th>你和比萨的距离,x</th>\r\n            <th>1</th>\r\n            <th>0.1</th>\r\n            <th>0.01</th>\r\n            <th>0.001</th>\r\n        </tr>\r\n        <tr>\r\n            <td>比萨的香味，f(x)</td>\r\n            <td>8.52</td>\r\n            <td>8.71</td>\r\n            <td>8.94</td>\r\n            <td>8.992</td>\r\n        </tr>\r\n    </table>\r\n</p>\r\n<p>\r\n    根据上面的那个表格，我们可以猜测，如果函数$f(x)$图像不是变化的非常剧烈的话，在你和比萨的距离等于0的时候，比萨的香味应该是\r\n    <input class=\"weui-input\" type=\"number\" code=\"x2\">。\r\n</p>\r\n<p>\r\n    用数学的话语来说，我们可以这么讲：当函数自变量x\r\n    <font color=\"red\">approaches to</font>0的时候，函数值x\r\n    <font color=\"red\">approaches to</font><u>&nbsp;&nbsp;&nbsp;&nbsp;</u>，这个数字就是 x\r\n    <font color=\"red\">approaches to </font>0时的\r\n    <font color=\"red\">limit</font>。 The limit of f(x), as x approaches a, equals L.\r\n</p>\r\n<p>\r\n    用数学符号来表示，可以表示为\\[{\\lim_{x\\to 0}} f(x) = 9\\]\r\n</p>', null, null);
INSERT INTO `knowledgequestion` VALUES ('3', '2', '<h1>游戏</h1> \r\n<p>1.针对以下函数和函数表格，填写函数在某点的limit</p>\r\n<p>\\[f(x) = \\frac{x^2-1}{x-1}\\]</p>\r\n<p>\r\n	<table border=\"1\">\r\n		<tr>\r\n			<th>x</th>\r\n			<th>0.9</th>\r\n			<th>0.99</th>\r\n			<th>0.999</th>\r\n			<th>0.9999</th>\r\n		</tr>\r\n		<tr>\r\n			<td>f(x)</td>\r\n			<td>1.9</td>\r\n			<td>1.99</td>\r\n			<td>1.999</td>\r\n			<td>1.9999</td>\r\n		</tr>\r\n	</table>\r\n</p>\r\n<p>\r\n	\\[{\\lim_{x\\to 1}} f(x) = \\FormInput{x3}\\]\r\n</p>', '', null);
INSERT INTO `knowledgequestion` VALUES ('4', '2', '<p>2.针对以下函数和函数表格，填写函数在某点的limit</p>\r\n<p>\\[f(x) = \\frac{x-1}{x^2-1}\\]</p>\r\n<p>\r\n	<table border=\"1\">\r\n		<tr>\r\n			<th>x</th>\r\n			<th>0.5</th>\r\n			<th>0.9</th>\r\n			<th>0.99</th>\r\n			<th>0.999</th>\r\n		</tr>\r\n		<tr>\r\n			<td>f(x)</td>\r\n			<td>0.667</td>\r\n			<td>0.526</td>\r\n			<td>0.503</td>\r\n			<td>0.500</td>\r\n		</tr>\r\n	</table>\r\n</p>\r\n<p>\r\n	\\[{\\lim_{x\\to 1}} f(x) = \\FormInput{x4}\\]\r\n</p>', null, null);
INSERT INTO `knowledgequestion` VALUES ('5', '2', '<p>3.针对以下函数和函数表格，填写函数在某点的limit</p>\r\n<p>\\[f(x) = x^2-x+2\\]</p>\r\n<p>\r\n	<table border=\"1\">\r\n		<tr>\r\n			<th>x</th>\r\n			<th>1.9</th>\r\n			<th>1.95</th>\r\n			<th>1.99</th>\r\n			<th>1.995</th>\r\n		</tr>\r\n		<tr>\r\n			<td>f(x)</td>\r\n			<td>3.71</td>\r\n			<td>3.853</td>\r\n			<td>3.97</td>\r\n			<td>3.985</td>\r\n		</tr>\r\n	</table>\r\n</p>\r\n<p>\r\n	\\[{\\lim_{x\\to \\FormInput{x6}}} f(x) = \\FormInput{x7}\\]\r\n</p>', null, null);
INSERT INTO `knowledgequestion` VALUES ('6', '2', '<p>4.针对以下函数和函数表格，填写函数在某点的limit</p>\r\n<p>\\[f(x) = x^2-x+2\\]</p>\r\n<p>\r\n	<table border=\"1\">\r\n		<tr>\r\n			<th>x</th>\r\n			<th>2.1</th>\r\n			<th>2.05</th>\r\n			<th>2.01</th>\r\n			<th>2.005</th>\r\n		</tr>\r\n		<tr>\r\n			<td>f(x)</td>\r\n			<td>4.31</td>\r\n			<td>4.153</td>\r\n			<td>4.03</td>\r\n			<td>4.015</td>\r\n		</tr>\r\n	</table>\r\n</p>\r\n<p>\r\n	\\[{\\lim_{x\\to \\FormInput{x8}}} f(x) = \\FormInput{x9}\\]\r\n</p>\r\n', null, null);
INSERT INTO `knowledgequestion` VALUES ('7', '3', '<h1>发现</h1>\r\n<p>\r\n    对于这个表格来说：</p>\r\n<p>我们可以把你和比萨的距离vs.你闻到的比萨的香味写成一个最简单的函数：</p>\r\n<p>\r\n    <table border=\"1\">\r\n        <tr>\r\n            <th>x</th>\r\n            <th>1.9</th>\r\n            <th>1.95</th>\r\n            <th>1.99</th>\r\n            <th>1.995</th>\r\n        </tr>\r\n        <tr>\r\n            <td>f(x)</td>\r\n            <td>3.71</td>\r\n            <td>3.853</td>\r\n            <td>3.97</td>\r\n            <td>3.985</td>\r\n        </tr>\r\n    </table>\r\n</p>\r\n<p>\r\n    如果我们把$x$的变化类比为一个小人的足迹的话，我们可以发现小人在$x$轴上不断的向<input type=\"text\" class=\"weui-input\" code=\"x1\" />（左/右）运动，或者可以说：自变量从<input type=\"text\" class=\"weui-input\" code=\"x2\" />（左/右）靠近$x=2$这个数值。这样的得到的limit，我们管它叫做<font color=\"red\">left-hand limit</font>，并且可以表示为：\r\n</p>\r\n<p>\r\n    \\[ {\\lim_{x\\to 2^- }} (x^2-x+2) = 4\\]</p>\r\n<p>2右上角的负号可以理解为“函数值x从负方向逼近2”</p>\r\n<p>We write \\[ {\\lim_{x\\to a^- }} f(x) = L\\]</p>\r\n<p>and say the <font color=\"red\">left-hand limit</font> of $f(x)$ as $x$ approaches $a$ is equal to $L$.</p>', null, null);
INSERT INTO `knowledgequestion` VALUES ('8', '3', '<p>而对于这个表格来说：</p>\r\n<p>\r\n    <table border=\"1\">\r\n        <tr>\r\n            <th>x</th>\r\n            <th>2.1</th>\r\n            <th>2.05</th>\r\n            <th>2.01</th>\r\n            <th>2.005</th>\r\n        </tr>\r\n        <tr>\r\n            <td>f(x)</td>\r\n            <td>4.31</td>\r\n            <td>4.153</td>\r\n            <td>4.03</td>\r\n            <td>4.015</td>\r\n        </tr>\r\n    </table>\r\n</p>\r\n<p>\r\n    如果我们把$x$的变化类比为一个小人的足迹的话，我们可以发现小人在$x$轴上不断的向<input type=\"text\" class=\"weui-input\" code=\"x3\" />（左/右）运动，或者可以说：自变量从<input type=\"text\" class=\"weui-input\" code=\"xx1\" />（左/右）靠近$x=2$这个数值。这样的得到的极限，我们管它叫做<font color=\"red\">right-hand limit</font>,并且可以表示为：\r\n</p>\r\n<p>\\[ {\\lim_{x\\to 2^+ }} (x^2-x+2) = 4\\]</p>\r\n<p>2右上角的正号可以理解为“函数值x从正方向逼近2”</p>\r\n<p>We write \\[ {\\lim_{x\\to a^+ }} f(x) = L\\]</p>\r\n<p>and say the <font color=\"red\">right-hand limit</font> of $f(x)$ as $x$ approaches $a$ is equal to $L$.</p>', null, null);
INSERT INTO `knowledgequestion` VALUES ('9', '4', '<h1>游戏</h1> \r\n<p>判断以下函数的极限是left-hand limit 还是right-hand limit。</p>\r\n<p>\\[f(x) = x^3 + \\frac{cos(5x)}{10000}\\]</p>\r\n<p>\r\n    <table border=\"1\">\r\n        <tr>\r\n            <th>x</th>\r\n            <th>1</th>\r\n            <th>0.5</th>\r\n            <th>0.1</th>\r\n            <th>0.05</th>\r\n        </tr>\r\n        <tr>\r\n            <td>f(x)</td>\r\n            <td>1.000</td>\r\n            <td>0.125</td>\r\n            <td>0.001</td>\r\n            <td>0.0002</td>\r\n        </tr>\r\n    </table>\r\n</p>\r\n<p>\r\n    the <input type=\"text\" class=\"weui-input\" code=\"x5\" />(left/right)-hand limit of $f(x)$ as $x$ approaches <input type=\"text\" class=\"weui-input\" code=\"x6\" /> is equal to <input type=\"text\" class=\"weui-input\" code=\"x7\" />.\r\n</p>', null, null);
INSERT INTO `knowledgequestion` VALUES ('10', '4', '<p>\\[f(x) = \\frac{\\sqrt{x^2+9}-3}{x^2}\\]</p>\r\n<p>\r\n    <table border=\"1\">\r\n        <tr>\r\n            <th>x</th>\r\n            <th>0.5</th>\r\n            <th>0.1</th>\r\n            <th>0.05</th>\r\n            <th>0.01</th>\r\n        </tr>\r\n        <tr>\r\n            <td>f(x)</td>\r\n            <td>0.16553</td>\r\n            <td>0.16662</td>\r\n            <td>0.16666</td>\r\n            <td>0.16667</td>\r\n        </tr>\r\n    </table>\r\n</p>\r\n<p>\r\n    the <input type=\"text\" class=\"weui-input\" code=\"x8\" />(left/right)-hand limit of $f(x)$ as $x$ approaches <input type=\"text\" class=\"weui-input\" code=\"x9\" /> is equal to <input type=\"text\" class=\"weui-input\" code=\"x10\" />.\r\n</p>', null, null);
INSERT INTO `knowledgequestion` VALUES ('11', '4', '<p>\\[f(x) =\\frac{tan(3x)}{tan(5x)}\\]</p>\r\n<p>\r\n    <table border=\"1\">\r\n        <tr>\r\n            <th>x</th>\r\n            <th>1</th>\r\n            <th>0.5</th>\r\n            <th>0.1</th>\r\n            <th>0.05</th>\r\n        </tr>\r\n        <tr>\r\n            <td>f(x)</td>\r\n            <td>0.59902</td>\r\n            <td>0.59976</td>\r\n            <td>0.5999902</td>\r\n            <td>0.5999975</td>\r\n        </tr>\r\n    </table>\r\n</p>\r\n<p>\r\n    the <input type=\"text\" class=\"weui-input\" code=\"x11\" />(left/right)-hand limit of $f(x)$ as $x$ approaches <input type=\"text\" class=\"weui-input\" code=\"x12\" /> is equal to <input type=\"text\" class=\"weui-input\" code=\"x13\" />.\r\n</p>', null, null);
INSERT INTO `knowledgequestion` VALUES ('12', '5', '<h1>探索</h1>\r\n<p>除了通过表格找到函数的limit以外，我们也可以通过图像发现函数的limit。</p>\r\n<p>\r\n    <img src=\"/calculcus/1.1.3-1-1-01.png\">\r\n</p>\r\n<p>\r\n    对于上图的函数，根据函数的图像，当$x$越来越接近2的时候，函数值$f(x)$愈发接近<input type=\"text\" class=\"weui-input\" code=\"x1\" />，所以我们可以写出：\r\n</p>\r\n<p>\r\n    \\[{\\lim_{x\\to 2}} f(x) = \\FormInput{x2}\\]\r\n</p>', null, null);
INSERT INTO `knowledgequestion` VALUES ('13', '5', '<p>\r\n	在刚才那个函数中，我们可以发现x<input type=\"text\" class=\"weui-input\" code=\"x3\" />（可以/不可以）等于2，而函数等于2的时候，函数值$f(2)$恰好就是我们刚才所求的那个limit。这是一个巧合吗？我们可以把它写成：\\[{\\lim_{x\\to 2}} f(x) = f(2)\\]\r\n</p>\r\n<p>\r\n    那么是不是对于所有函数的所有点，我们都可以写出：\\[{\\lim_{x\\to a}} f(x) = f(a)\\]\r\n</p>\r\n<p>\r\n    来看一下下面这个例子：\r\n</p>\r\n<p>\r\n	\\[f(x) =  \\frac{x^2-1}{x-1}\\]\r\n</p>\r\n<p>\r\n	函数的domain是$x 不等于 <input type=\"text\" class=\"weui-input\" code=\"x4\" />\r\n</p>\r\n<p>\r\n    <img src=\"/calculcus/1.1.3-1-2-01.png\">\r\n</p>\r\n<p>\r\n	通过图像，我们可以发现，当自变量$x$越接近于1时，函数值越接近于<input type=\"text\" class=\"weui-input\" code=\"x5\" />（数字）。因为domain的原因，$x$<input type=\"text\" class=\"weui-input\" code=\"x6\" />（可以/不可以）等于1。虽然$x$<input type=\"text\" class=\"weui-input\" code=\"x7\" />（可以/不可以）等于1，根据limit的定义，这对函数在$x=1$处的limit<input type=\"text\" class=\"weui-input\" code=\"x8\" />（有影响/不影响）。\r\n</p>\r\n<p>\r\n	所以，\\[{\\lim_{x\\to 1}} \\frac{x^2-1}{x-1} = \\FormInput{x9}\\]\r\n</p>\r\n<p>\r\n	而f(1) = <input type=\"text\" class=\"weui-input\" code=\"x10\" />\r\n</p>\r\n<p>\r\n	所以我们可以知道\\[{\\lim_{x\\to 1}} f(x) = f(2)\\] （成立/不成立）\r\n</p>\r\n<p>所以\\[{\\lim_{x\\to a}} f(x) = f(a)\\]（永远成立/并非永远成立）</p>\r\n<p>该公式何时成立？成立又意味着什么？我们到后面再来探讨。</p>', null, null);
INSERT INTO `knowledgequestion` VALUES ('14', '5', '<h1>发现</h1>\r\n<p>\r\n	我们把刚才的函数稍微变化一下，变成一个“人工制造”的函数：\r\n</p>\r\n<p>\r\n\\[f(x) = \r\n\\begin{cases}\r\n1 & x = 1\\\\\r\n\\frac{x^2-1}{x-1} & x\\not=1\r\n\\end{cases}\r\n\\]\r\n</p>\r\n<p>\r\n	这样，函数图像可以就成了：\r\n</p>\r\n<p>\r\n    <img src=\"/calculcus/1.1.3-2-1-01.png\">\r\n</p>\r\n<p>\r\n	\\[{\\lim_{x\\to 1}} f(x) = \\FormInput{x11} \\text {；} f(1) =\\FormInput{x12} \\]\r\n</p>\r\n<h1>总结</h1>\r\n<p>\r\n	函数在$x=a$处的limit，与函数在$x=a$处是否有定义<input type=\"text\" class=\"weui-input\" code=\"x13\" />（有关/无关），与函数在$x=a$处的函数值大小<input type=\"text\" class=\"weui-input\" code=\"x14\" />（有关/无关）\r\n</p>', null, null);
INSERT INTO `knowledgequestion` VALUES ('15', '5', '<h1>发现</h1>\r\n<p>\r\n	通过图像，我们也能够更直观的找到函数在某一点的left-hand limit和函数在某一点的right-hand limit：\r\n</p>\r\n<p>\r\n	<img src=\"/calculcus/1.1.3-3-1-01.png\">\r\n</p>\r\n<p>\r\n	对于函数$f(x)$而言，$f(1)=<input type=\"text\" class=\"weui-input\" code=\"x15\" />$（数字），如果从左边接近$x = 1$点，我们可以发现函数值趋近于<input type=\"text\" class=\"weui-input\" code=\"x16\" />（数字），这也意味着函数的<input type=\"text\" class=\"weui-input\" code=\"x17\" />(left-hand limit/ right-hand limit)是<input type=\"text\" class=\"weui-input\" code=\"x18\" />（数字）。\r\n</p>\r\n<p>\r\n    如果从右边接近$x = 1$点，我们可以发现函数值趋近于<input type=\"text\" class=\"weui-input\" code=\"x19\" />（数字），这也意味着函数的<input type=\"text\" class=\"weui-input\" code=\"x20\" />(left-hand limit/ right-hand limit)是<input type=\"text\" class=\"weui-input\" code=\"x21\" />（数字）。\r\n</p>\r\n<p>\r\n	函数的left-hand limit<input type=\"text\" class=\"weui-input\" code=\"x22\" />（等于/不等于）right-hand limit。\r\n</p>', null, null);
INSERT INTO `knowledgequestion` VALUES ('16', '5', '<h1>游戏</h1> \r\n<p><img src=\"/calculcus/1.1.3-4-1-01.png\"></p>\r\n<p>\r\n	如果从左边接近$x = 0$点，我们可以发现函数值趋近于<input type=\"text\" class=\"weui-input\" code=\"x23\" />（数字），这也意味着函数的<input type=\"text\" class=\"weui-input\" code=\"x24\" />(left-hand limit/ right-hand limit)是<input type=\"text\" class=\"weui-input\" code=\"x25\" />（数字）。\r\n</p>\r\n<p>\r\n	如果从右边接近$x = 2$点，我们可以发现函数值趋近于<input type=\"text\" class=\"weui-input\" code=\"x26\" />（数字），这也意味着函数的<input type=\"text\" class=\"weui-input\" code=\"x27\" />(left-hand limit/ right-hand limit)是<input type=\"text\" class=\"weui-input\" code=\"x28\" />（数字）。\r\n</p>', null, null);
INSERT INTO `knowledgequestion` VALUES ('17', '5', '<p><img src=\"/calculcus/1.1.3-4-1-02.png\"></p>\r\n<p>\r\n如果从左边接近$x = 0$点，我们可以发现函数值趋近于<input type=\"text\" class=\"weui-input\" code=\"x29\" />（数字），这也意味着函数的<input type=\"text\" class=\"weui-input\" code=\"x30\" />(left-hand limit/ right-hand limit)是<input type=\"text\" class=\"weui-input\" code=\"x31\" />（数字）。\r\n</p>\r\n<p>\r\n如果从右边接近$x = 0$点，我们可以发现函数值趋近于<input type=\"text\" class=\"weui-input\" code=\"x32\" />（数字），这也意味着函数的<input type=\"text\" class=\"weui-input\" code=\"x33\" />(left-hand limit/ right-hand limit)是<input type=\"text\" class=\"weui-input\" code=\"x34\" />（数字）。\r\n</p>\r\n<p>\r\n如果从左边接近$x = 1$点，我们可以发现函数值趋近于<input type=\"text\" class=\"weui-input\" code=\"x35\" />（数字），这也意味着函数的<input type=\"text\" class=\"weui-input\" code=\"x36\" />(left-hand limit/ right-hand limit)是<input type=\"text\" class=\"weui-input\" code=\"x37\" />（数字）。\r\n</p>\r\n<p>\r\n如果从右边接近$x = 1$点，我们可以发现函数值趋近于<input type=\"text\" class=\"weui-input\" code=\"x38\" />（数字），这也意味着函数的<input type=\"text\" class=\"weui-input\" code=\"x39\" />(left-hand limit/ right-hand limit)是<input type=\"text\" class=\"weui-input\" code=\"x40\" />（数字）。\r\n</p>\r\n<p>\r\n如果从左边接近$x = 2$点，我们可以发现函数值趋近于<input type=\"text\" class=\"weui-input\" code=\"x41\" />（数字），这也意味着函数的<input type=\"text\" class=\"weui-input\" code=\"x42\" />(left-hand limit/ right-hand limit)是<input type=\"text\" class=\"weui-input\" code=\"x43\" />（数字）。\r\n</p>\r\n<p>\r\n如果从右边接近$x = 2$点，我们可以发现函数值趋近于<input type=\"text\" class=\"weui-input\" code=\"x44\" />（数字），这也意味着函数的<input type=\"text\" class=\"weui-input\" code=\"x45\" />(left-hand limit/ right-hand limit)是<input type=\"text\" class=\"weui-input\" code=\"x46\" />（数字）。\r\n</p>\r\n<p>\r\n如果从左边接近$x = 3$点，我们可以发现函数值趋近于<input type=\"text\" class=\"weui-input\" code=\"x47\" />（数字），这也意味着函数的<input type=\"text\" class=\"weui-input\" code=\"x48\" />(left-hand limit/ right-hand limit)是<input type=\"text\" class=\"weui-input\" code=\"x49\" />（数字）。\r\n</p>\r\n<p>\r\n如果从右边接近$x = 3$点，我们可以发现函数值趋近于<input type=\"text\" class=\"weui-input\" code=\"x50\" />（数字），这也意味着函数的<input type=\"text\" class=\"weui-input\" code=\"x51\" />(left-hand limit/ right-hand limit)是<input type=\"text\" class=\"weui-input\" code=\"x52\" />（数字）。\r\n</p>\r\n<p>\r\n如果从左边接近$x = 4$点，我们可以发现函数值趋近于<input type=\"text\" class=\"weui-input\" code=\"x53\" />（数字），这也意味着函数的<input type=\"text\" class=\"weui-input\" code=\"x54\" />(left-hand limit/ right-hand limit)是<input type=\"text\" class=\"weui-input\" code=\"x55\" />（数字）。\r\n</p>\r\n<p>\r\n如果从右边接近$x = 4$点，我们可以发现函数值趋近于<input type=\"text\" class=\"weui-input\" code=\"x56\" />（数字），这也意味着函数的<input type=\"text\" class=\"weui-input\" code=\"x57\" />(left-hand limit/ right-hand limit)是<input type=\"text\" class=\"weui-input\" code=\"x58\" />（数字）。\r\n</p>', null, null);

-- ----------------------------
-- Table structure for knowledgequestionanswer
-- ----------------------------
DROP TABLE IF EXISTS `knowledgequestionanswer`;
CREATE TABLE `knowledgequestionanswer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `knowledgeQuestionId` int(11) NOT NULL,
  `code` varchar(255) NOT NULL COMMENT '文本框代码',
  `rightAnswer` varchar(255) NOT NULL COMMENT '正确答案',
  `lastUpdater` varchar(40) DEFAULT NULL COMMENT '最后操作者账号',
  `lastUpdateTime` datetime DEFAULT NULL COMMENT '最后操作时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of knowledgequestionanswer
-- ----------------------------
INSERT INTO `knowledgequestionanswer` VALUES ('1', '1', 'x1', '大', null, null);
INSERT INTO `knowledgequestionanswer` VALUES ('2', '2', 'x2', '9', null, null);
INSERT INTO `knowledgequestionanswer` VALUES ('3', '3', 'x3', '2', null, null);
INSERT INTO `knowledgequestionanswer` VALUES ('4', '4', 'x4', '0.5', null, null);

-- ----------------------------
-- Table structure for knowledge_copy
-- ----------------------------
DROP TABLE IF EXISTS `knowledge_copy`;
CREATE TABLE `knowledge_copy` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(20) NOT NULL COMMENT '编号规则：6位课程编号+3位章节编号+3位知识点编号+2位难度级别编号+2位习题编号',
  `name` varchar(100) NOT NULL COMMENT '知识点标题',
  `orderIndex` int(11) NOT NULL DEFAULT '0' COMMENT '顺序',
  `lastUpdater` varchar(40) DEFAULT NULL COMMENT '最后操作者账号',
  `lastUpdateTime` datetime DEFAULT NULL COMMENT '最后操作时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of knowledge_copy
-- ----------------------------
INSERT INTO `knowledge_copy` VALUES ('2', '000004001002', '222', '2', 'acadamicparty', '2017-11-12 13:52:53');
INSERT INTO `knowledge_copy` VALUES ('3', '000004001003', '333', '3', 'acadamicparty', '2017-11-12 13:33:28');
INSERT INTO `knowledge_copy` VALUES ('4', '000004001004', '444', '4', 'acadamicparty', '2017-11-12 13:33:26');
INSERT INTO `knowledge_copy` VALUES ('5', '000004001005', '555', '5', 'acadamicparty', '2017-11-12 13:33:24');
INSERT INTO `knowledge_copy` VALUES ('6', '000004001006', '666', '6', 'acadamicparty', '2017-11-12 13:33:21');
INSERT INTO `knowledge_copy` VALUES ('7', '000004001007', '777', '7', 'acadamicparty', '2017-11-07 18:48:39');

-- ----------------------------
-- Table structure for progresschapter
-- ----------------------------
DROP TABLE IF EXISTS `progresschapter`;
CREATE TABLE `progresschapter` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `courseId` int(11) NOT NULL COMMENT '课程ID',
  `chapterId` int(11) NOT NULL,
  `knowledgeId` int(11) DEFAULT NULL COMMENT '进度-知识点ID',
  `progressPercent` double DEFAULT '0' COMMENT '章节学习进度百分比',
  `createTime` datetime DEFAULT NULL COMMENT '开始练习时间',
  `lastUpdateTime` datetime DEFAULT NULL COMMENT '最后一次练习更新时间',
  `buyTime` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of progresschapter
-- ----------------------------

-- ----------------------------
-- Table structure for progresscourse
-- ----------------------------
DROP TABLE IF EXISTS `progresscourse`;
CREATE TABLE `progresscourse` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `courseId` int(11) NOT NULL COMMENT '课程ID',
  `chapterId` int(11) NOT NULL,
  `percent` double DEFAULT '0' COMMENT '章节学习进度',
  `createTime` datetime DEFAULT NULL COMMENT '开始练习时间',
  `lastUpdateTime` datetime DEFAULT NULL COMMENT '最后一次练习更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `userId` (`userId`,`courseId`,`chapterId`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8 COLLATE=utf8_bin ROW_FORMAT=DYNAMIC COMMENT='课程学习进度';

-- ----------------------------
-- Records of progresscourse
-- ----------------------------
INSERT INTO `progresscourse` VALUES ('50', '19', '14', '9', '0', '2018-01-21 17:15:34', null);
INSERT INTO `progresscourse` VALUES ('51', '19', '14', '13', '0', '2018-01-21 19:09:03', null);
INSERT INTO `progresscourse` VALUES ('52', '19', '14', '12', '0', '2018-01-23 16:13:49', null);
