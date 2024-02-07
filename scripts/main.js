/* Importações */
import { perguntas } from './questions.js';

/* Elementos */
const quiz = document.querySelector('#quiz');
const template = document.querySelector('template');

const correct = new Set();
const totalQuestions = perguntas.length;
const showTotal = document.querySelector('#hits span');

showTotal.textContent = correct.size + ' de ' + totalQuestions;


// loop ou laço de repetição
for(const item of perguntas) {
  const quizItem = template.content.cloneNode(true);
  quizItem.querySelector('h3').textContent = item.pergunta;
  
  for(let resposta of item.respostas) {
    const dt = quizItem.querySelector('dl dt').cloneNode(true);
    dt.querySelector('span').textContent = resposta;
    dt.querySelector('input').setAttribute('name', 'pergunta-' + perguntas.indexOf(item));
    dt.querySelector('input').value = item.respostas.indexOf(resposta);
    dt.querySelector('input').onchange = event => {
      const isRight = event.target.value == item.correta;

      correct.delete(item);
      if(isRight) {
        correct.add(item);
      };

      showTotal.textContent = correct.size + ' de ' + totalQuestions;
    };

    quizItem.querySelector('dl').appendChild(dt);
  }
  
  quizItem.querySelector('dl dt').remove();
  
  // coloca a pergunta na tela
  quiz.appendChild(quizItem);
}
