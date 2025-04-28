let conn = null;

const targetId = location.hash.substring(1);
const peer = new Peer();

peer.on('open', () => {
  conn = peer.connect(targetId);

  conn.on('open', () => {
    console.log('Connected to game!', navigator);
    const phoneData = {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
    };

    conn.send({ type: 'deviceInfo', data: phoneData });
  });

  conn.on('error', (err) => {
    console.error('Connection error:', err);
  });
});

function sendAction(action) {
  console.log('Sending action:', action);
  if (conn && conn.open) {
    conn.send({ type: action });
  } else {
    console.warn('Connection not open, cannot send:', action);
  }
}

// Bind immediately
console.log('Binding buttons', document.getElementById('up'));
document.getElementById('up').addEventListener('click', () => {
  console.log('up');
});
document.getElementById('up').onclick = () => sendAction('up');
document.getElementById('down').onclick = () => sendAction('down');
document.getElementById('left').onclick = () => sendAction('left');
document.getElementById('right').onclick = () => sendAction('right');

document.getElementById('a').onclick = () => sendAction('a');
document.getElementById('b').onclick = () => sendAction('b');
document.getElementById('start').onclick = () => sendAction('start');
