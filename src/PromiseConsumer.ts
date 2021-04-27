import { MyPromise } from './MyPromise';

const myPromise = new MyPromise((resolve: (value: string) => void, reject: any) => {
  console.log('Starting mission');
  setTimeout(() => {
    resolve('Mission complete!');
  }, 2000);
  setTimeout(() => {
    reject('Mission failed!');
  }, 1000);
});

myPromise.then((message: any) => console.log(message), (failureMessage: any) => console.log(failureMessage));