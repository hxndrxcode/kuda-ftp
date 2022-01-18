package handler

import (
	"kuda-ftp/client"
	"net/http"

	"github.com/gin-gonic/gin"
)

type M struct {
	Message string
	Data    interface{}
}

func Login(c *gin.Context) {
	input := client.FTPInput{}
	if err := c.Bind(&input); err != nil {
		c.JSON(http.StatusBadRequest, M{
			Message: err.Error(),
		})
		return
	}

	if input.Port == "" {
		input.Port = "21"
	}
	if input.Host == "" {
		c.JSON(http.StatusBadRequest, M{
			Message: "invalid host",
		})
		return
	}

	token, err := client.InitClient(input, "")
	if err != nil {
		c.JSON(http.StatusBadRequest, M{
			Message: err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, M{
		Data: token,
	})
}

func LoginByToken(c *gin.Context) {
	token := c.GetHeader("Authorization")
	err := client.InitByToken(token)
	if err != nil {
		c.JSON(http.StatusBadRequest, M{
			Message: err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, M{})
}
