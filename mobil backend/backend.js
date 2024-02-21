const express = require('express')
var cors = require('cors')
var mysql=mysql = require('mysql')
const multer = require('multer');
const bodyParser = require('body-parser');


const app = express()
const port = 22003

app.use(cors())
app.use(express.json())
app.use(express.static('kepek'))
app.use(bodyParser.json());


var connection;

function kapcsolat(){
    
     connection = mysql.createConnection({
        host: '192.168.100.103',
        user: 'u71_CEC3VCKm5g',
        password: 'NoOG+!kLVjr@L0TsyZvvQtcl',
        database: 's71_db'
    })

    connection.connect()
}


app.get('/', (req, res) => {
  res.send('Hello World!')
})



/*---------Összes alkatrész kiíratása--Zsombi---------*/

app.get('/osszesAlkatresz', (req, res) => {
    
  kapcsolat()

    connection.query('SELECT * FROM alkatreszek', (err, rows, fields) => {
    if (err) throw err

        console.log(rows)
        res.send(rows)
    })



    connection.end()
})


/*---------Összes pc alkatrész kiíratása--Zsombi---------*/

app.get('/pcAlkatresz', (req, res) => {
    
  kapcsolat()

    connection.query('SELECT * FROM alkatreszek WHERE alkatresz_eszkozid=1', (err, rows, fields) => {
    if (err) throw err

        console.log(rows)
        res.send(rows)
    })



    connection.end()
})


/*---------Összes pc jatek kiíratása--Lali---------*/

app.get('/PcJatekok', (req, res) => {
    
  kapcsolat()

    connection.query('SELECT * FROM jatekok WHERE jatekok_eszkozid=1', (err, rows, fields) => {
    if (err) throw err

        console.log(rows)
        res.send(rows)
    })



    connection.end()
})


/*---------Összes Nintendo kiíratása--Lali---------*/

app.get('/Nintendotart', (req, res) => {
    
  kapcsolat()

    connection.query('SELECT * FROM alkatreszek WHERE alkatresz_eszkozid=2', (err, rows, fields) => {
    if (err) throw err

        console.log(rows)
        res.send(rows)
    })



    connection.end()
})


/*---------Összes Ninetndo jatek kiíratása--Lali---------*/

app.get('/NintendoJatekok', (req, res) => {
    
  kapcsolat()

    connection.query('SELECT * FROM jatekok WHERE jatekok_eszkozid=2', (err, rows, fields) => {
    if (err) throw err

        console.log(rows)
        res.send(rows)
    })



    connection.end()
})


/*---------Összes playstation kiíratása--Lali---------*/

app.get('/Playstationtart', (req, res) => {
    
  kapcsolat()

    connection.query('SELECT * FROM alkatreszek WHERE alkatresz_eszkozid=3', (err, rows, fields) => {
    if (err) throw err

        console.log(rows)
        res.send(rows)
    })



    connection.end()
})

/*---------Összes playstation jatek kiíratása--Lali---------*/

app.get('/PlaystationJatekok', (req, res) => {
    
  kapcsolat()

    connection.query('SELECT * FROM jatekok WHERE jatekok_eszkozid=3', (err, rows, fields) => {
    if (err) throw err

        console.log(rows)
        res.send(rows)
    })



    connection.end()
})

/*---------Összes Xbox kiíratása--Lali---------*/

app.get('/Xboxtart', (req, res) => {
    
  kapcsolat()

    connection.query('SELECT * FROM alkatreszek WHERE alkatresz_eszkozid=4', (err, rows, fields) => {
    if (err) throw err

        console.log(rows)
        res.send(rows)
    })



    connection.end()
})

/*---------Összes xbox jatek kiíratása--Lali---------*/

app.get('/XboxJatekok', (req, res) => {
    
  kapcsolat()

    connection.query('SELECT * FROM jatekok WHERE jatekok_eszkozid=4', (err, rows, fields) => {
    if (err) throw err

        console.log(rows)
        res.send(rows)
    })



    connection.end()
})


/*---------Összes hasznalt kiíratása--Zsombi---------*/

app.get('/Hasznalttart', (req, res) => {
    
  kapcsolat()

    connection.query('SELECT * FROM hasznalttermekek', (err, rows, fields) => {
    if (err) throw err

        console.log(rows)
        res.send(rows)
    })



    connection.end()
})


/*---------Renddelés leadása, feltöltése a táblába--Zsombi---------*/

app.post('/rendeles', (req, res) => {
    
  kapcsolat()

    connection.query(`INSERT INTO rendeles VALUES(NULL, '${req.body.nev}','${req.body.email}','${req.body.telefonszam}','${req.body.datum}',${req.body.osszar})`, (err, rows, fields) => {
    if (err) {
    console.log('Hiba',err)
    }
        else{
		console.log(req.body.nev)
        console.log(req.body.email)
        console.log(req.body.telefonszam)
        console.log('Sikeres feltöltés')
            }
        res.send(rows)
    })



    connection.end()
})



/*---------Összes eszköz kiíratása--Zsombi---------*/

app.get('/eszkozok', (req, res) => {
    
  kapcsolat()

    connection.query('SELECT * FROM eszkozok', (err, rows, fields) => {
    if (err) throw err

        console.log(rows)
        res.send(rows)
    })



    connection.end()
})
//----Comment lekerdez--Lali-------------

app.get('/Comment', (req, res) => {
    
  kapcsolat()

    connection.query('SELECT * FROM comment ORDER BY comment.Comment_id DESC', (err, rows, fields) => {
    if (err) throw err

        console.log(rows)
        res.send(rows)
    })
 


    connection.end()
})

