## Gestion des Questions ##

Get_AllQuestions(get): http://localhost:3000/question/
Add_Question(post): http://localhost:3000/question/add-question
{
	"titre":"titre",
    "contenu":"votre contenu",
    "categorie":"catégorie"
}
Update_Question(put): http://localhost:3000/question/update-question/:id
{
        "titre": "modifier_titre",
        "contenu": "modifier_contenu",
        "categorie": "modifier_categorie"
}   
Delete_Question(delete): http://localhost:3000/question/delete-question/:id
Get_ById(get): http://localhost:3000/question/get-question/:id
Get_ByCategory(get): http://localhost:3000/question/:categorie
Recherche_NLP(post): http://localhost:3000/search_similar_questions
{
    "question": "votre question"
}
Connction_Python(get):http://localhost:3000/run_python_script
AddResponse(post):http://localhost:3000/question/questions/:idQuestion/reponses
{
   "contenu": "Votre réponse ",
  
}
GetQuestionWithResponse(get):http://localhost:3000/question/questions/:id 





## Gestion des Réponses ##

Get_AllResponse(get): http://localhost:3000/response/
Get_ById(get):http://localhost:3000/response/get-response/:id
Update_Response(put): http://localhost:3000/response/update-response/:id
{
    "contenu": "Voici la réponse à la questions modifiée."
}
Delete_Response(delete):http://localhost:3000/response/delete-response/:id





## SignUp/ SignIn (Authentification) ##

SignUp(post): http://localhost:3000/users/signup
{
    "firstName":".......",
    "lastName":"........",
    "email":".......@gmail.com",
    "pwd":"........."
}
SignIn(post):http://localhost:3000/users/login
{
    "email":".......@gmail.com",
    "pwd":"........."
}

