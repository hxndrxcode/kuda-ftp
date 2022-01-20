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

func CORS(c *gin.Context) {
	c.Header("Access-Control-Allow-Origin", "*")
	c.Header("Access-Control-Allow-Credentials", "true")
	c.Header("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
	c.Header("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE")

	if c.Request.Method == "OPTIONS" {
		c.AbortWithStatus(204)
		return
	}

	c.Next()
}
