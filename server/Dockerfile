FROM golang:latest AS builder
ADD . /app
WORKDIR /app/server
RUN go mod download
EXPOSE 5000