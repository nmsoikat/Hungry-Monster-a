window.onload = function () {
  const foodItemWrap = document.getElementById("foodItemWrap");
  const detailFoodItemWrap = document.getElementById("detailFoodItemWrap");
  const mealSearchInput = document.getElementById("mealSearchInput");
  const searchBtn = document.getElementById("searchBtn");

  // if (foodItemWrap.classList.contains("detail"))
  //   foodItemWrap.classList.remove("detail");

  //---- Get all data for home page --------
  // fetch("https://www.themealdb.com/api/json/v1/1/filter.php?a=Canadian")
  //   .then((res) => res.json())
  //   .then((data) => displayMeal(data.meals))
  //   .catch((err) => {
  //     console.log("Homepage fetch time error: ", err);
  //   });

  //------- Show single item detail ---------
  foodItemWrap.addEventListener("click", function (event) {
    // console.log(event.target.parentElement.parentElement);
    // if (!foodItemWrap.classList.contains("detail"))
    //   foodItemWrap.classList.add("detail");

    let parentElement = event.target.parentElement.parentElement;
    let datasetObj = { ...parentElement.dataset };
    fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${datasetObj.mealid}`
    )
      .then((res) => res.json())
      .then((data) => displayMealDetails(data.meals[0]))
      .catch((err) => console.log("Detail view time error: ", err));

    // scroll top
    console.log(window.scrollTo(0, 0));
  });

  //--------- Search by name -----------
  mealSearchInput.addEventListener("keyup", function (event) {
    // console.log(event.target.value);
    let value = event.target.value;
    searchMeal(value);
  });

  searchBtn.addEventListener("click", () => {
    let value = mealSearchInput.value;
    searchMeal(value);
  });

  // Display Meal
  function displayMeal(meals) {
    // console.log(meals);
    const allMealHTML = meals.map((meal) => {
      return `
      <div class="col-sm-6 col-md-4 col-lg-3">
        <div id="foodItem" class="food-item" data-mealId="${meal.idMeal}">
          <div class="food-item__img"><img src="${meal.strMealThumb}"></div>
          <div class="food-item__info">
            <h2 class="food-item__name">${meal.strMeal}</h2>
          </div>
        </div>
      </div>
      `;
    });
    // console.log(allMeal);
    foodItemWrap.innerHTML = allMealHTML.join("");
  }

  // Display Meal Detail
  function displayMealDetails(mealDetail) {
    // console.log(mealDetail);
    const mealDetailsHTML = `
    <div class="offset-sm-3 col-sm-6">
      <div id="foodItem" class="food-item" data-mealId="${mealDetail.idMeal}">
        <div class="food-item__img"><img src="${mealDetail.strMealThumb}"></div>
        <div class="food-item__info">
          <h2 class="food-item__name">${mealDetail.strMeal}</h2>
        </div>
        <p class="ingredients-title">Ingredients</p>
        <ul class="ingredients">
          <li><img src="./img/checkmark-square.png">${mealDetail.strIngredient1}</li>
          <li><img src="./img/checkmark-square.png">${mealDetail.strIngredient2}</li>
          <li><img src="./img/checkmark-square.png">${mealDetail.strIngredient3}</li>
          <li><img src="./img/checkmark-square.png">${mealDetail.strIngredient4}</li>
          <li><img src="./img/checkmark-square.png">${mealDetail.strIngredient5}</li>
          <li><img src="./img/checkmark-square.png">${mealDetail.strIngredient6}</li>
        </ul>
        <!--<p class="ingredients-title"><a class="btn btn-sm btn-success d-block mt-5"  href="./"> Home </a></p> -->
      </div>
    </div>
    `;
    detailFoodItemWrap.innerHTML = mealDetailsHTML;
  }

  function searchMeal(value) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`)
      .then((res) => res.json())
      .then((data) => {
        displayMeal(data.meals);
        detailFoodItemWrap.innerHTML = ""; // search time detail off
      })
      .catch((err) => {
        // console.log("Search time error: ", err);
        // if item not found
        let itemNotFoundHTML = `
        <div class="offset-sm-3 col-sm-6 text-center mt-5 pb-5">

        <h2 class="text-danger">
        Sorry :(
        <br/>
        Meal Not Found!</h2>
        <p class="ingredients-title"><a class="btn btn-sm btn-success d-block mt-5"  href="./"> Home </a></p>
      </div> 
        `;
        foodItemWrap.innerHTML = itemNotFoundHTML;
      });
  }
};
