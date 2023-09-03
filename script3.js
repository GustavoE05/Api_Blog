
function obterPostIdDaURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
    
  }
  
  async function carregarPostagem() {
    console.log('Carregando postagem...');
    const id = obterPostIdDaURL();
    
    if (id) {
        
      const url = `https://api-rest-post-diegocandido.herokuapp.com/postagem/${id}`;
  
      try {
        const response = await fetch(url);
  
        if (response.ok) {
          const responseData = await response.text();
  
          
          if (responseData.trim() !== "") {
            const post = JSON.parse(responseData);
            mostrarPost(post);
          } else {
            console.error('Resposta vazia ao buscar postagem');
          }
        } else {
          console.error('Erro ao buscar postagem:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Erro ao buscar postagem:', error);
      }
    }
  }
  
  function mostrarPost(post) {
    const noticia = document.querySelector('.noticia');
    noticia.innerHTML = '';
  
    
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
                     
                </div>
            </div>
      </div>`;
  
    noticia.innerHTML = postHTML;
  }
  
  carregarPostagem();
  