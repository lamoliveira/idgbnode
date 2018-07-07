

var buscar = function(name) {
    $.ajax('https://powerful-reaches-60130.herokuapp.com:3001/api/igdb/games?name=' + name).then(function(result) {
        $('#resultado .list-group li').remove();
        $.each(result.body, function(index, game) {
            $('#resultado .list-group').append('<li class="list-group-item">' + game.name + '</li>');
        });
    });
}

$(document).ready(function() {
    $('#btnBuscar').on('click', function() {
        buscar($('#txtBusca').val());
    });
});