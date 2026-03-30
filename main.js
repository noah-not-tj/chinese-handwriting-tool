const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
canvas.width = 1024;
canvas.height = 1024;

canvas.style.width = '250px';
canvas.style.height = '250px';
const ctx = canvas.getContext("2d");

ctx.translate(0, canvas.height-100);
ctx.scale(1, -1);

ctx.strokeStyle = 'black';
ctx.lineWidth = 20;


window.onerror = (e, l, s, c, r) => alert(r.stack);

let position = [0, 0];
let input = document.getElementById("input");
input.focus();
input.addEventListener('keydown', async (event) => {
  if (event.key === 'Enter') {
    //alert(`${input.value.length}`);
    await fetchanddraw(input.value);
    
    input.value = '';
  }
});


async function fetchanddraw(character) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  fetch(`https://raw.githubusercontent.com/chanind/hanzi-writer-data/refs/heads/master/data/${character}.json`).then((response) => response.text()).then(async (text) => {
    //alert(text);
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    json = JSON.parse(text);
    /*
    for (let stroke of json.medians) {
      position = [...stroke[0]];
      //sendToArduino(`M${position[0]}, ${position[1]}`);
      await sleep(500);
      for (let coord of stroke) {
        drawline(coord[0], coord[1]);
        await sleep(100);
      }
    }
    */
    for (let stroke of json.medians) {
      Serial.printLn("M,%d,%d\n", stroke[0]- position[0], stroke[1] - position[1]);
      for (let coord of stroke) {
        Serial.printLn("L,%d,%d\n", coord[0] - position[0], coord[1] - position[1]);
        await sleep(100);
      }
    }
  });
}

function drawline(x, y) {
  ctx.beginPath();
  ctx.moveTo(position[0], position[1]);
  ctx.lineTo(x, y); 
  //sendToArduino(`L${x}, ${y}`);
  ctx.stroke();
  ctx.closePath();
  position[0] = x;
  position[1] = y;
}
