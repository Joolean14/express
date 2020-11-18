//imports
const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path'); //modulo de path de node.js

//inicializaciones
const app = express();


//settings
app.set('port', process.env.PORT || 4000); //conf del puerto


//handlebar settings
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir:path.join(app.get('views'),'layouts'),
    //definicion de los directorios
     partialsDir:path.join(app.get('views'),'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')//archivo de configuración crear handlebars.js
}));
app.set('view engine', '.hbs');


//middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false })); //parametro que indica que solo se reciben strings sin imagenes

//routes
//esta se encarga de aclarar que todo request siempre pasa por aqui y continua
 //y para generar variables que se pueden acceder desde cualquier parte
 //para que no termne el request aqui si no que siga
 app.use((req,res,next)=>{ next();});

app.use(require('./routes/index.js'));
app.use(require('./routes/authentication.js'));
app.use( '/store', require('./routes/store.js'));
app.use( '/clientes', require('./routes/clientes.js'));
app.use( '/inventarios', require('./routes/inventarios.js'));
app.use( '/productos' , require('./routes/productos.js'));
   
//public
app.use(express.static(path.join(__dirname, 'public'))); //carpeta pública con css y html estático


//server
app.listen(app.get('port'), () => {
    console.log('Servidor en puerto: ', app.get('port'));
});