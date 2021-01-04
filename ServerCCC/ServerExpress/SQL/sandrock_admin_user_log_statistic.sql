create table admin_user_log_statistic
(
    user    varchar(20)   null,
    action  varchar(100)  null,
    content varchar(5000) null,
    time    varchar(20)   null
);

INSERT INTO sandrock.admin_user_log_statistic (user, action, content, time) VALUES ('zsw', ' 新增邮件 ', '{
 "id": 0,
 "uuid": 1609751084188,
 "mail": "默认邮件内容44",
 "userId": 0,
 "serverId": "个",
 "start_time": [
  "2021-01-04 17:04:38",
  "2021-01-06 17:04:38"
 ],
 "score": 0,
 "item": 0,
 "item_num": 0
}', '2021-01-04 17:04:45');
INSERT INTO sandrock.admin_user_log_statistic (user, action, content, time) VALUES ('zsw', ' 修改邮件 ', '{
 "id": 0,
 "uuid": 1609751084188,
 "mail": "默认邮件内容44",
 "userId": "45345345",
 "serverId": "个",
 "start_time": [
  "2021-01-04 17:04:38",
  "2021-01-06 17:04:38"
 ],
 "score": 0,
 "item": 0,
 "item_num": 0
}', '2021-01-04 17:04:52');
INSERT INTO sandrock.admin_user_log_statistic (user, action, content, time) VALUES ('zsw', ' 删除邮件 ', '{
 "id": 0,
 "uuid": 1609751084188,
 "mail": "默认邮件内容44",
 "userId": "45345345",
 "serverId": "个",
 "start_time": [
  "2021-01-04 17:04:38",
  "2021-01-06 17:04:38"
 ],
 "score": 0,
 "item": 0,
 "item_num": 0
}', '2021-01-04 17:04:55');