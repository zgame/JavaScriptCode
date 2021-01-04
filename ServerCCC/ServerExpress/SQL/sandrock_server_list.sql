create table server_list
(
    id           int auto_increment
        primary key,
    server_ip    varchar(40)   null,
    server_name  varchar(20)   null,
    server_state int default 0 null
);

INSERT INTO sandrock.server_list (id, server_ip, server_name, server_state) VALUES (1, '172.16.140.123:8123:8089', '胜多负少的', 0);