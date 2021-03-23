var Quagga = require('quagga').default;

Quagga.decodeSingle({
    src: "image-abc-123.jpg",
    numOfWorkers: 0,  // Needs to be 0 when used within node
    inputStream: {
        size: 800  // restrict input-size to be 800px in width (long-side)
    },
    decoder: {
        readers: ["code_128_reader"] // List of active readers
    },
}, function(result) {
    if(result.codeResult) {
        console.log("result", result.codeResult.code);
    } else {
        console.log("not detected");
    }
});