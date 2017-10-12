
var actualNumberOfPage = 1;
var actualPage = "https://swapi.co/api/planets/?page=" + actualNumberOfPage;


function dataFromApi() {
    $.ajax({
        crossOrigin: true,
        url: actualPage,
        success: function (response) {
            var myData = response.results;
            $(".myTable").html("");
            for (var i = 0; i < myData.length; i++) {
                var people = myData[i].residents;
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
                residentButton(i, people);
            }
            generateButtons();
            nextPage();
            prevPage();
        }
    })
}

function isArrayEmpty(data, index, residents) {
    arrayOfResidents = data[index]["residents"];
    if (arrayOfResidents.length <= 0) {
        return `<th> ${"Unknown"} </th>`
    } else {
        var numberOfResidents = arrayOfResidents.length;
        return `<th><button id="planet${index}" class="btn btn-outline-primary">
                ${numberOfResidents + " " + "resident(s)"}</button></th>`;
    }
}

function generateButtons() {
    document.getElementById("buttons").innerHTML = `
        <nav aria-label="...">
            <ul class="pager">
                <li class="previous disabled"><button id="previous" class="btn btn-default"><span aria-hidden="true">&larr;</span></button></li>
                <li class="next"><button id="next" class="btn btn-default"><span aria-hidden="true">&rarr;</span></button></li>
            </ul>
        </nav>`;
    }

function nextPage() {
    $("#next").click(function () {
        if (actualNumberOfPage <= 7) {
            actualNumberOfPage++;
            actualPage = "https://swapi.co/api/planets/?page=" + actualNumberOfPage;
            dataFromApi();

        }
    })
}

function prevPage() {
    $("#previous").click(function () {
        if (actualNumberOfPage > 1) {
            actualNumberOfPage--;
            actualPage = "https://swapi.co/api/planets/?page=" + actualNumberOfPage;
            dataFromApi();

        }
    })
}

function residentButton(planetId, residents) {
    var id = String(planetId);
    $(`#planet${id}`).click(function () {
        overlay();
        getResidentsData(residents);
        var modalContent = document.getElementById("modalContent");
    })
}

function overlay() {
    el = document.getElementById("overlay");
    el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
}

function modalContent(stringId) {
    if (mod != null) {
        document.getElementById(stringId).innerHTML = "";
    };

}

function getResidentsData(residents) {
    $('.modalRows').remove();
    for (var i = 0; i < residents.length; i++) {
        $.ajax({
            crossOrigin: true,
            url: residents[i],
            success: function (response) {
                var dataOfPeople = response;
                $("#modalTable").append(`
            <tr class="modalRows">
            <th> ${dataOfPeople.name} </th>
            <th> ${dataOfPeople.height} </th>
            <th> ${dataOfPeople.mass} </th>
            <th> ${dataOfPeople.hair_color} </th>
            <th> ${dataOfPeople.skin_color} </th>
            <th> ${dataOfPeople.eye_color} </th>
            <th> ${dataOfPeople.birth_year} </th>
            <th> ${dataOfPeople.gender} </th>
            </tr>`);
            }
        })
    }
}


dataFromApi();

//window.addEventListener('load', init());