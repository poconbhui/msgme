MsgMe
=====

A super simple messaging tool for people on your lan to send you messages
that pop up as notifications.

Make sure there is a node executable in `/usr/local/bin` and that
npm installs `node_modules` in `/usr/local/lib/node_modules`.
Specifically, that globally installing this module via npm will
place a `msgme` executable at `/usr/local/bin/msgme`.
If this is not the case, edit `msgme.service` to reflect the appropriate
paths.

Install using `npm -g install .`

Copy `msgme.socket` and `msgme.service` to `~/.config/systemd/user/` and
start and enable the msgme service using

    service msgme.socket enable --user
    service msgme.service enable --user

    service msgme.socket start  --user
    service msgme.service start  --user
