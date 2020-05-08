function fetchMeal(){
    let meal = document.querySelector('#query').value;
    let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`;

    let settings = {
        method : 'GET'
    };

    let results = document.querySelector('.js-search-results');
    fetch(url, settings)
        .then( response => {
            if(response.ok){
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJSON => {
            console.log(responseJSON.meals.length);
            results.innerHTML = "";
            for(let i=0; i<responseJSON.meals.length; i++){
                results.innerHTML += `<div> meal name: ${responseJSON.meals[i].strMeal} </div>
                                <div> meal area: ${responseJSON.meals[i].strArea} </div>
                                <p> meal area: ${responseJSON.meals[i].strInstructions} </p>
                                <img src="${responseJSON.meals[i].strMealThumb}" class="image"></img>  `;
            }
        })
        .catch( err=> {
            results.innerHTML = `<div> Meal not found ${err.message} </div>`;
        });
}

function watchForm(){
    let mealForm = document.querySelector('.js-search-form');
    mealForm.addEventListener('submit', (event) => {
        event.preventDefault();
        fetchMeal();
    });
}

function init(){
    watchForm();
}
init();