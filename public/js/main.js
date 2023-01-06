const chatForm = document.getElementById('chat-form')
const chatMessages = document.querySelector('.chat-messages'); 

//Get username and password

const {username,room} = Qs.parse(location.search, {
  ignoreQueryPrefix:true,
});
console.log(username,room)

const socket = io()

//join chat room

socket.emit('joinRoom',{username,room})


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

  //clear input
  e.target.elements.msg.value='';
  e.target.elements.msg.focus();
  

 })

 //output msg to dom

 function outputMessage(message){
     const div = document.createElement('div');
     div.classList.add('message');
     div.innerHTML = ` <p class="meta">${message.username}<span>${message.time}</span></p>
     <p class="text">
       ${message.text}
     </p> `;
     document.querySelector('.chat-messages').appendChild(div);
 }