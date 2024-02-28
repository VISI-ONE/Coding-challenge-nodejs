FROM ubuntu:22.04
COPY . .
RUN make init-db
CMD make start
