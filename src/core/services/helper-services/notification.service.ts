import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  static  fireNotification(message: string, isSuccess : boolean = true) : void
  {
    let timerInterval : any;

    Swal.fire({
        title: isSuccess ? "عملية ناجحة" : "فشلت العملية",
        html: `<p> ${message}</p>`,
        timer: 2000,
        timerProgressBar: true,
        background : isSuccess ? "#006400" : "#8B0000",
        color : "white",
        didOpen: () => {
          Swal.showLoading();
          const timer = Swal.getPopup()?.querySelector("b");
          timerInterval = setInterval(() => 
            {
              if(timer)
                timer!.textContent = `${Swal.getTimerLeft()}`;
            }, 500);
        },
        willClose: () => {
          clearInterval(timerInterval);
        }
    })
  }
}
