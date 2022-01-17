package handler

import (
	"kuda-ftp/client"
	"net/http"

	"github.com/gin-gonic/gin"
)

func FtpAuth(c *gin.Context) {
	token := c.GetHeader("Authorization")
	conn, err := client.CheckConnection(token)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusUnauthorized, M{
			Message: err.Error(),
		})
		return
	}
	c.Set("connection", conn)
	c.Next()
}