//--------- comment feltöltés-Lali----------
app.post('/CommentFeltoltes', (req, res) => {

  kapcsolat()
  connection.query(`INSERT INTO comment VALUES (NULL, '${req.body.nev}', '${req.body.comment}' , '${req.body.datum}' )`, (err, rows, fields) => {
    if (err) {
      console.log("Hiba")
        console.log(req.bod.nev)
        console.log(req.bod.comment)
        console.log(req.bod.datum)
      res.send("Hiba")
    }
    else {
      console.log("Sikeres felvitel")
      res.send("Sikeres felvitel")
    }

  })
  connection.end()
});


/*---------Szöveg keresése--Zsombi---------*/
//SELECT * FROM alkatreszek INNER JOIN komponens ON alkatresz_komponensid=komponens_id WHERE komponens_nev LIKE "%${req.body.bevitel1}%"
app.post('/keresszoveg', (req, res) => {
  kapcsolat()
  
  connection.query(`SELECT * FROM alkatreszek INNER JOIN komponens ON alkatresz_komponensid=komponens_id WHERE komponens_id = ${req.body.bevitel1}`, (err, rows, fields) => {
  if (err) {
    console.log("Hiba")
  }
  else{
    console.log(rows)
    res.send(rows)
  }
  
  })
  connection.end() 
  })


/*---------Vélemény keresése--Lali---------*/
//SELECT * FROM alkatreszek INNER JOIN komponens ON alkatresz_komponensid=komponens_id WHERE komponens_nev LIKE "%${req.body.bevitel1}%"
app.post('/velemeny', (req, res) => {
  kapcsolat()
  
  connection.query(`SELECT * FROM velemeny INNER JOIN jatekok ON velemeny.velemeny_id=jatekok.jatekok_id WHERE jatekok_trailer='${req.body.trailer}';`, (err, rows, fields) => {
  if (err) {
    console.log("Hiba")
      
  }
  else{
    console.log(rows)
      console.log(req.body.trailer)
    res.send(rows)
  }
  
  })
  connection.end() 
  })

//--------- vélemény feltöltés-Lali----------
app.post('/VelemenyFeltoltes', (req, res) => {
  kapcsolat();

  connection.query(
    `INSERT INTO velemeny VALUES (NULL, '${req.body.id}', '${req.body.nev}', '${req.body.comment}' , '${req.body.datum}');`,
    (err, rows, fields) => {
      if (err) {
        console.log("Hiba");
        console.log(req.body.id);
        console.log(req.body.nev);
        console.log(req.body.comment);
        console.log(req.body.datum);
        res.send("Hiba");
      } else {
        console.log("Sikeres felvitel");
        res.send("Sikeres felvitel");
      }

      // Itt zárjuk le a kapcsolatot, csak a lekérdezés után
      connection.end();
    }
  );
});

//----------Kép feltöltés--Közös---------------------------
const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, './kepek');
  },
  filename(req, file, callback) {
    callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
  },
});


const upload = multer({ storage });

app.get('/', (req, res) => {
  res.status(200).send('You can post to /api/upload.');
});

app.post('/api/upload', upload.array('photo', 3), (req, res) => {
  console.log('file', req.files);
  console.log('body', req.body);

    
//---------------------adatb-be való felvitel
kapcsolat()
  
connection.query(`INSERT INTO hasznalttermekek VALUES (NULL, '${req.body.bevitel1}', '${req.body.datum}', '${req.body.bevitel2}', '${req.body.bevitel3}' , ${req.body.bevitel4}, '${req.files[0].filename}', 2, ${req.body.bevitel5});`, (err, rows, fields) => {
if (err){
  console.log("Hiba",err)
    
    console.log(req.body.bevitel1)
    console.log(req.body.bevitel2)
    console.log(req.body.bevitel3)
    console.log(req.body.bevitel4)
    console.log(req.body.bevitel5)
    
  res.send("Hiba")
}
else{
  console.log("Sikeres felvitel")
  res.send("Sikeres felvitel")
}

})
connection.end() 
//-----vege---------------
});


//INSERT INTO alkatreszek VALUES (NULL, 'alma', '2023-12-21', 10, 450000000, 'a.jpg', 2, 2);


//------------------------- insert into

// app.post('/felvitelalkatresz', (req, res) => {
//   kapcsolat()
  
//   connection.query(`INSERT INTO alkatreszek VALUES (NULL,'${req.body.bevitel1}', '${req.body.bevitel2}', ${req.body.bevitel3}, ${req.body.bevitel4}, '${req.body.bevitel5}', ${req.body.bevitel6}, ${req.body.bevitel7} )`, (err, rows, fields) => {
//   if (err){
//     console.log("Hiba")
//     res.send("Hiba")
//   }
//   else{
//     console.log("Sikeres felvitel")
//     res.send("Sikeres felvitel")
//   }
  
  
//   })
//   connection.end() 
//   })

//---------------------------------seged tabla lekerdez--Zsombi-------------
app.get('/KomponensSeged', (req, res) => {
    
  kapcsolat()

    connection.query('SELECT * FROM komponens', (err, rows, fields) => {
    if (err) throw err

        console.log(rows)
        res.send(rows)
    })



    connection.end()
})

//-----------------------alkatresz seged--Lali
app.get('/EszkozokSeged', (req, res) => {
    
  kapcsolat()

    connection.query('SELECT * FROM eszkozok', (err, rows, fields) => {
    if (err) throw err

        console.log(rows)
        res.send(rows)
    })



    connection.end()
})




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})