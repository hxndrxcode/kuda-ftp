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

func Rename(c *gin.Context) {
	conn := c.MustGet("connection").(*ftp.ServerConn)
	reqPath := c.PostForm("path")
	from := reqPath + "/" + c.PostForm("from")
	to := reqPath + "/" + c.PostForm("to")

	err := conn.Rename(from, to)
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

func Delete(c *gin.Context) {
	conn := c.MustGet("connection").(*ftp.ServerConn)
	reqPath := c.PostForm("path")
	item := c.PostForm("item")
	itemType := c.PostForm("type")
	force := c.PostForm("force")

	var err error
	deletePath := reqPath + "/" + item
	if itemType == "0" {
		err = conn.Delete(deletePath)
	} else {
		if force == "1" {
			err = conn.RemoveDirRecur(deletePath)
		} else {
			err = conn.RemoveDir(deletePath)
		}
	}
	if err != nil {
		c.JSON(http.StatusBadRequest, M{
			Message: err.Error(),
		})
		return
	}

	conn.ChangeDir("/")
	c.JSON(http.StatusOK, M{
		Message: "Sukses",
	})
}
