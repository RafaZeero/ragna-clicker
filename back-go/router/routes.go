package router

import (
	"github.com/RafaZeero/ragna-clicker/handler"
	"github.com/gin-gonic/gin"
)

func InitializeRoutes(r *gin.Engine) {
	api := r.Group("/api")
	{
		api.GET("/monsters/:id", handler.GetMonsterByID)
	}
}
