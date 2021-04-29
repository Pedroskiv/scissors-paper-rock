let userPick = "";
let pcPick = "";
let userPoints = 0;

$( document ).ready(function() {
    // $("#modalRules").modal("show");
});

// Seleccionar figura del 
$(document).on('click', '.pickable-shape', function(event)
{
    event.preventDefault();

    // Obtener nombre de la figura
    const shape = $(this).data("target");

    // Ocultar contenedor con las 5 figuras
    $("#main-shapes").hide();
    
    // Mostrar contenedor con las figuras seleccionadas
    $("#versus-shapes").removeClass("d-none");

    putShape("person", shape);

    setTimeout(() => {
        pcChoose();
        checkPoint();
    }, 1000);
});

// Play again
$(document).on('click', '#btn-play-again', function(event)
{
    event.preventDefault();

    // Mostrar contenedor con las 5 figuras
    $("#main-shapes").show();
    
    // Ocultar contenedor con las figuras seleccionadas
    $("#versus-shapes").addClass("d-none");


    /* Reiniciar divs con figuras seleccionadas previamente */
    // Figura seleccionada por el usuario
    $("#picked-shape").parent().parent().removeAttr("class");

    // Figura seleccionada por el PC
    $("#pc-shape").parent().parent().removeAttr("class");
    $("#pc-shape").parent().parent().addClass("d-none");
    $(".empty-circle").show();

    // Ocultar sección con información de la ronda y botón Play Again
    $("#info-round").addClass("d-none");
});

// Agregar imagen seleccionada por el usuario o por el pc
const putShape = (user, shape) => 
{
    if (user == "person")
    {
        $("#picked-shape").parent().parent().addClass(`circle-border lg ${shape}`);
        $("#picked-shape").attr("src", `images/icon-${shape}.svg`);
        $("#picked-shape").attr("alt", shape);

        userPick = shape;
    }
    else if (user == "pc")
    {
        $(".empty-circle").hide();
        
        $("#pc-shape").parent().parent().removeClass("d-none");
        $("#pc-shape").parent().parent().addClass(`circle-border lg ${shape}`);
        $("#pc-shape").attr("src", `images/icon-${shape}.svg`);
        $("#pc-shape").attr("alt", shape);

        pcPick = shape;
    }
}

// PC escoge su figura
const pcChoose = () =>
{
    const options = ["scissors", "paper", "rock", "lizard", "spock"];
    const choose = Math.round(Math.random() * 4);
    
    putShape("pc", options[choose]);
}

// Verificar para quién es el punto
const checkPoint = () =>
{
    let result = "";
    if (compareShapes(userPick, pcPick))
    {
        userPoints++;

        // Gana usuario
        result = 'YOU WIN';
        // Agregar sombreado a la figura
        $("#picked-shape").parent().parent().addClass("win-gradient");
    }
    else
    {
        if (compareShapes(pcPick, userPick))
        {
            userPoints--;

            // Gana PC
            result = "YOU LOSE";
            // Agregar sombreado a la figura
            $("#pc-shape").parent().parent().addClass("win-gradient");
        }
        else 
        {
            // Empate
            result = "DRAW";
        }
    }

    // Mostrar texto y botón Play Again
    $("#info-round span").text(result);
    $("#info-round").removeClass("d-none");

    // Actualizar contador de puntos
    $("#score-counter").text(userPoints);
}

// Compara las diferentes combinaciones entre las figuras
const compareShapes = (option1, option2) => 
{
    if (option1 == "scissors")
    {
        if (option2 == "paper" || option2 == "lizard")
        {
            return true;
        }
    }
    else if (option1 == "paper")
    {
        if (option2 == "rock" || option2 == "spock")
        {
            return true;
        }
    }
    else if (option1 == "rock")
    {
        if (option2 == "lizard" || option2 == "scissors")
        {
            return true;
        }
    }
    else if (option1 == "lizard")
    {
        if (option2 == "spock" || option2 == "paper")
        {
            return true;
        }
    }
    else if (option1 == "spock")
    {
        if (option2 == "scissors" || option2 == "rock")
        {
            return true;
        }
    }

    return false;
}