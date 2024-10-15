import { unlink } from "fs";

const deleteFile = (filePath: string) => {
  unlink(filePath, (err) => {
    if(err){
      throw new Error('filed delete file!')
    }
  })
}

export {
  deleteFile
}