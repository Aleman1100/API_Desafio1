(function ($) {
    $(".classForm").on("submit", function (e) {
      e.preventDefault();
      const superHeroID = parseInt($(".searchClass").val());
      console.log(superHeroID);
      if (isNaN(superHeroID)) {
        return alert("Solo puedes ingresar numeros.");
      }
      if (superHeroID < 1 || superHeroID > 731) {
        return alert("Solo puedes ingresar numeros entre 1 y 731.");
      }
      APICall(superHeroID);
    });
  })(jQuery);
  
  function APICall(id) {
    $.ajax({
      type: "GET",
      dataType: "json",
      url: `https://superheroapi.com/api.php/106629905149807/${id}`,
      success: function (dataAPI) {
        console.log(dataAPI);

        //Tarjeta con los datos que deben cargarse.
        const cardHtml = `<div class="card mb-3">
                            <div class="row g-0">
                              <div class="col-md-4">
                                <img src="${dataAPI.image.url}" class="img-fluid rounded-start" alt="SuperHero ${dataAPI.name}">
                              </div>
                            <div class="col-md-8">
                              <div class="card-body">
                                <h5 class="card-title">${dataAPI.name}</h5>
                                <p class="card-text">Conexiones:${dataAPI.connections["group-affiliation"]}</p>
                                <ul class="list-group list-group-flush">
                                  <li class="list-group-item">Publicado Por: ${dataAPI.biography.publisher}</li>
                                  <li class="list-group-item">Ocupación: ${dataAPI.work.occupation}</li>
                                  <li class="list-group-item">Primera Aparición: ${dataAPI.biography["first-appearance"]}</li>
                                  <li class="list-group-item">Altura: ${dataAPI.appearance.height}</li>
                                  <li class="list-group-item">Peso: ${dataAPI.appearance.weight}</li>
                                  <li class="list-group-item">Aliases: ${dataAPI.biography.aliases.join(", ")}</li>
                                </ul>
                              </div>
                            </div>
                            </div>
                          </div>`;
        $(".superHeroCard").html(cardHtml);

        //Grafico de torta para los stats. No logré crear una solución para no mostrar esta seccion en caso de valores nulos, como el personaje 67.
        var options = {
          title: {
            text: `Estadisticas de poder para ${dataAPI.name}`
          },
          data: [{
              type: "pie",         
              startAngle: 45,
              showInLegend: "true",
              legendText: "{label}",
              indexLabel: "{label} ({y})",
              yValueFormatString:"#,##0.#"%"",
              dataPoints: [
                { label: "Combat", y: dataAPI.powerstats.combat },
                { label: "Durability", y: dataAPI.powerstats.durability },
                { label: "Intelligence", y: dataAPI.powerstats.intelligence },
                { label: "Power", y: dataAPI.powerstats.power },
                { label: "Speed", y: dataAPI.powerstats.speed },
                { label: "Strength", y: dataAPI.powerstats.strength },
              ]
          }]
        };    
        console.log(dataAPI.powerstats.combat);
        $("#chartContainer").CanvasJSChart(options);
      },
      error: function (error) {
        alert("Error en obtener datos");
        console.log(error);
      },
    });
  }