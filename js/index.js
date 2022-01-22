const email = document.querySelector("#email");
const asunto = document.querySelector("#asunto");
const mensaje = document.querySelector("#mensaje");
const form = document.querySelector("form");
const btnSend = document.querySelector("#send");
const btnReset = document.querySelector("#reset_form");
let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
block_buttons();

email.focus();
email.addEventListener("blur", validar_campos);
asunto.addEventListener("blur", validar_campos);
mensaje.addEventListener("blur", validar_campos);
btnReset.addEventListener('click',(e)=>{
	e.preventDefault();
	form.reset();
	email.focus();
})

btnSend.addEventListener('click',(e)=>{
	e.preventDefault();
	let spinner = document.querySelector('.spinner');
	spinner.classList.remove('d-none');
	setTimeout(()=>{
		spinner.classList.add('d-none');
		form.reset();
	},3000);
	setTimeout(()=>{
		crear_mensaje_enviado();
	},3000);
	setTimeout(()=>{
		let error = document.querySelector('p.success_message');
		if(error){
			error.remove();
		}
	},6000);
})

function validar_campos(e) {
  let value = e.target.value;

  if (value.length == 0) {
    crear_mensaje_error("Todos los campos son necesarios");
    border_red(e);
  } else {
	borrar_mensaje_error();
    border_green(e);
  }

  if(e.target.type === 'email'){
	 
	  if(re.test(e.target.value)){
		borrar_mensaje_error();
		border_green(e);
	}else{
		crear_mensaje_error("El email no es válido");
		border_red(e);
	}
  }



  if (
    re.test(email.value) &&
    asunto.value.length > 0 &&
    mensaje.value.length > 0
  ) {
    enable_buttons();
  } else {
    block_buttons();
  }
}

function crear_mensaje_error(mensaje) {
  let span = document.createElement("p");
  span.textContent = mensaje;
  span.classList.add(
    "border",
    "border-danger",
    "text-danger",
    "d-block",
    "error",
    "p-2",
    "text-center"
  );
  let error = document.querySelectorAll(".error");
  if (error.length === 0) {
    form.appendChild(span);
  }
//   setTimeout(() => {
//     document.querySelector(".error").remove();
//   }, 3000);
}

function crear_mensaje_enviado() {
	let span = document.createElement("p");
	span.textContent = 'Mensaje enviado con exito';
	span.classList.add(
	  "border",
	  "border-success",
	  "text-success",
	  "d-block",
	  "success_message",
	  "p-2",
	  "text-center"
	);
	let error = document.querySelectorAll(".error");
	if (error.length === 0) {
	  form.appendChild(span);
	}
  //   setTimeout(() => {
  //     document.querySelector(".error").remove();
  //   }, 3000);
  }

function borrar_mensaje_error() {
	let error = document.querySelector('p.error');
	if(error){
		error.remove();
	}
  }

function block_buttons() {
  btnSend.disabled = true;
  btnSend.classList.add("bg-secondary", "border-secondary");
//   btnReset.disabled = true;
}
function enable_buttons() {
  btnSend.disabled = false;
//   btnReset.disabled = false;
  btnSend.classList.remove("bg-secondary", "border-secondary");
}

function border_green(e) {
  e.target.classList.remove("border", "border-danger");
  e.target.classList.add("border", "border-success");
}

function border_red(e) {
  e.target.classList.remove("border", "border-success");
  e.target.classList.add("border", "border-danger");
}
