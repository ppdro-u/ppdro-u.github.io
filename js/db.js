
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
            // remover da pagina tambem
        }
    });
});

// adicionar nova sobremesa
const form = document.querySelector('form');
form.addEventListener('submit', evt => {
    evt.preventDefault();

    const pesquisa_emprego = {
        nome: form.pesquisa_empregoTitulo.value,
        descricao: form.pesquisa_empregoDescricao.value,
        link: form.pesquisa_empregoLink.value,
        endereco_imagem: form.pesquisa_empregoArquivo.value
    };

    db.collection('pesquisa_emprego').add(pesquisa_emprego)
        .catch(err => console.log(err));

    //reseta o formulario
    form.pesquisa_empregoTitulo.value = '';
    form.pesquisa_empregoDescricao.value = '';
    form.pesquisa_empregoArquivo.value = '';

});
