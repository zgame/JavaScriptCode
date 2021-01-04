create table state_game
(
    zkey        varchar(40) default '' not null
        primary key,
    server_ip   varchar(20)            null,
    game_id     int(255)               null,
    table_id    int(255)               null,
    seat_array  int(255)               null,
    pool_all    bigint(255)            null,
    jackpot     bigint(255)            null,
    reward_rate varchar(10)            null
);

INSERT INTO sandrock.state_game (zkey, server_ip, game_id, table_id, seat_array, pool_all, jackpot, reward_rate) VALUES ('192.168.0.218:8123_100_1', '192.168.0.218:8123', 100, 1, 0, 0, 0, '0.00%');
INSERT INTO sandrock.state_game (zkey, server_ip, game_id, table_id, seat_array, pool_all, jackpot, reward_rate) VALUES ('192.168.0.218:8123_101_1', '192.168.0.218:8123', 101, 1, 0, 1950, 260, '53.19%');
INSERT INTO sandrock.state_game (zkey, server_ip, game_id, table_id, seat_array, pool_all, jackpot, reward_rate) VALUES ('192.168.0.218:8123_102_1', '192.168.0.218:8123', 102, 1, 0, 0, 0, '0.00%');
INSERT INTO sandrock.state_game (zkey, server_ip, game_id, table_id, seat_array, pool_all, jackpot, reward_rate) VALUES ('192.168.0.218:8123_103_1', '192.168.0.218:8123', 103, 1, 0, 112500, 15000, '58.82%');
INSERT INTO sandrock.state_game (zkey, server_ip, game_id, table_id, seat_array, pool_all, jackpot, reward_rate) VALUES ('192.168.101.109:8123_100_1', '192.168.101.109:8123', 100, 1, 1, 0, 0, '0.00%');
INSERT INTO sandrock.state_game (zkey, server_ip, game_id, table_id, seat_array, pool_all, jackpot, reward_rate) VALUES ('192.168.101.109:8123_101_1', '192.168.101.109:8123', 101, 1, 0, -29400, 2880, '124.75%');
INSERT INTO sandrock.state_game (zkey, server_ip, game_id, table_id, seat_array, pool_all, jackpot, reward_rate) VALUES ('192.168.101.109:8123_102_1', '192.168.101.109:8123', 102, 1, 1, 0, 0, '0%');
INSERT INTO sandrock.state_game (zkey, server_ip, game_id, table_id, seat_array, pool_all, jackpot, reward_rate) VALUES ('192.168.101.109:8123_103_1', '192.168.101.109:8123', 103, 1, 0, -20000, 0, '0.00%');