var input = document.getElementById("msg");
input.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        enviarMSG();
    }
});

var botao = document.getElementById("enviar")
botao.addEventListener("click", function () {
    enviarMSG();
})

// CONTENT DELIVERY NETWORK - CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getDatabase, ref, set, push, remove, onValue } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-database.js";

var firebaseConfig = {
    // PEGAR INFO DO FIREBASE
    apiKey: "AIzaSyDirBlAZcjVYnH1Vpw4wj4Ta63lXtIHhos",
    authDomain: "chat-b5fe3.firebaseapp.com",
    projectId: "chat-b5fe3",
    storageBucket: "chat-b5fe3.appspot.com",
    messagingSenderId: "213307689641",
    appId: "1:213307689641:web:713525f88b7cd580cfb7b8",
    measurementId: "G-QSVK33381L"
};

const app = initializeApp(firebaseConfig);

var db = getDatabase(app);
const dbRef = ref(db, 'exemplo');
const dbSala2 = ref(db, 'Sala2');

var meuhtml = "";

var nomeUsuario = prompt("Digite seu nome");

onValue(dbRef, (snapshot) => {
    const data = snapshot.val();
    console.log(data);
    meuhtml = "";
    snapshot.forEach(function (childSnapshot) {
        // key para deletar msg
        var key = childSnapshot.key;
        console.log(key);
        console.log(childSnapshot.val().nome);
        console.log(childSnapshot.val().mensagem);
        console.log(childSnapshot.val().horario);
        console.log(childSnapshot.val().itemKey)

        if (nomeUsuario == childSnapshot.val().nome){
            meuhtml += '<div class="msg self eu"><b>' + childSnapshot.val().nome +'<i> ' + childSnapshot.val().horario + '<a id="' + key + '" class="deletemsg"><i class="fa-solid fa-trash-can"></i></a>' +'</i></b><snap>' + childSnapshot.val().mensagem + '</span></div>'
        } else {
            meuhtml += '<div class="msgb another outros"><b>' + childSnapshot.val().nome + '<i> ' + childSnapshot.val().horario + '</i></b><snap>' + childSnapshot.val().mensagem + '</span></div>'
        }
        // meuhtml += '<div class="msg"><b>' + childSnapshot.val().nome +  '</i></b><span>' + childSnapshot.val().mensagem + '</span></div>';
    });
    atualizarHTML();
});

function enviarMSG() {
    var datahj = new Date();
    var hora = datahj.getHours() + ":" + datahj.getMinutes() + ":" + datahj.getSeconds()

    push(ref(db, 'exemplo'), {
        nome: nomeUsuario,
        horario: hora,
        mensagem: document.getElementById("msg").value
    });
    document.getElementById("msg").value = "";
}

function atualizarHTML() {
    document.getElementById("conteudo").innerHTML = meuhtml
    var arrMsg = Array.from(document.querySelectorAll(".deletemsg"));
    console.log(arrMsg)
    arrMsg.forEach((msg) => {
        msg.addEventListener("click", () => {
            deleteMsg(msg.id)
        })
    })
    ajustarScroll();
}

function ajustarScroll() {
    console.log("corrirgir scroll");
    var divConteudo = document.getElementById("conteudo");
    divConteudo.scrollTop = divConteudo.scrollHeight;
}

function deleteMsg(key) {
    var id = key;
    console.log(id)
    remove(ref(db, 'exemplo/' + id));
    swal ({
        title : "Você deletou uma mensagem!" , 
        text : "Não se arrepende?",
      });
}