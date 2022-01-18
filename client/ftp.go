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

type Connection struct {
	Detail FTPInput
	Client *ftp.ServerConn
}

var ftpConnection = map[string]Connection{}

func InitClient(input FTPInput, token string) (string, error) {
	ftpClient, err := ftp.Dial(input.Host + ":" + input.Port)
	if err != nil {
		log.Println(err)
		return token, err
	}

	err = ftpClient.Login(input.Username, input.Password)
	if err != nil {
		return token, err
	}

	if token == "" {
		token = helper.Random(32)
	}
	ftpConnection[token] = Connection{
		Detail: input,
		Client: ftpClient,
	}
	return token, nil
}

func InitByToken(token string) error {
	if token == "" {
		return errors.New("token not provided")
	}
	getConn, ok := ftpConnection[token]
	if !ok {
		return errors.New("invalid token")
	}

	_, err := InitClient(getConn.Detail, token)
	return err
}

func CheckConnection(token string) (*ftp.ServerConn, error) {
	var conn *ftp.ServerConn
	if token == "" {
		return conn, errors.New("token not provided")
	}
	getConn, ok := ftpConnection[token]
	if !ok {
		return conn, errors.New("invalid token")
	}
	return getConn.Client, nil
}
