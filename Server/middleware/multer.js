const multer = require('multer')

// const upload = multer({
//  storage:multer.diskStorage({})
 
// })
const upload = multer({ dest: 'uploads/' })

module.exports = upload;