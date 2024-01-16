const express = require('express')
const router = express.Router()
const responseSchema = require('../models/Responses')

// Create a response
// router.post('/add-response', (req, res, next) => {
//   const newResponse = new responseSchema ({
//     contenu: req.body.contenu,
//     categorie: req.body.categorie
//   })
//   newResponse.save()
//   .then((data)=> {
//    res.status(200).json(
//     {msg: "Response has been added succesfully to the database.",
//     data: data}
//     )
//   })
//   .catch((error)=>{
//     console.log("Error in creating the reponse",error)
//   })
//   // responseSchema.create()
// })

// Get All responses
router.route('/').get((req, res, next) => {
 responseSchema.find().then((data)=> {
    res.status(200).json(data)
  })
  .catch((error)=> {
    console.log('Error in getting responses', error)
  })
})


// Get response By Id
router.route('/get-response/:id').get((req, res, next) => {

responseSchema.findById({_id: req.params.id})
.then((data)=>{
  return res.status(200).json({msg: data });
})
.catch((error)=> {
  console.log('Error in getting the response by its Id : ',error)
})

})



// Update Response
router.route('/update-response/:id').put((req, res, next) => {
 responseSchema.findByIdAndUpdate({_id: req.params.id}, {$set: req.body})
  .then((data)=> {
     res.status(200).json({
      msg: "Response has been successfully updated ",
      data: data
     })
  })
  .catch((err)=> {
    console.log("Error in updating the reponse", err);
  })
})


// Delete response
router.route('/delete-response/:id').delete((req, res, next) => {
 responseSchema.deleteOne({_id: req.params.id})
  .then((data)=>{
    res.status(200).json({
      msg: 'This response has been deleted successfuly',
      data : data
    })
  })
  .catch((error)=> {

     console.log('Error in deleting the response : ', error);
  })

})

module.exports = router
