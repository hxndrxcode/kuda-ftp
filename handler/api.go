package handler

import (
	"io"
	"net/http"
	"os"
	"path"
	"path/filepath"

	"github.com/gin-gonic/gin"
	"github.com/jlaffaye/ftp"
)

func List(c *gin.Context) {
	conn := c.MustGet("connection").(*ftp.ServerConn)
	reqPath := c.Query("path")

	entries, err := conn.List(reqPath)
	if err != nil {
		c.JSON(http.StatusBadRequest, M{
			Message: err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, M{
		Data: entries,
	})
}

func Upload(c *gin.Context) {
	file, err := c.FormFile("file")
	if err != nil {
		c.JSON(http.StatusBadRequest, M{
			Message: err.Error(),
		})
		return
	}

	filename := filepath.Base(file.Filename)
	uploaded := path.Join("temp", filename)
	if err := c.SaveUploadedFile(file, uploaded); err != nil {
		c.JSON(http.StatusBadRequest, M{
			Message: err.Error(),
		})
		return
	}

	fileUploaded, err := os.Open(uploaded)
	if err != nil {
		c.JSON(http.StatusBadRequest, M{
			Message: err.Error(),
		})
		return
	}

	reqPath := c.PostForm("path")
	remote := reqPath + "/" + filename
	conn := c.MustGet("connection").(*ftp.ServerConn)
	if err = conn.Stor(remote, fileUploaded); err != nil {
		c.JSON(http.StatusBadRequest, M{
			Message: err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, M{
		Message: "Success",
	})
}

func Download(c *gin.Context) {
	conn := c.MustGet("connection").(*ftp.ServerConn)
	reqFile := c.Query("filepath")
	received, err := conn.Retr(reqFile)
	if err != nil {
		c.JSON(http.StatusNotFound, M{
			Message: err.Error(),
		})
		return
	}

	filename := filepath.Base(reqFile)
	tempFile := path.Join("temp", filename)
	file, _ := os.Create(tempFile)

	_, err = io.Copy(file, received)
	if err != nil {
		c.JSON(http.StatusInternalServerError, M{
			Message: err.Error(),
		})
		return
	}

	received.Close()
	file.Close()
	c.File(tempFile)
}

func MkDir(c *gin.Context) {
	conn := c.MustGet("connection").(*ftp.ServerConn)
	reqPath := c.PostForm("path")

	err := conn.MakeDir(reqPath)
	if err != nil {
		c.JSON(http.StatusBadRequest, M{
			Message: err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, M{
		Message: "Sukses",
	})
}
