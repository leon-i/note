package db

import (
	"fmt"
	"strconv"

	"github.com/leon-i/note/config"
	"github.com/leon-i/note/models"
	"github.com/leon-i/note/util"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DBConn *gorm.DB

func Connect() {
	p := config.Setup("DB_PORT")
	port, err := strconv.ParseUint(p, 10, 32)

	if err != nil {
		fmt.Println("Error parsing str to int")
	}

	dsn := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable",
		config.Setup("DB_HOST"), port, config.Setup("DB_USER"), config.Setup("DB_PASSWORD"), config.Setup("DB_NAME"))

	DBConn, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		panic("failed to connect database")
	}

	util.ConnectToAWS()

	DBConn.Migrator().DropTable(&models.User{})
	DBConn.Migrator().DropTable(&models.Notepad{})
	DBConn.Migrator().DropTable(&models.Post{})
	DBConn.Migrator().DropTable(&models.Comment{})
	DBConn.Migrator().DropTable("comment_replies")

	DBConn.AutoMigrate(&models.User{},
		&models.Notepad{},
		&models.Post{},
		&models.Comment{})

	Seed()

	fmt.Println("Connection Opened to Database")
	fmt.Println("Database Migrated")
}

func Seed() {
	fmt.Println("Seeding start...")

	pw, err := util.HashPassword("password")
	fmt.Println(err)

	bob := &models.User{Username: "bobuser", Email: "bob@email.com", Password: pw}
	joe := &models.User{Username: "joeuser", Email: "joe@email.com", Password: pw}
	jim := &models.User{Username: "jimuser", Email: "jim@email.com", Password: pw}
	fred := &models.User{Username: "freduser", Email: "fred@email.com", Password: pw}
	DBConn.Create(&bob)
	DBConn.Create(&joe)
	DBConn.Create(&jim)
	DBConn.Create(&fred)

	general := &models.Notepad{Name: "General", Description: "Talk about anything!"}
	music := &models.Notepad{Name: "Music", Description: "Talk about music!"}
	sports := &models.Notepad{Name: "Sports", Description: "Talk about sports!"}
	games := &models.Notepad{Name: "Games", Description: "Talk about games!"}
	tv := &models.Notepad{Name: "Television", Description: "Talk about TV!"}
	movies := &models.Notepad{Name: "Movies", Description: "Talk about movies!"}
	politics := &models.Notepad{Name: "Politics", Description: "Talk about politics!"}
	memes := &models.Notepad{Name: "Memes", Description: "Talk about memes!"}
	DBConn.Create(general)
	DBConn.Create(&music)
	DBConn.Create(&sports)
	DBConn.Create(&games)
	DBConn.Create(&tv)
	DBConn.Create(&movies)
	DBConn.Create(&politics)
	DBConn.Create(&memes)

	post1 := &models.Post{Title: "I like dogs", Content: "Anyone else also like dogs", UserID: bob.ID, NotepadID: general.ID}
	post2 := &models.Post{Title: "I like cats", Content: "Anyone else also like cats", UserID: joe.ID, NotepadID: general.ID}
	post3 := &models.Post{Title: "I like Pop", Content: "Anyone else also like pop music", UserID: jim.ID, NotepadID: music.ID}
	post4 := &models.Post{Title: "I like Rock", Content: "Anyone else also like rock music", UserID: fred.ID, NotepadID: music.ID}
	post5 := &models.Post{Title: "I like Football", Content: "Anyone else also like football", UserID: bob.ID, NotepadID: sports.ID}
	post6 := &models.Post{Title: "I like Soccer", Content: "Anyone else also like soccer", UserID: joe.ID, NotepadID: sports.ID}
	post7 := &models.Post{Title: "I like Hearthstone", Content: "Anyone else also like Hearthstone", UserID: jim.ID, NotepadID: games.ID}
	post8 := &models.Post{Title: "I like CS:GO", Content: "Anyone else also like CS:GO", UserID: fred.ID, NotepadID: games.ID}
	post9 := &models.Post{Title: "I like Stranger Things", Content: "Anyone else also like Stranger Things", UserID: bob.ID, NotepadID: tv.ID}
	post10 := &models.Post{Title: "I like The Simpsons", Content: "Anyone else also like The Simpsons", UserID: joe.ID, NotepadID: tv.ID}
	post11 := &models.Post{Title: "I like Frozen", Content: "Anyone else also like Frozen", UserID: jim.ID, NotepadID: movies.ID}
	post12 := &models.Post{Title: "I like Super 8", Content: "Anyone else also like Super 8", UserID: fred.ID, NotepadID: movies.ID}
	post13 := &models.Post{Title: "I like Candidate 1", Content: "Anyone else also like Candidate 1", UserID: bob.ID, NotepadID: politics.ID}
	post14 := &models.Post{Title: "I like Super 8", Content: "Anyone else also like Super 8", UserID: joe.ID, NotepadID: politics.ID}
	post15 := &models.Post{Title: "I like Meme 1", Content: "Anyone else also like Meme 1", UserID: jim.ID, NotepadID: memes.ID}
	post16 := &models.Post{Title: "I like Meme 2", Content: "Anyone else also like Meme 2", UserID: fred.ID, NotepadID: memes.ID}
	DBConn.Create(&post1)
	DBConn.Create(&post2)
	DBConn.Create(&post3)
	DBConn.Create(&post4)
	DBConn.Create(&post5)
	DBConn.Create(&post6)
	DBConn.Create(&post7)
	DBConn.Create(&post8)
	DBConn.Create(&post9)
	DBConn.Create(&post10)
	DBConn.Create(&post11)
	DBConn.Create(&post12)
	DBConn.Create(&post13)
	DBConn.Create(&post14)
	DBConn.Create(&post15)
	DBConn.Create(&post16)

	comment1 := &models.Comment{Content: "I am a comment 1", UserID: bob.ID, PostID: post1.ID}
	comment2 := &models.Comment{Content: "I am a comment 2", UserID: joe.ID, PostID: post2.ID}
	DBConn.Create(&comment1)
	DBConn.Create(&comment2)

	fmt.Println("Seeding end...")
}

func Close() {
	gen, err := DBConn.DB()

	if err != nil {
		fmt.Println("Database failed to close")
		return
	}

	fmt.Println("Database closing")
	gen.Close()
}
