async function fetchAndShowPosts() {
    const url = 'https://api-rest-post-diegocandido.herokuapp.com/postagens/';

    try {
        const response = await fetch(url);
        const data = await response.json();
        mostrar(data);
    } catch (error) {
        console.error('Erro ao buscar postagem', error);
    }
}

function mostrar(posts) {
    const noticias = document.querySelector('.posts');
    noticias.innerHTML = '';

    posts.forEach(post => {
        const thumbImageSrc = post.thumbImage.startsWith('/') ? `https://api-rest-post-diegocandido.herokuapp.com${post.thumbImage}` : post.thumbImage;
        const profileThumbImageSrc = post.profileThumbImage.startsWith('/') ? `https://api-rest-post-diegocandido.herokuapp.com${post.profileThumbImage}` : post.profileThumbImage;
        const postHTML = `
        <div class="col-md-12">
            <div class="row post ">
                <div class="col-md-4 ">
                    <img class="img-fluid" src="${thumbImageSrc}" alt="${post.thumbImageAltText}">
                </div>
                <div class="col-md-8">
                    <h6>${post.thumbImageAltText}</h6>
                    <h2>${post.title}</h2>
                    <p>${post.description}</p>
                    <p>Por ${post.profileName}, ${post.postDate}</p>
                    <p style="color: #4D4DFF"> ler mais </p>
                </div>
            </div>
        </div>`;
        noticias.innerHTML += postHTML;
    });
}

fetchAndShowPosts();