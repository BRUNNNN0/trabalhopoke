import express,{Request, Response} from "express";
import path from "path";

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "/views"));

const pokeapi = "https://pokeapi.co/api/v2/pokemon"

app.get('/', function (request:Request, response: Response) {
    fetch(pokeapi + "?limit=20")
        .then(function (dados) {
            return dados.json();
        })
        .then(function (result) {
            response.render("index", result);
        });
});


app.get('/pokemon/:name', function(request:Request, response: Response){
    
    
    const nomepokemon = request.params.name
    fetch(pokeapi + `/${nomepokemon}`
        
    )
    .then(function (res){
        console.log(res.json);
        return res.json();
    })
    .then(function(dados){
    response.render("pokemon", {pokemon: dados} );
    })
    .catch(r => console.log(r));
})





app.listen(3000, function () {
    console.log("Server is running");
})