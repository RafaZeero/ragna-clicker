package handler

import (
	"encoding/base64"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"path/filepath"

	"github.com/gin-gonic/gin"
)

func GetMonsterByID(ctx *gin.Context) {
	// Monster Id from params
	monsterID := ctx.Params.ByName("id")

	// Get image from file
	monsterImage, _ := imageFromFile(monsterID)

	if monsterImage != "" {
		ctx.JSON(http.StatusOK, gin.H{"Image": monsterImage})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "Monster not found"})
	// if (!monsterImage) {
	//   return res.status(404).json({ response: 'Image not found' });
	// }

	// // connect to DB
	// const connection = await DB();

	// // Get data from DB
	// const rawMonsterQuery = await connection.query(getOneMonster(+monsterID.value));
	// const rawMonsterData = (rawMonsterQuery[0] as any)[0] as MonsterRequest;

	// /** Validate Monster Data */
	// if (isEmpty(rawMonsterData)) {
	//   return res.status(404).json({ response: 'Monster Data not found' });
	// }

	// // Parse monster data
	// const monsterData = mapMonsterData(rawMonsterData, +monsterID.value);

	// // Send file back to front
	// return res.status(200).json({
	//   response: {
	//     /** Monster image string */
	//     monsterImage,
	//     /** Monster data object */
	//     monsterData
	//   }
	// });
}

// Initialize monsterImagesPath
var dir, _ = os.Getwd()
var monsterImagesPath = filepath.Join(dir, `/images/monsters`)

func checkImageExists(file string) bool {
	_, err := os.Stat(filepath.Join(monsterImagesPath, file+".png"))
	fmt.Printf("Dir: %s, imagePath: %s", dir, monsterImagesPath)
	return err == nil
}

func imageFromFile(file string) (string, error) {
	if checkImageExists(file) {
		data, err := ioutil.ReadFile(filepath.Join(monsterImagesPath, file+".png"))
		if err != nil {
			// Handle error
			return "", err
		}
		return "data:image/png;base64," + base64.StdEncoding.EncodeToString(data), nil
	}

	data, err := ioutil.ReadFile(filepath.Join(monsterImagesPath, "not-found.png"))
	if err != nil {
		// Handle error
		return "", err
	}
	return "data:image/png;base64," + base64.StdEncoding.EncodeToString(data), nil
}
