package main

import (
	"database/sql"

	// "github.com/RafaZeero/ragna-clicker/router"

	_ "github.com/go-sql-driver/mysql"
)

func exec(db *sql.DB, sql string) sql.Result {
	result, err := db.Exec(sql)
	if err != nil {
		panic(err)
	}

	return result
}

func main() {
	// Init server
	// router.Initialize()

	db, err := sql.Open("mysql", "root:password@tcp(localhost:3306)/")
	if err != nil {
		panic(err)
	}

	defer db.Close()

	exec(db, "create database if not exists testando1234")
	exec(db, "use testando1234")
	exec(db, "drop table if exists usuarios")
	exec(db, `create table usuarios (
		id integer auto_increment,
		nome varchar(80),
		PRIMARY KEY (id)
	)`)
}
