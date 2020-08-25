
$(document).ready(function () {
    const nutritionSearch = $('#nutritionSearch');
    // const nutritionInput = nutritionSearch.val().trim().toLowerCase();
    const eApiKey = "442982f5fe2e3eca6969e00706b1793f"
    const appId = "fa33474d"

    const recipeSearchInput = $('#recepieSearch');
    // const nutritionSearch = $('#nutritionSearch');
    const apiKey = 'e6739b112bc9427a98862a95ca09ef9c';
    // const apiKey = '37d6c566dffd4e65af7bad5bf87e9617';
    // const baseUrl = `https://api.spoonacular.com/recipes/716429/information?apiKey=${apiKey}&includeNutrition=true`;
    const baseUrl = `https://api.spoonacular.com/recipes/`;

// EDAMAM API

$('#nutritionSearch-btn').on('click', function (event) {
    event.preventDefault();
    // console.log(recipeSearchInput);
    const nutritionInput = nutritionSearch.val().trim().toLowerCase();
    console.log(nutritionInput);
    $('.container').empty();
    const eBaseUrl = `https://api.edamam.com/api/nutrition-data?&app_id=${appId}&app_key=${eApiKey}&ingr=${nutritionInput}`
    $.ajax({
        url: eBaseUrl,
        method: 'GET',
    }).then(function (response) {
        console.log(response) 
    
    })
})
















// Recepie API
    $('#search').on('click', function (event) {
        event.preventDefault();
        // console.log(recipeSearchInput);
        const input = recipeSearchInput.val().trim().toLowerCase();
        $('.container').empty();

        $.ajax({
            url: `${baseUrl}complexSearch?query=${input}&apiKey=${apiKey}`,
            method: 'GET',
        }).then(function (response) {
            console.log(response);

            const $newDiv = $('<div>').addClass('row row-cols-1 row-cols-md-2');

            for (i = 0; i < 8; i++) {
                id = response.results[i].id;

                $.ajax({
                    url: `${baseUrl}${id}/information?apiKey=${apiKey}`,
                    method: 'GET',
                }).then(function (res) {
                    console.log(res.instructions.split('.'));
                    const instructions = res.instructions.replace(/([()])/g, '').split('.');
                    instructions.forEach(function (instruction) {
                        console.log(instruction.trim());

                    })

                    // console.log(para);


                    // const $newDiv = $('<div>').addClass('row row-cols-1 row-cols-md-2');
                    const $newDiv1 = $('<div>').addClass('col mb-4');
                    const $newDiv2 = $('<div>').addClass('card');
                    const $newDiv3 = $('<div>').addClass('view overlay');
                    const $img = $('<img>').addClass('card-img-top').attr({ src: res.image });
                    const $newDiv4 = $('<div>').addClass('card-body');
                    const $h4 = $('<h4>').addClass('card-title').text(res.title);
                    const $hr = $('<hr>');
                    const $p = $('<p>').addClass('card-text').text('Instruction: ' + res.instructions.trim());
                    const $button = $('<button>').addClass('btn btn-light-blue btn-md');
                    const $a = $('<a>').attr({ href: res.sourceUrl, target: '_blank' }).text('Read more');

                    $newDiv3.append($img);
                    $button.append($a);
                    $newDiv4.append($h4, $hr, $p, $button);

                    $newDiv2.append($newDiv3, $newDiv4);
                    $newDiv1.append($newDiv2);
                    $newDiv.append($newDiv1);


                    $('.container').append($newDiv);


                })
            }
        })
    });


})


