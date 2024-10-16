import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect } from "react";

const QrReader = () => {
    useEffect(() => {
        const scanner = new Html5QrcodeScanner("qr-reader", {
          fps: 10,
          qrbox: 250,
        });
    
        scanner.render(
          (result) => {
            console.log(result); // Student ID
            checkAttendance(result);
          },
          (error) => {
            console.warn(error);
          }
        );
    
        return () => {
          scanner.clear();
        };
      }, []);
    
      const checkAttendance = (studentId) => {
        alert(studentId)
      };
    
      return <div id="qr-reader" />;
}

export default QrReader