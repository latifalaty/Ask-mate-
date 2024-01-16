const express = require('express')
const router = express.Router()
const querySchema = require('../models/Questions')
const responseSchema = require('../models/Responses')
const User = require('../models/Users');
const Notification = require('../models/Notification');


// Create a question
// router.post('/add-question', (req, res, next) => {
//   const newQuestion = new querySchema({
//     titre: req.body.titre,
//     contenu: req.body.contenu,
//     categorie: req.body.categorie
//   })
//   newQuestion.save()
//     .then((data) => {
//       res.status(200).json(
//         {
//           msg: "Question has been added succesfully to the database.",
//           data: data
//         }
//       )
//     })
//     .catch((error) => {
//       console.log("Error in creating the question", error)
//     })
//   // querySchema.create()

// })

router.post('/add-question', async (req, res, next) => {
  try {
    // ... (existing code)
    const newQuestion = new querySchema({
      titre: req.body.titre,
      contenu: req.body.contenu,
      categorie: req.body.categorie,
      userId: req.body.userId // Include userId in the question
    });
    const savedQuestion = await newQuestion.save();

    // Send back the entire savedQuestion document along with a message
    res.status(200).json({
      msg: 'Question has been added successfully to the database.',
      question: savedQuestion // This should include the userId if it's saved in the document
    });
  } catch (error) {
    console.log('Error in creating the question', error);
    res.status(500).json({ msg: 'Internal Server Error' });
  }
});




// Get All Questions
router.route('/get-question').get((req, res, next) => {
  querySchema.find().then(
    (data) => {
      res.status(200).json(data)
    })
    .catch((error) => {
      console.log('Error in getting questions', error)
    })
})




// Get Question By Id
router.route('/get-question/:id').get((req, res, next) => {

  querySchema.findById({ _id: req.params.id })
    .then((data) => {
      return res.status(200).json({ msg: data });
    })
    .catch((error) => {
      console.log('Error in getting the question by its Id : ', error)
    })

})

//Get Question By Category:
router.get('/:categorie', async (req, res) => {
  try {
    console.log("Here into get match by Category", req.params.categorie);
    const categorie = req.params.categorie;
    // Assume Question is your mongoose model
    const data = await querySchema.find({ categorie: categorie });
    res.status(200).json({ msg: data });
  } catch (error) {
    res.status(500).json({ msg: error.message }); // Send only the error message
    console.error('Error in getting the question by its Category:', error);
  }
});

// Update Question
router.route('/update-question/:id').put((req, res, next) => {
  querySchema.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body })
    .then((data) => {
      res.status(200).json({
        msg: "Question has been successfully updated ",
        data: data
      })
    })
    .catch((err) => {
      console.log("Error in updating the question", err);
    })
})


// Delete Question
router.route('/delete-question/:id').delete((req, res, next) => {
  querySchema.deleteOne({ _id: req.params.id })
    .then((data) => {
      res.status(200).json({
        msg: 'This Question has been deleted successfuly',
        data: data
      })
    })
    .catch((error) => {
      console.log('Error in deleting the question : ', error);
    })

})


// Sauvegarder une nouvelle question
// router.post('/questions', async (req, res) => {
//   const nouvelleQuestion = new querySchema({
//     titre: req.body.titre,
//     contenu: req.body.contenu,
//     categorie: req.body.categorie
//   });

//   try {
//     const questionEnregistree = await nouvelleQuestion.save();
//     res.status(201).json(questionEnregistree); 
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });


// Sauvegarder une nouvelle réponse pour une question spécifique
router.post('/questions/:questionId/reponses', async (req, res) => {
  const question = await querySchema.findById(req.params.questionId);
  if (!question) {
    return res.status(404).json({ message: 'Question introuvable.' });
  }

  const nouvelleReponse = new responseSchema({
    contenu: req.body.contenu,
    categorie: req.body.categorie,
    question: question._id // Associer la réponse à la question
  });

  try {
    const reponseEnregistree = await nouvelleReponse.save();
    // Optionnel, si vous souhaitez garder la trace dans la question
    question.reponses.push(reponseEnregistree); //Ajouter la réponse dans le tableau des réponses de la question
    await question.save();

    res.status(201).json(reponseEnregistree);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// Récupérer une question et ses réponses associées
router.get('/questions/:questionId', async (req, res) => {
  try {
    const questionAvecReponses = await querySchema.findById(req.params.questionId)
      .populate('reponses');
    if (!questionAvecReponses) {
      return res.status(404).json({ message: 'Question introuvable.' });
    }
    res.json(questionAvecReponses);
    console.log('Réponses associées:', questionAvecReponses.reponses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

});



module.exports = router
