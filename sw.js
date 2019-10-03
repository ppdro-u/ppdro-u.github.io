self.addEventListener('install', evt =>{
	console.log('service worker foi instalado');
});

self.addEventListener('activate', evt =>
	{
	console.log('service worker foi ativado.');
		
});

self.addEventListener('fetch', evt =>{
	console.log('service worker capturou um evento do tipo fetch');
});