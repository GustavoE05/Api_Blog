async function fetchAndShowIndividualPosts(postIds) {
    const baseUrl = 'https://api-rest-post-diegocandido.herokuapp.com/postagem/';

    try {
        const posts = [];

        for (const postId of postIds) {
            const url = `${baseUrl}${postId}`;
            const response = await fetch(url);
            const data = await response.json();
            posts.push(data);
        }

        mostrar(posts);
    } catch (error) {
        console.error('Erro ao buscar postagem', error);
    }
}

function mostrar(posts) {
    const postContainer = document.querySelector('.abc');
    postContainer.innerHTML = '';

    posts.forEach(post => {
        const thumbImageSrc = post.thumbImage.startsWith('/') ? `https://api-rest-post-diegocandido.herokuapp.com${post.thumbImage}` : post.thumbImage;
        const profileThumbImageSrc = post.profileThumbImage.startsWith('/') ? `https://api-rest-post-diegocandido.herokuapp.com${post.profileThumbImage}` : post.profileThumbImage;
        const postHTML = `
        <div class="col-4 ">
            <div class="card" style="width:23.778vw; margin-top:2vw;">
                <img class="card-img-top" style="width:23.778vw; height:23.778vw; " src="${thumbImageSrc}" alt="${post.thumbImageAltText}">
                <div class="col-12">
                    <p>Por ${post.profileName}</p>
                    <h5 class="card-title">${post.title}</h5>
                    <button class="btn ler-mais-btn">Ler mais</button>
                    <p class="descricao" style="display: none;">${post.description}</p>
                </div>
            </div>
        </div>`;
        postContainer.innerHTML += postHTML;
    });

    const lerMaisButtons = document.querySelectorAll('.ler-mais-btn');
    lerMaisButtons.forEach(button => {
        button.addEventListener('click', toggleDescricao);
    });
}

function toggleDescricao(event) {
    const card = event.currentTarget.closest('.card');
    const descricao = card.querySelector('.descricao');

    if (descricao.style.display === 'none') {
        descricao.style.display = 'block';
    } else {
        descricao.style.display = 'none';
    }
}

const postIdsToFetch = [1, 3, 5, 2, 0, 4];
fetchAndShowIndividualPosts(postIdsToFetch);
