BEGIN TRANSACTION;

INSERT into users (name, email, entries, joined) values ('hatem', 'hatem@gmail.com', 5, '2022-01-01');
INSERT into login (hash, email) values ('$2a$12$qRMHBqxUH00asA2eL.CZCOTYX5ymxy5Gw3wRQ000p0DG0dsAnoCAO', 'hatem@gmail.com');

COMMIT;