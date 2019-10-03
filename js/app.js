if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('../sw.js')
		.then((reg) => console.log('service Worker registrado'))
		.catch((err) => console.log('service Worker não registrado', err));	
}
