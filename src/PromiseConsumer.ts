import { MyPromise } from './MyPromise';

const myPromise = new Promise((resolve: (value: string) => void, reject: (value: number) => void) => {
  console.log('Starting mission');
  setTimeout(() => {
    resolve('Mission complete!');
  }, 2000);
  setTimeout(() => {
    reject(9);
  }, 1000);
});

myPromise.then((message: any) => console.log(message), (failureMessage: any) => console.log(failureMessage));