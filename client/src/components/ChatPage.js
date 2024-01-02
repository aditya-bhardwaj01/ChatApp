import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import '../App.css'
import { useSelector } from 'react-redux'
import socket from '../socket';

const ChatPage = () => {
  const navigate = useNavigate();
  const name = useSelector(state => state.personName.personName);

  window.addEventListener('popstate', function (event) {
    socket.disconnect();
  });

  useEffect(() => {
    const messageContainer = document.querySelector('.messages');

    // console.log(`Socket connected: ${socket.connected}`);

    if (!socket.hasEmittedNewUser) {
      socket.emit('new-user-joined', name);
      socket.hasEmittedNewUser = true;
    }

    socket.on('user-joined', (msg) => {
      // console.log(msg)
      const messageDiv = document.createElement('div');
      messageDiv.classList.add('left');
      messageDiv.classList.add('join');

      const messageP = document.createElement('p');
      messageP.innerText = msg + ' joined the chat';
      messageDiv.append(messageP);
      messageContainer.append(messageDiv);
    });

    socket.on('receive', (data) => {
      const messageDiv = document.createElement('div');
      messageDiv.classList.add('left');

      const messageP = document.createElement('p');

      const messageSpan = document.createElement('span');
      messageSpan.classList.add('sender-name');
      messageSpan.innerText = data.name + ': ';

      messageP.append(messageSpan);
      messageP.append(data.message);
      messageDiv.append(messageP)
      messageContainer.append(messageDiv)
    });

    socket.on('left', (msg) => {
      const messageDiv = document.createElement('div');
      messageDiv.classList.add('left');
      messageDiv.classList.add('leave');

      const messageP = document.createElement('p');
      messageP.innerText = msg + ' left the chat';
      messageDiv.append(messageP);
      messageContainer.append(messageDiv);
    });

    // Cleanup function to remove event listeners when the component unmounts
    return () => {
      socket.off('user-joined');
      socket.off('receive');
      socket.off('left');
    };
  }, []);

  const sendMessage = () => {
    const msg = document.getElementById('messageInp').value;
    document.getElementById('messageInp').value = '';
    socket.emit('send', msg);

    const messageContainer = document.querySelector('.messages');

    const messageDiv = document.createElement('div');
    messageDiv.classList.add('right');

    const messageP = document.createElement('p');

    const messageSpan = document.createElement('span');
    messageSpan.classList.add('sender-name');
    messageSpan.innerText = name + ': ';

    messageP.append(messageSpan);
    messageP.append(msg);
    messageDiv.append(messageP)
    messageContainer.append(messageDiv)
  }

  const exitChat = () => {
    socket.disconnect();
    navigate('/');
  }


  return (
    <div className='ChatPage'>
      <h3 style={{ padding: '10px' }}>
        Welcome {name}!!
        <button className='exit-chat' onClick={exitChat}>Exit Chat</button>
      </h3>

      <div className="message-area">
        <div className="messages">
        </div>
        <div className="type-send">
          <input type="text" placeholder='Type your message' className='type-msg' id='messageInp' />
          <button onClick={sendMessage} className='send-msg'>Send</button>
        </div>
      </div>
    </div>
  )
}

export default ChatPage