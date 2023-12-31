const express = require('express');
const morgan = require('morgan');
require('dotenv').config();
const fileUpload = require('express-fileupload');
const cors = require('cors');
const path = require('path');

// Creamos el servidor
const app = express();

// Middleware para cors
app.use(cors());

// Deserializamos el body en formato raw
app.use(express.json());

// Middleware de Morgan para obtener más información sobre cada una de las peticiones
app.use(morgan('dev'));

// Middleware para leer el body en formato form-data (para leer archivos e imágenes)
// instalación -> npm i express-fileupload
app.use(fileUpload());

app.use('/photos', express.static('./static/photos'));
app.use('/avatar', express.static('./static/avatar'));

/* 
    ###################
    ### Middlewares ###
    ###################
*/

const isAuth = require('./middlewares/isAuth');

/* 
    #################################
    ### Controladores de Usuarios ###
    #################################
*/
const newUser = require('./controllers/users/newUser');
const loginUser = require('./controllers/users/login');
const validateUser = require('./controllers/users/validateUser');
const getProfile = require('./controllers/users/getProfile');
const getMyProfile = require('./controllers/users/getMyProfile');
const addAvatar = require('./controllers/users/addAvatar');

/* 
    ##########################
    ### Endpoints Usuarios ###
    ##########################
*/

app.post('/newUser', newUser);
app.post('/login', loginUser);
app.get('/validate/:registrationCode', validateUser);
app.get('/profile/:idUser', getProfile);
app.get('/profile/', isAuth, getMyProfile);
app.post('/addAvatar', isAuth, addAvatar);

/* 
    ##################################
    ##### Controladores de fotos #####
    ##################################
*/

const addPhoto = require('./controllers/posts/addPhoto');
const deletePhoto = require('./controllers/posts/deletePhoto');
const getPhotos = require('./controllers/posts/getPhotos');

/* 
    ##############################
    ##### Endpoints de fotos #####
    ##############################
*/

app.post('/addPhoto', isAuth, addPhoto);

app.delete('/deletePhoto', isAuth, deletePhoto);
app.get('/photos', getPhotos);

/* 
    ##############################
    ### Controladores de likes ###
    ##############################
*/

const addFavPhoto = require('./controllers/favs/addFav');
const deleteFavPhoto = require('./controllers/favs/deleteFav');

/* 
    ##########################
    ### Endpoints de likes ###
    ##########################
*/

app.post('/favs/:idPhoto/like', isAuth, addFavPhoto);
app.delete('/favs/:idPhoto/unlike', isAuth, deleteFavPhoto);

/* 
    ####################################
    ### Controladores de comentarios ###
    ####################################
*/

const addComment = require('./controllers/posts/addComment');
const deleteComment = require('./controllers/posts/deleteComment');

/* 
    ################################
    ### Endpoints de comentarios ###
    ################################
*/

app.post('/posts/:idPhoto/comment', isAuth, addComment);
app.delete('/posts/:idPhoto/uncomment', isAuth, deleteComment);

// Middleware de Error
app.use((error, req, res, _) => {
    console.error(error);

    res.status(error.httpStatus || 500);

    res.send({
        status: 'Error',
        message: error.message,
    });
});

// Middleware de Not Found
app.use((req, res) => {
    res.status(404);

    res.send({
        status: 'Error',
        message: 'Not found',
    });
});

// app.use('/public', express.static(path.join(__dirname, 'public')));

app.listen(process.env.PORT, () => {
    console.log(`Server listening at http://localhost:${process.env.PORT}`);
});
