const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { spawn } = require('child_process');
//connexion to database

mongoose.connect('mongodb://127.0.0.1:27017/Forum').then((x) => {
  console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
})
.catch((err) => {
  console.error('Error connecting to mongo', err.reason)
})
;
const app = express();

app.use(cors())

// Serve static resources
app.use('/public', express.static('public'))

// Define PORT
//changement de port pour tester
const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log('Connected to port ' + port)
})


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// Security configuration
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, Accept, Content-Type, X-Requested-with, Authorization, expiresIn"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, DELETE, OPTIONS, PATCH, PUT"
    );
    next();
  });


app.use(express.json());


// Route qui exécute le script Python
app.get('/run_python_script', (req, res) => {
  // Remplacez 'script.py' par le chemin de votre script Python
  const pythonProcess = spawn('python', ['./python/Projet.py']);

  pythonProcess.stdout.on('data', (data) => {
      // Récupérer les données standard (output) du script
      console.log(`stdout: ${data}`);
  });

  pythonProcess.stderr.on('data', (data) => {
      // Récupérer les erreurs du script
      console.error(`stderr: ${data}`);
  });

  pythonProcess.on('close', (code) => {
      // Code exécuté après la fin du script
      console.log(`Le processus de script Python s'est terminé avec le code: ${code}`);
      // Envoyer une réponse au client
      res.send('Script Python exécuté avec succès.');
  });
});




app.post('/search_similar_questions', (req, res) => {
  const userQuestion = req.body.question;

  const pythonProcess = spawn('python', ['./python/Projet.py']);

  let pythonOutput = '';

  // Envoyer la question au script Python
  pythonProcess.stdin.write(userQuestion);
  pythonProcess.stdin.end();

  pythonProcess.stdout.on('data', (data) => {
      pythonOutput += data.toString();
  });

  pythonProcess.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
  });

  pythonProcess.on('close', (code) => {
      console.log(`Script exited with code ${code}`);
      if (code === 0) {
          try {
              const nlpResult = JSON.parse(pythonOutput);
              res.json(nlpResult);
          } catch (error) {
              res.status(500).send('Erreur lors de l\'analyse de la sortie du script Python.');
          }
      } else {
          res.status(500).send('Erreur lors de l\'exécution du script Python.');
      }
  });
});

// Import Routes
const userRoutes = require('../backend/routes/user_route')
const resRoute = require('./routes/response_route')
const quesRoute = require('./routes/question_route');

app.use("/users", userRoutes);
app.use("/question",quesRoute);
app.use("/response", resRoute);

module.exports = app;


// app.post('/run-python', (req, res) => {
//   const data = req.body;
//    // Construisez les arguments à passer au script Python si nécessaire.
//     // Par exemple, si le script attend des données JSON, vous pouvez les convertir en chaîne.
//     const args = [JSON.stringify(data)];
//     // Spécifiez le chemin vers votre script Python
//     const scriptPath = 'C:/Users/ASUS/Jupyter/Projet.ipynb';

//     execFile('python3', [scriptPath, ...args], (err, stdout, stderr) => {
//       if (err) {
//           // Gérer l'erreur ici - cela peut être une erreur de script Python,
//           // une erreur liée au fait que Python n'est pas trouvé, etc.
//           console.error('Erreur lors de l’exécution du script Python:', stderr);
//           return res.status(500).send(stderr);
//       }
//       // Stdout du script Python sera envoyée en tant que réponse au client
//       res.send(stdout);
//       res.send('Python script output');
//   });

//   // Ici, vous traiteriez la requête et peut-être appeliez un script Python


// });

// eli yemshi
// app.post('/run-notebook', (req, res) => {
//   // Spécifiez le chemin vers votre notebook
//   const notebookPath = 'C:/Users/ASUS/Jupyter/Projet.ipynb';
//   const outputPath = 'C:/Users/ASUS/Jupyter/Projet.ipynb';

//   // Commande pour exécuter le notebook
//   const command = `jupyter nbconvert --to notebook --execute ${notebookPath} --output ${outputPath}`;

//   exec(command, (err, stdout, stderr) => {
//       if (err) {
//           // Gérer l'erreur ici - cela peut être une erreur du notebook, une erreur liée à nbconvert, etc.
//           console.error('Erreur lors de l’exécution du notebook:', stderr);
//           return res.status(500).send(stderr);
//       }
//       // Renvoyer un succès ou potentiellement le résultat du notebook ici.
//       // Pour de meilleurs résultats, vous pourriez vouloir lire le notebook de sortie
//       // et renvoyer certains résultats précis au client, plutôt que tout le fichier.
//       res.send(stdout);
//       console.log('Python script output');
//   });
// });
// app.post('/search-questions', (req, res) => {
//   const searchQuery = req.body.query; // La question à rechercher

//   // Sécurité : assurez-vous de nettoyer la requête pour prévenir les injections SQL
//   // ...

//   // Spécifiez le chemin et les arguments pour le script Python généré depuis votre Jupyter Notebook
//   const scriptPath = 'C:/Users/ASUS/Projet.py';
//   const args = ['--search-query', searchQuery];

//   execFile('python3', [scriptPath, ...args], (err, stdout, stderr) => {
//       if (err) {
//           console.error('Erreur lors de l’exécution du script Python:', stderr);
//           return res.status(500).send(stderr);
//       }
//       // Renvoyer le résultat de la recherche
//       res.send(stdout);
//       console.log('Python script output11');
//   });
// });
// app.post('/run-python', (req, res) => {
//   // Spécifiez le chemin vers votre script Python
//   const scriptPath = 'C:/Users/ASUS/Projet.py';

//   // Commande pour exécuter le script Python
//   const command = `python ${scriptPath}`;

//   exec(command, (err, stdout, stderr) => {
//       if (err) {
//           // Gérer l'erreur ici - cela peut être une erreur liée au script Python
//           console.error('Erreur lors de l’exécution du script Python :', stderr);
//           return res.status(500).send(stderr);
//       }
//       // Renvoyer la sortie du script Python
//       res.send(stdout);
//       console.log('Résultat du script Python :');
//   });
// });
