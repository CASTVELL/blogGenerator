document.getElementById('blog-form').addEventListener('submit', function (event) {
  event.preventDefault();

  // Recuperar los valores ingresados por el usuario
  var title = document.getElementById('title').value;

  var description = document.getElementById('description').value;


  var tagCount = document.getElementById('tags').value;

  // Generar el blog
  generateBlog(title, description, tagCount);

  // Ocultar el formulario y el botón "Generar"
  document.getElementById('blog-form').style.display = 'none';
  document.getElementById('generate-button').style.display = 'none';

  // Mostrar el contenedor del blog
  document.getElementById('blog-container').style.display = 'block';

  // Mostrar el botón de descarga
  document.getElementById('download-button').style.display = 'block';
});

function generateBlog(title, titleImage, description, blogImages, selectedFont, tagCount) {
  // Asignar los valores al contenido del blog
  document.getElementById('blog-title').textContent = title;
  document.getElementById('blog-title-image').src = titleImage;
  document.getElementById('blog-description').textContent = description;

  // Aplicar la fuente seleccionada al contenedor del blog y sus componentes
  var blogContainer = document.getElementById('blog-container');
  blogContainer.style.fontFamily = selectedFont;

  // Generar el código HTML para las imágenes del blog
  var imagesHTML = '';
  blogImages.split(',').forEach(function (image) {
    imagesHTML += '<img src="' + image + '">';
  });
  document.getElementById('blog-images').innerHTML = imagesHTML;

  // Generar los espacios para las etiquetas
  var tagsHTML = '';
  for (var i = 0; i < tagCount; i++) {
    tagsHTML += '&nbsp;&nbsp;';
  }
  document.getElementById('tags').innerHTML = tagsHTML;
}



function downloadBlog() {
  // Generate the XML content of the blog
  var blogXML = generateBlogXML();

  // Create a Blob from the XML string
  var blob = new Blob([blogXML], { type: 'text/xml' });

  // Create a URL for the Blob
  var url = URL.createObjectURL(blob);

  // Create a link element for downloading the file
  var link = document.createElement('a');
  link.href = url;
  link.download = 'blog.xmi';

  // Programmatically click the link to trigger the download
  link.click();

  // Clean up the URL and the link element
  URL.revokeObjectURL(url);
  link.remove();
}

document.getElementById('download-button').addEventListener('click', downloadBlog);

document.getElementById('add-article-button').addEventListener('click', function (event) {
  event.preventDefault();

  // Mostrar el formulario de artículo y ocultar el botón "Agregar Artículo"
  document.getElementById('add-article-button').style.display = 'none';
  document.getElementById('article-form').style.display = 'block';
});

document.getElementById('article-form').addEventListener('submit', function (event) {
  event.preventDefault();

  // Recuperar los valores ingresados en el formulario de artículo
  var articleTitle = document.getElementById('article-title').value;
  var articleContent = document.getElementById('article-content').value;
  var articleImages = document.getElementById('article-images').value;

  // Limpiar los campos del formulario de artículo
  document.getElementById('article-title').value = '';
  document.getElementById('article-content').value = '';
  document.getElementById('article-images').value = '';

  // Volver a ocultar el formulario de artículo y mostrar el botón "Agregar Artículo"
  document.getElementById('article-form').style.display = 'none';
  document.getElementById('add-article-button').style.display = 'block';

  // Generar el recuadro del artículo
  var articleContainer = document.createElement('div');
  articleContainer.className = 'article-container';

  var articleTitleElement = document.createElement('h3');
  articleTitleElement.textContent = articleTitle;

  var articleContentElement = document.createElement('p');
  articleContentElement.textContent = articleContent;

  var articleImagesElement = document.createElement('div');
  articleImagesElement.className = 'article-images';
  articleImages.split(',').forEach(function (image) {
    var imgElement = document.createElement('img');
    imgElement.src = image;
    articleImagesElement.appendChild(imgElement);
  });

  var commentSection = document.createElement('div');
  commentSection.className = 'comment-section';
  commentSection.innerHTML = `
    <h4>Comentarios</h4>
    <div class="comment-input">
      <button class="add-comment-button">Agregar Comentario</button>
      <div class="comment-form" style="display: none;">
        <input type="text" placeholder="Nombre de usuario">
        <input type="text" placeholder="Contenido">
        <button class="comment-submit">Enviar</button>
      </div>
    </div>
    <div class="comments"></div>
  `;

  var commentsContainer = commentSection.querySelector('.comments');
  var addCommentButton = commentSection.querySelector('.add-comment-button');
  var commentForm = commentSection.querySelector('.comment-form');
  var commentSubmitButton = commentSection.querySelector('.comment-submit');

  addCommentButton.addEventListener('click', function () {
    addCommentButton.style.display = 'none';
    commentForm.style.display = 'block';
  });

  commentSubmitButton.addEventListener('click', function () {
    var usernameInput = commentForm.querySelector('input[type="text"][placeholder="Nombre de usuario"]');
    var contentInput = commentForm.querySelector('input[type="text"][placeholder="Contenido"]');

    var comment = document.createElement('div');
    comment.className = 'comment';
    comment.innerHTML = `
      <strong>${usernameInput.value}</strong>
      <span>${contentInput.value}</span>
    `;

    commentsContainer.appendChild(comment);

    // Limpiar los campos del formulario de comentario
    usernameInput.value = '';
    contentInput.value = '';

    addCommentButton.style.display = 'block';
    commentForm.style.display = 'none';
  });

  articleContainer.appendChild(articleTitleElement);
  articleContainer.appendChild(articleContentElement);
  articleContainer.appendChild(articleImagesElement);
  articleContainer.appendChild(commentSection);

  // Agregar el artículo al contenedor de artículos
  var articlesContainer = document.getElementById('articles-container');
  articlesContainer.appendChild(articleContainer);
  articlesContainer.appendChild(document.createElement('hr'));
});

function generateBlogXML() {
  var title = document.getElementById('title').value;
  var titleImage = document.getElementById('title-image').value;
  var description = document.getElementById('description').value;
  var blogImages = document.getElementById('blog-images').value;
  var selectedFont = document.getElementById('font').value;
  var tagCount = document.getElementById('tags').value;

  // Create an XML string representing the blog content
  var blogXML = '<blog>\n';
  blogXML += '\t<title>' + escapeXML(title) + '</title>\n';
  blogXML += '\t<title-image>' + escapeXML(titleImage) + '</title-image>\n';
  blogXML += '\t<description>' + escapeXML(description) + '</description>\n';
  // Add other blog content to the XML string
  // ...

  blogXML += '</blog>';

  return blogXML;
}

function escapeXML(string) {
  // Escape XML special characters
  return string.replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

