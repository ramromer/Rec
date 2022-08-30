// window.onload = function(){
//     let titulo = document.querySelector('.moviesAddTitulo')
//     let formulario = document.querySelector('#formulario');
//     let article = document.querySelector('article');
//     titulo.innerHTML = 'AGREGAR PELÍCULA';
//     titulo.classList.add('titulo');
//     article.classList.add('fondoTransparente');
//     formulario.classList.add('fondoCRUD');

// //------DESDE AQUÍ CONTINÚE CON LAS VALIDACIONES DEL FORMULARIO //
// //-------------------DE REGISTRO DE PELÍCULAS------------------//    

// let form = document.querySelector('.form');
// form.title.focus();
// let errors = [];


// form.addEventListener('submit', (event) => {
//     event.preventDefault();
//     if(form.title.value !== ""){
//         form.title.classList.add('is-valid');
//         form.title.classList.remove('is-invalid');
//     }else{
//         form.title.classList.add('is-invalid');
//         form.title.classList.remove('is-valid');
//         errors.push('el titulo no puede estar vacio');
//     }
//     if(form.rating.value !== ""){
//         if(form.rating.value > 0 && form.rating.value<=10){
//             form.rating.classList.add('is-valid');
//             form.rating.classList.remove('is-invalid');
//         }
//     }else{
//         form.rating.classList.add('is-invalid');
//         form.rating.classList.remove('is-valid');
//         errors.push('el rating no puede ser menor a 0 ni mayor a 10');
//     }
//     if(form.awards.value !== ""){
//         if(form.awards.value > 0 && form.awards.value<=10){
//             form.awards.classList.add('is-valid');
//             form.awards.classList.remove('is-invalid');
//         }
//     }else{
//         form.awards.classList.add('is-invalid');
//         form.awards.classList.remove('is-valid');
//         errors.push('el awards no puede ser menor a 0 ni mayor a 10');
//     }
//     if(form.length.value !== ""){
//         if(form.length >= 60 && form.length<=360){
//             form.length.classList.add('is-valid');
//             form.length.classList.remove('is-invalid');
//         }
//     }else{
//         form.length.classList.add('is-invalid');
//         form.length.classList.remove('is-valid');
//         errors.push('la Duracion no puede ser menor a 60 ni mayor a 360');
//     }
//     if(form.genre_id.value !== ""){
//             form.length.classList.add('is-valid');
//             form.length.classList.remove('is-invalid');
//     }else{
//         form.length.classList.add('is-invalid');
//         form.length.classList.remove('is-valid');
//         errors.push('Elija un genero!');
//     }
//     console.log(release_date);
//     // if(form.release_date.value !== ""){
//     //         form.length.classList.add('is-valid');
//     //         form.length.classList.remove('is-invalid');
//     // }else{
//     //     form.length.classList.add('is-invalid');
//     //     form.length.classList.remove('is-valid');
//     //     errors.push('Elija un genero!');
//     // }


// })
// }
