// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.

// cantidad máxima de amigos que se pueden agregar
const maxFriendNumber = 12;
// estado de la lista de amigos
let globalFriendArrayState = [];
// ultimo amigo seleccionado
let lastSelectedFriend = null;

/*
función para ir agregando lo amigos al globalFriendArrayState
argumentos: ninguno
valor de retorno: ninguno
*/
function agregarAmigo() {
    // alerta si se supera la cantidad de amigos permitida por sorteo
    if (globalFriendArrayState.length >= maxFriendNumber) {
        alert(`Se supero el máximo de amigos para agregar (${maxFriendNumber})`);	
        return;
    }
    let newFriend = document.getElementById("amigo");
    // expresión regular para asegurar que el nombre sea uno valido
    let pattern = new RegExp("^(?:[a-zñáéíóú]+\\s?[a-zñáéíóú]+)+$", "i");
    // primero se chequea que el nombre sea valido
    if (pattern.test(newFriend.value)) {
        // se asegura que no hayan nombres repetidos si los hay
        // se alerta al usuario
        if (globalFriendArrayState.includes(newFriend.value)) {
            alert("Ya existe un amigo con ese nombre");
            return;
        } else {
            // se agrega el nuevo amigo a la lista
            globalFriendArrayState.push(newFriend.value);
            // se muestra el mensaje con acciones para realizar
            // siempre cuando haya al menos un amigo en la lista
            if (globalFriendArrayState.length == 1) {
                document.getElementById("friendAction").innerText = "Presiona el nombre de un amigo para eliminarlo";
            }
            // se agrega el nuevo amigo a un elemento <li> para
            // que se muestre en la pagina
            let newListItem = document.getElementById("listaAmigos");
            newListItem.innerHTML += `<li id="${newFriend.value}"><button onclick="borrarAmigo('${newFriend.value}');" title="eliminar">${newFriend.value}</button></div></li>`;
            newFriend.value = "";
        }
    } else {
        // si el nombre no fue valido se alerta al usuario
        alert("Por favor ingrese un nombre valido");
    }
}

/*
función para eliminar un amigo ingresado de la globalFriendArrayState
argumentos: ninguno
valor de retorno: ninguno
*/
function borrarAmigo(value) {
    // se elimina el amigo y reajusta la lista
    globalFriendArrayState = globalFriendArrayState.filter((val) => val !== value);
    // se elimina el <li> que contiene el amigo eliminado
    document.getElementById(value).remove();
    // si no quedan amigos en la lista se limpia el mensaje de acciones de amigos
    if (!globalFriendArrayState.length) {
        document.getElementById("friendAction").innerText = "";
    }
}

/*
función para sortear un amigo secreto,  lo esperado es que el usuario
ingreso el nombre de sus amigos pero no el suyo, siendo el primer
sorteo el amigo secreto para él y el siguiente y los que vienen para
el ultimo amigo secreto que fue sorteado asi hasta que todos tengan una
pareja
argumentos: ninguno
valor de retorno: ninguno
*/
function sortearAmigo () {
    // se limpian los mensajes si no hay amigos o ya se sortearon
    // todos los nombres además de poner al ultimo amigo elegido
    // a su estado inicial
    if (!globalFriendArrayState.length) {
        document.getElementById("resultado").innerHTML = "";
        document.getElementById("secretFriend").innerText = "";
        lastSelectedFriend = null;
        return;
    }
    // se selecciona un amigo secreto por indice aleatorio
    let randomFriend = Math.floor(Math.random()*globalFriendArrayState.length);
    // se genera el mensaje apropiado dependiendo de si es
    // el primer amigo secreto sorteado o no
    document.getElementById("secretFriend").innerHTML = `${!lastSelectedFriend ? "Tu amigo secreto" : "El amigo secreto de <span id='lastFriend'>" + lastSelectedFriend + "</span>"} es:`;
    // se muestra el amigo secreto seleccionado
    document.getElementById("resultado").innerHTML = `<li>${globalFriendArrayState[randomFriend]}</li>`;
    // se actualiza eel estado de lastSelectedFriend al ultimo amigo sorteado
    lastSelectedFriend = globalFriendArrayState[randomFriend];
    // se elimina el amigo sorteado de la lista
    borrarAmigo(globalFriendArrayState[randomFriend]);
 }