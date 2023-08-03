const qrText = document.getElementById('qr-text');
const sizes = document.getElementById('sizes');
const generateBtn = document.getElementById('generateBtn');
const downloadBtn = document.getElementById('downloadBtn');
const qrContainer = document.querySelector('.qr-body');

let size = sizes.value;
generateBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    isEmptyInput();
});

sizes.addEventListener('change',(e)=>{
    size = e.target.value;
    isEmptyInput();
});

downloadBtn.addEventListener('click', () => {
    let img = document.querySelector('.qr-body img');

    if (img !== null) {
        let imgAtrr = img.getAttribute('src');
        downloadImage(imgAtrr, 'QR_Code.png');
    } else {
        let canvas = document.querySelector('canvas');
        if (canvas !== null) {
            let canvasDataUrl = canvas.toDataURL();
            downloadImage(canvasDataUrl, 'QR_Code.png');
        }
    }
});

function downloadImage(dataUrl, fileName) {
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = fileName;

    // Crée un événement de clic simulé
    const clickEvent = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: false
    });

    // Déclenche l'événement de clic simulé
    link.dispatchEvent(clickEvent);
}


function isEmptyInput(){
    // if(qrText.value.length > 0){
    //     generateQRCode();
    // }
    // else{
    //     alert("Enter the text or URL to generate your QR code");
    // }
    qrText.value.length > 0 ? generateQRCode() : alert("Enter the text or URL to generate your QR code");;
}
function generateQRCode(){
    qrContainer.innerHTML = "";
    new QRCode(qrContainer, {
        text:qrText.value,
        height:size,
        width:size,
        colorLight:"#fff",
        colorDark:"#000",
    });
}
window.addEventListener('beforeunload', function(e) {
    e.preventDefault();
    e.returnValue = '';
});
