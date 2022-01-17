package client

import (
	"errors"
	"kuda-ftp/helper"
	"log"

	"github.com/jlaffaye/ftp"
)

type FTPInput struct {
	Host     string `json:"host" form:"host"`
	Username string `json:"username" form:"username"`
	Password string `json:"password" form:"password"`
	Port     string `json:"port" form:"port"`
}

var ftpConnection = map[string]*ftp.ServerConn{}

func InitClient(input FTPInput) (string, error) {
	var token string
	ftpClient, err := ftp.Dial(input.Host + ":" + input.Port)
	if err != nil {
		log.Println(err)
		return token, err
	}

	err = ftpClient.Login(input.Username, input.Password)
	if err != nil {
		return token, err
	}

	token = helper.Random(32)
	ftpConnection[token] = ftpClient
	return token, nil
}

func CheckConnection(token string) (*ftp.ServerConn, error) {
	var conn *ftp.ServerConn
	if token == "" {
		return conn, errors.New("token not provided")
	}
	conn, ok := ftpConnection[token]
	if !ok {
		return conn, errors.New("invalid token")
	}
	return conn, nil
}
