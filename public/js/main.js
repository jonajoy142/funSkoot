const chatForm = document.getElementById('chat-form')
const chatMessages = document.querySelector('.chat-messages'); 

const socket = io()


//msg from client
socket.on('message',message=>{
    console.log(message)
    outputMessage(message)

    //scroll down

    chatForm.scrollTop = chatMessages.scrollHeight
})

chatForm.addEventListener('submit',(e)=>{
  e.preventDefault()
 
  //get msg text
  const msg = e.target.elements.msg.value

  //emit msg to server
 
  socket.emit('chatMessage',msg)
 })

 //output msg to dom

 function outputMessage(message){
     const div = document.createElement('div');
     div.classList.add('message');
     div.innerHTML = ` <p class="meta">Brad <span>9:12pm</span></p>
     <p class="text">
       ${message}
     </p> `;
     document.querySelector('.chat-messages').appendChild(div);
 }