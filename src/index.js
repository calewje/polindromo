import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
/* 
const validacion = /^[0-9]+[+\-*]{1}[0-9]+$/;
const validacion2 = /^[0-9]+[+\-/*][(][0-9]+[+\-/*]{1}[0-9]+[)]+$/; 
const validacion3 = /^[(][0-9]+[+\-/*][0-9]+[)]+[+\-/*]{1}[0-9]+$/;
*/

const validacion = (vali) => vali.match(/\d+(\.\d+)?|\+|\-|\*|\/|\(|\)/g);

let btn_calcular = document.getElementById("btn_calcular");
let expresion = document.getElementById("expresion");

const orden = {
  "+": 1,
  "-": 1,
  "*": 2,
  "/": 2
};



const validar_parentesis=(vali)=>{
  let count = 0;
  for (let i of vali) {
    if (i === "(") count++;
    if (i === ")") count--;
    if (count < 0) return false;
  }
  return count === 0;
}
const notacion_postfija = (expresion2) => {
  let salida = [];
  let operadores = [];
  let separador = validacion(expresion2); 

  separador.forEach(separado => {
    if (!isNaN(separado)) {
      salida.push(separado);
    } else if (separado in orden) {
      while (
        operadores.length &&
        orden[operadores[operadores.length - 1]] >= orden[separado]
      ) {
        salida.push(operadores.pop());
      }
      operadores.push(separado);
    } else if (separado === "(") {
      operadores.push(separado);
    } else if (separado === ")") {
      while (operadores.length && operadores[operadores.length - 1] !== "(") {
        salida.push(operadores.pop());
      }
      operadores.pop(); 
    }
  });

  while (operadores.length) {
    salida.push(operadores.pop());
  }

  return salida;
};

