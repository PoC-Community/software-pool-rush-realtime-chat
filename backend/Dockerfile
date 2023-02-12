FROM golang:alpine

EXPOSE 8080

WORKDIR /app

COPY . .

RUN cd /app && go mod tidy && go build -o ./app

ENTRYPOINT ["/app/app"]