const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('.'));
app.use('/uploads', express.static('upload_images'));

const uploadDir = './upload_images';
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, uploadDir);
    },
    filename: function (req, file, cb){
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random()*1E9);
        cb(null, 'image-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 //5MB
    },
    fileFilter: function (req, file, cb){
        if (file.mimetype.startsWith('image/')){
            cb(null, true);
        } 
        else{
            cb(new Error('Only image files are allowed!'), false);
        }
    }
});

//routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/upload', upload.array('images', 10), (req, res) => {
    try {
        if (!req.files || req.files.length === 0){
            console.log('No files in request');
            return res.status(400).json({ error: 'No files uploaded' });
        }
        const filenames = req.files.map(file => {
           return file.filename;
        });
        
        res.json({
            message: 'Files uploaded successfully',
            files: filenames,
            count: filenames.length
        });
    } catch (error) {
        res.status(500).json({ error: 'Upload failed: ' + error.message });
    }
});

app.use((error, req, res, next) => {
    if (error instanceof multer.MulterError){
        if (error.code === 'LIMIT_FILE_SIZE'){
            return res.status(400).json({ error: 'File too large (max 5MB)' });
        }
        if (error.code === 'LIMIT_FILE_COUNT'){
            return res.status(400).json({ error: 'Too many files (max 10)' });
        }
    }
    
    if (error.message === 'Only image files are allowed!'){
        return res.status(400).json({ error: 'Only image files are allowed' });
    }
    
    console.error('Server error:', error);
    res.status(500).json({ error: 'Internal server error' });
});

// app.listen(PORT, () => {
//     console.log(`🚀 Click Fit server running on http://localhost:${PORT}`);
//     console.log(`📁 Upload directory: ${path.resolve(uploadDir)}`);
//     console.log('✅ Ready to accept image uploads!');
// });