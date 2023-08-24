package router

import (
	"os"

	"github.com/gin-gonic/gin"
)

func Initialize() {
	// Define port
	port := os.Getenv("PORT")
	if port == "" {
		port = "3000"
	}
	// Initialize Router
	r := gin.Default()

	// Initialize Routes
	InitializeRoutes(r)

	// Run server
	r.Run(":" + port)
}
