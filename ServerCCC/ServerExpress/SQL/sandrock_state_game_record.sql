create table state_game_record
(
    server_ip    varchar(20) null,
    game_id      int         null,
    room_id      int         null,
    jackpot      int         null,
    pool_all     int         null,
    seat_array   int         null,
    reward_rate  int         null,
    time         varchar(20) null,
    player_win1  int         null,
    player_win2  int         null,
    player_lost1 int         null
);

