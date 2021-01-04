create table player_charge_rmb
(
    user_id      int          null,
    platform_id  int          null,
    server_id    varchar(20)  null,
    shop_index   int          null,
    shop_event   varchar(10)  null,
    pay_id       varchar(100) not null
        primary key,
    stone_change int          null,
    rmb          float        null,
    time         varchar(20)  null
);

