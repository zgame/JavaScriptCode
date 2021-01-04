create table admin_user
(
    id           int auto_increment
        primary key,
    name         varchar(10) not null,
    pwd          varchar(30) null,
    login_time   varchar(20) null,
    is_admin     int         not null,
    is_dashboard int         not null,
    is_statis    int         not null,
    is_edit      int         not null
);

INSERT INTO sandrock.admin_user (id, name, pwd, login_time, is_admin, is_dashboard, is_statis, is_edit) VALUES (1, 'zsw', 'zsw123', '2021-01-04 14:28:45', 1, 0, 0, 0);