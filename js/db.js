
db.enablePersistence()
    .catch(function(err) {
        if (err.code == 'failed-precondition') {
            // provavelmente multiplas abas abertas ao mesmo tempo
            console.log('Persistencia de dados falhou');
        } else if (err.code == 'unimplemented') {
            // browser nao suporta
            console.log('Persistencia nao disponivel');
        }
    });
db.collection('pesquisa_emprego').onSnapshot(snapshot => {
    snapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
            desenhaCard(change.doc.data(), change.doc.id);
        }
        if (change.type === 'removed') {
            removeCard(change.doc.id);
            // remover da pagina tambem
        }
    });
});

// adicionar nova sobremesa
const form = document.querySelector('form');
form.addEventListener('submit', evt => {
    evt.preventDefault();

    const pesquisa_emprego = {
        email: form.email.value,
        nome: form.nome.value,
        profissão: form.profissão.value
    };

    db.collection('pesquisa_emprego').add(pesquisa_emprego)
        .catch(err => console.log(err));

    //reseta o formulario
    form.email.value = '';
    form.nome.value = '';
    form.profissão.value = '';

});

 //remove a recipe
const empregos1 = document.querySelector('.empŕegos');
empregos1.addEventListener('click', evt => {
  if(evt.target.tagName === 'I'){
    const id = evt.target.getAttribute('data-id');
    //console.log(id);
    db.collection('empregos').doc(id).delete();
  }
})
