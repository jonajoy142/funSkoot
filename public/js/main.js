const socket = io()
const chatForm = document.getElementById('chat-form')

//msg from client
socket.on('message',message=>{
    console.log(message)
    outputMessage(message)
})

chatForm.addEventListener('submit',(e)=>{
  e.preventDefault()
 
  //get msg text
  const msg = e.target.elements.msg.value

  //emit msg to server
 
  socket.emit('chatMessage',msg)
 })

 //output msg to dom