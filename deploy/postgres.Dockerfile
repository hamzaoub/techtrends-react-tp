FROM postgres:16-alpine
COPY deploy/init.sql /docker-entrypoint-initdb.d/01-schema.sql
