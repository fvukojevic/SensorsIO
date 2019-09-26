FROM golang:1.12.6-alpine3.10 AS build

EXPOSE 8081/tcp

# Install tools required to build the project
# We need to run `docker build --no-cache .` to update those dependencies
RUN apk add --no-cache git bash ca-certificates openssl wget mysql-client && update-ca-certificates
RUN go get github.com/go-sql-driver/mysql
RUN go get -u github.com/jinzhu/gorm
RUN go get -u github.com/gin-gonic/gin
RUN go get github.com/joho/godotenv

COPY ./Backend/* /go/src/project/

# Disable cgo so that binaries we build will be fully static.
ENV CGO_ENABLED=0

# Gopkg.toml and Gopkg.lock lists project dependencies
COPY docker/app/Gopkg.lock /go/src/project/
COPY docker/app/Gopkg.toml /go/src/project/

WORKDIR /go/src/project/

