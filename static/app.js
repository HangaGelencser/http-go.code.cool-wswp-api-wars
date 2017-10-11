var actualNumberOfPage = 1;
var actualPage = "https://swapi.co/api/planets/?page=" + actualNumberOfPage;


function dataFromApi() {
    $.ajax({
        crossOrigin: true,
        url: actualPage,
        success: function(response) {
        var myData =response.results;
        $(".myTable").html("");
        for (var i =0; i< myData.length; i++) {
            $(".myTable").append(`
            <tr id="rows">
                <th> ${myData[i]["name"]} </th>
                <th> ${myData[i]["diameter"]} </th>
                <th> ${myData[i]["climate"]} </th>
                <th> ${myData[i]["terrain"]} </th>
                <th> ${myData[i]["surface_water"]} </th>
                <th> ${myData[i]["population"]} </th>
                ${isArrayEmpty(myData, i)}
            </tr>`);
            }
        generateButtons();
        nextPage();
        prevPage();
        }
    })
}

function isArrayEmpty(data, index) {
    arrayOfResidents = data[index]["residents"];
    if (arrayOfResidents.length <= 0) {
        return `<th> ${"Unknown"} </th>`
    } else {
        var numberOfResidents = arrayOfResidents.length;
        return `<th><button id="planet${index}">${numberOfResidents + " " + "resident(s)"}</button></th>`;
    }
}

function generateButtons() {
    document.getElementById("buttons").innerHTML = `<button id="previous">previous</button>
                                                    <button id="next">next</button>`;
}

function nextPage() {
    $("#next").click(function(){
        if (actualNumberOfPage <= 7) {
            console.log(actualNumberOfPage)
            actualNumberOfPage ++;
            actualPage = "https://swapi.co/api/planets/?page=" + actualNumberOfPage;
            dataFromApi();

        }
    })
}

function prevPage() {
    $("#previous").click(function(){
        if (actualNumberOfPage > 1) {
            console.log(actualNumberOfPage)
            actualNumberOfPage --;
            actualPage = "https://swapi.co/api/planets/?page=" + actualNumberOfPage;
            dataFromApi();

        }
    })
}


dataFromApi();

//window.addEventListener('load', init());
