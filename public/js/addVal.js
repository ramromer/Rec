window.onload = function(){
    let fecha = document.getElementById('release_date');
    let titulo = document.querySelector('.moviesAddTitulo');
    let formulario = document.querySelector('#formulario');
    let article = document.querySelector('article');
    titulo.innerHTML = 'AGREGAR PELI';
    titulo.classList.add('titulo');
    article.classList.add('fondoTransparente');
    formulario.classList.add('fondoCRUD');

    fecha.valueAsDate = new Date();

//------DESDE AQUÍ CONTINÚE CON LAS VALIDACIONES FRONTEND DEL FORMULARIO //
//-------------------DE REGISTRO DE PELÍCULAS------------------//    

let form = document.querySelector('.form');
form.title.focus();
let errors = [];


form.addEventListener('submit', (event) => {
    
    if(form.title.value !== ""){
        form.title.classList.add('is-valid');
        form.title.classList.remove('is-invalid');
    }else{
        form.title.classList.add('is-invalid');
        form.title.classList.remove('is-valid');
        errors.push('el titulo no puede estar vacio');
        event.preventDefault(); //comentar para provar las validaciones del backend
    }
    if(form.rating.value !== ""){
        if(form.rating.value > 0 && form.rating.value <= 10){
            form.rating.classList.add('is-valid');
            form.rating.classList.remove('is-invalid');
        }else if (form.rating.value < 0 || form.rating.value > 10){
            event.preventDefault(); //comentar para provar las validaciones del backend
            form.rating.classList.add('is-invalid');
        form.rating.classList.remove('is-valid');
            errors.push('Rating No puede ser menor a 0 ni mayor a 10');
        }
    }else{
        form.rating.classList.add('is-invalid');
        form.rating.classList.remove('is-valid');
        errors.push('Debe indicar el rating');
        event.preventDefault(); //comentar para provar las validaciones del backend
    }
    if(form.awards.value !== ""){
        if(form.awards.value > 0 && form.awards.value <= 10){
            form.awards.classList.add('is-valid');
            form.awards.classList.remove('is-invalid');
        }else if (form.awards.value < 0 || form.awards.value > 10){
            event.preventDefault(); //comentar para provar las validaciones del backend
            form.awards.classList.add('is-invalid');
        form.awards.classList.remove('is-valid');
            errors.push('Premios No puede ser menor a 0 ni mayor a 10');
        }
    }else{
        form.awards.classList.add('is-invalid');
        form.awards.classList.remove('is-valid');
        errors.push('Debe indicar los premios');
        event.preventDefault(); //comentar para provar las validaciones del backend
    }
    if(form.length.value !== ""){
        if(form.length.value > 60 && form.length.value <= 360){
            form.length.classList.add('is-valid');
            form.length.classList.remove('is-invalid');
        }else if (form.length.value < 60 || form.length.value > 360){
            event.preventDefault(); //comentar para provar las validaciones del backend
            form.length.classList.add('is-invalid');
        form.length.classList.remove('is-valid');
            errors.push('Duracion No puede ser menor a 60 ni mayor a 360');
        }
    }else{
        form.length.classList.add('is-invalid');
        form.length.classList.remove('is-valid');
        errors.push('Debe indicar la duracion');
        event.preventDefault(); //comentar para provar las validaciones del backend
    }
    if(form.genre_id.value !== ""){
            form.genre_id.classList.add('is-valid');
            form.genre_id.classList.remove('is-invalid');
    }else{
        form.genre_id.classList.add('is-invalid');
        form.genre_id.classList.remove('is-valid');
        errors.push('Elija un genero!');
        event.preventDefault(); //comentar para probar las validaciones del backend
    }
    
    // function dateIsValid(date) {
    //     return date instanceof Date && !isNaN(date);
    // }
    
    // if(dateIsValid(form.release_date.value)){
    //         form.release_date.classList.add('is-valid');
    //         form.release_date.classList.remove('is-invalid');
    // }else{
    //     form.release_date.classList.add('is-invalid');
    //     form.release_date.classList.remove('is-valid');
    //     errors.push('Elija una fecha correcta!');
    // event.preventDefault(); //comentar para provar las validaciones del backend
    // }


})
}
