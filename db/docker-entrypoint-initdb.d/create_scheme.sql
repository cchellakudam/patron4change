-- connect to database
\connect patron4change

-- table to track database schema changes
CREATE TABLE IF NOT EXISTS schema_changes(
        id SERIAL PRIMARY KEY NOT NULL,
        major_release VARCHAR(2) NOT NULL,
        minor_release VARCHAR(4) NOT NULL,
        script_name VARCHAR(50) NOT NULL,
        date_applied TIMESTAMP NOT NULL
);


-- new baseline version inserts should be added here with each new merge of the baseline script
INSERT INTO schema_changes VALUES (DEFAULT, '01', '0000', 'init script', CURRENT_TIMESTAMP);
