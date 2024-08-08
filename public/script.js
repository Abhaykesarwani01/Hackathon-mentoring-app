import { Html5Qrcode } from 'html5-qrcode';

document.addEventListener('DOMContentLoaded', () => {
    // Initialize the QR code scanner
    const html5QrCode = new Html5Qrcode("qr-scanner");

    // Function to handle QR code scan result
    function onScanSuccess(decodedText, decodedResult) {
        // Display the result in the result div
        document.getElementById('result').innerText = `Scanned URL: ${decodedText}`;
        
        // Optionally, you can redirect to the scanned URL
        // window.location.href = decodedText;
    }

    // Function to handle QR code scan error
    function onScanError(errorMessage) {
        console.log(`QR Code Scan Error: ${errorMessage}`);
    }

    // Start the QR code scanner
    html5QrCode.start(
        { facingMode: "environment" },  // Use the environment (back) camera
        {
            fps: 10,    // Frames per second
            qrbox: { width: 250, height: 250 }  // Size of the scanning box
        },
        onScanSuccess,
        onScanError
    ).catch(err => {
        console.error(`QR Code Scanner Error: ${err}`);
    });
});
