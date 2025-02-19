// global.d.ts
declare global {
    interface Window {
      recaptchaVerifier: any; // You can use a more specific type if you want
      confirmationResult: any; // You can use a more specific type if you want
    }
  }
  
  export {};