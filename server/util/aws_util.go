package util

import (
	"bytes"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
	"github.com/leon-i/note/config"
	"github.com/rs/xid"
	"log"
	"mime/multipart"
	"net/http"
	"path/filepath"
)

var s3Session *session.Session

func HandleFileUpload(file multipart.File, fileHeader *multipart.FileHeader) (string, error) {
	size := fileHeader.Size
	buffer := make([]byte, size)
	if _, err := file.Read(buffer); err != nil {
		log.Fatal(err)
	}

	fileKey := "images/" + xid.New().String() + filepath.Ext(fileHeader.Filename)

	 _, err := s3.New(s3Session).PutObject(&s3.PutObjectInput{
		Bucket: aws.String("note-app-dev"),
		Key:	aws.String(fileKey),
		Body:	bytes.NewReader(buffer),
		ContentLength: aws.Int64(int64(size)),
		ContentType: aws.String(http.DetectContentType(buffer)),
	})

	return config.Setup("AWS_BUCKET_URL") + fileKey, err
}

func ConnectToAWS () {
	sess, err := session.NewSession(&aws.Config{
		Region: aws.String("us-east-1"),
		Credentials: credentials.NewStaticCredentials(
			config.Setup("AWS_ID"),     // id
			config.Setup("AWS_SECRET"), // secret
			""),                         // token can be left blank for now
	})

	if err != nil {
		panic(err)
	}

	s3Session = sess
}
