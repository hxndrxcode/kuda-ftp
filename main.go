package main

import (
	"kuda-ftp/handler"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.New()
	r.Use(gin.Recovery())

	auth := r.Group("/auth")
	auth.POST("/login", handler.Login)

	api := r.Group("/api")
	api.Use(handler.FtpAuth)
	{
		api.GET("/list", handler.List)
		api.POST("/upload", handler.Upload)
		api.POST("/download", handler.Download)
	}

	r.Run()
}