const notacion_prefija = (postfija) => {
  let agrupar = [];
  postfija.forEach(separado => {
    if (!isNaN(separado)) {
      agrupar.push(separado);
    }else {
      let b = agrupar.pop()
      let b3 = b.split(/[+-/*]/);
      b3 = b3.filter(Boolean);
      console.log(b);
      let b2 = b[0].split(/[0-9]/);
      b2 = b2.filter(Boolean);
      console.log(b2[0]);
      
      let a = agrupar.pop();
      let a3 = a.split(/[+-/*]/);
      a3 = a3.filter(Boolean);
      console.log(a[0].split(/[0-9]/));
      let a2 = a[0].split(/[0-9]/);
      a2 = a2.filter(Boolean);
      console.log(a2[0]);
      
      agrupar.push(separado +" "+a2+" "+b2+" " + a3 + " " + b3);
    }
  });
  //console.log(agrupar.pop());

  return agrupar.pop();
};

const tiempo=(inicio)=>{
  const fin = performance.now();
  const tiempo = (fin - inicio).toFixed(5);
  return tiempo;
}


btn_calcular.addEventListener("click", () => {
  let inicio = performance.now();

  let expresion2 = expresion.value.replace(/\s+/g, "");
  if (!expresion2 || !validar_parentesis(expresion2)) {
    alert("Expresión inválida");
    return;
  }
  
  let infija = `<p><strong>Notación infija:</strong> ${expresion2}</p>`;
  let temporizador = tiempo(inicio);

  let nota_postfija = notacion_postfija(expresion2);
  let postfija = `<p><strong>Notación postfija:</strong> ${nota_postfija.join(" ")}</p>`;
  let temporizador1 = tiempo(inicio);
  
  let nota_prefija = notacion_prefija(nota_postfija);
  let prefija = `<p><strong>Notación prefija:</strong> ${nota_prefija}</p>`;
  let temporizador2 = tiempo(inicio);


  let tiempo1 =`<p><strong>Tiempo de ejecucion:</strong> ${temporizador} ms en ejecutarse</p>`;
  let tiempo2 =`<p><strong>Tiempo de ejecucion:</strong> ${temporizador1} ms en ejecutarse</p>`;
  let tiempo3 =`<p><strong>Tiempo de ejecucion:</strong> ${temporizador2} ms en ejecutarse</p>`;
  
  document.getElementById("contenido_notacion").innerHTML = `
    ${infija}
    ${tiempo1}
    ${prefija}
    ${tiempo2}
    ${postfija}
    ${tiempo3}
    
    
  `/* ;
  document.getElementById("temporizador").innerHTML = `
    ${timeEnd('Temporizador')}
  `; */
}); 




/*
const notacion_infija =(expresion)=>{
    return`<p><strong>Notación infija:</strong> ${expresion}</p>`
}

const notacion_prefija = (operacion,operadores)=>{
    return`<p><strong>Notación prefija:</strong> ${operacion.join(" ")}  ${operadores.join(" ")}</p>`
}

const notacion_postfija = (operadores,operacion)=>{
        return`<p><strong>Notación postfija:</strong> ${operadores.join(" ")}  ${operacion.join(" ")}</p>`

} 



btn_calcular.addEventListener("click", ()=>{
    let expresion2 = expresion.value;
    let infija="";
    let prefija= "";
    let postfija="";
    if(validacion.test(expresion2)){
        infija = notacion_infija(expresion2);
         
        //alert("operacion valida");
        //let operadores = expresion.split(/[+-/*]/);
        //console.log(operadores);
        //let operacion = expresion.split(/[0-9]/);
        //operacion = operacion.filter(Boolean);
        //console.log(operacion);
        //let infija = expresion;
        //return infija; 
        let operadores = expresion2.split(/[+\-* / ]/g) || [];
        //console.log(operadores);
        let operacion = expresion2.split(/\d+/g) || [];
        //operacion = operacion.filter(Boolean);
        prefija = notacion_prefija(operacion,operadores);

        postfija = notacion_postfija(operadores,operacion);



    }else if(validacion2.test(expresion2)){
        infija = notacion_infija(expresion2);
        let operadores = expresion2.split(/[+\-* /]/g);
        //console.log(operadores);
        let operacion = expresion2.split(/\d+/g);
        //operacion = operacion.replace(",","");
        //console.log(operacion);
        prefija = notacion_prefija(operacion,operadores);

    }else{
        alert("Invalido");
    }
    
    document.getElementById("contenido_notacion").innerHTML=`
            ${infija}
            ${prefija}
            ${postfija}
        `;
        

});

*/


/* const validacion = /^[0-9]+[+\-*]{1}[0-9]+$/;
const validacion2 = /^[0-9]+[+\-/*][(][0-9]+[+\-/*]{1}[0-9]+[)]+$/;

 */
/* let btn_calcular =document.getElementById("btn_calcular");
let expresion = document.getElementById("expresion");

const notacion_infija =(expresion)=>{
    return`<p><strong>Notación infija:</strong> ${expresion}</p>`
}

const notacion_prefija = (operacion,operadores)=>{
    return`<p><strong>Notación prefija:</strong> ${operacion.join(" ")}  ${operadores.join(" ")}</p>`
}

const notacion_postfija = (operadores,operacion)=>{
        return`<p><strong>Notación postfija:</strong> ${operadores.join(" ")}  ${operacion.join(" ")}</p>`

}  */

/*

btn_calcular.addEventListener("click", ()=>{
    let expresion2 = expresion.value;
    let infija="";
    let prefija= "";
    let postfija="";
    if(validacion.test(expresion2)){
        infija = notacion_infija(expresion2);
         alert("operacion valida");
        let operadores = expresion.split(/[+-/*]/);
        console.log(operadores);
        let operacion = expresion.split(/[0-9]/);
        operacion = operacion.filter(Boolean);
        console.log(operacion);
        let infija = expresion;
        return infija; 
        let operadores = expresion2.split(/[+\-* / ]/g) || [];
        //console.log(operadores);
        let operacion = expresion2.split(/\d+/g) || [];
        //operacion = operacion.filter(Boolean);
        prefija = notacion_prefija(operacion,operadores);

        postfija = notacion_postfija(operadores,operacion);



    }else if(validacion2.test(expresion2)){
        let operadores = expresion2.split(/[+\-* /]/g);
        //console.log(operadores);
        let operacion = expresion2.split(/\d+/g);
        //operacion = operacion.replace(",","");
        //console.log(operacion);
        prefija = notacion_prefija(operacion,operadores);

    }else{
        alert("Invalido");
    }
    
    document.getElementById("contenido_notacion").innerHTML=`
            ${infija}
            ${prefija}
            ${postfija}
        `;
        

});

*/



