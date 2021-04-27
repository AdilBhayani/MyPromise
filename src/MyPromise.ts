import { PromiseState } from "./types";

export class MyPromise {
  state: PromiseState;
  fullfillFunction: Function | undefined;
  rejectFunction: Function | undefined;
  rejectFunctionCatch: Function | undefined;


  constructor(providedFunction: (resolveCallback: (value: any) => any, rejectCallback: any) => any) {
    this.state = 'PENDING';
    // After a lot of googling I realised I needed to bind this to the method
    providedFunction(this.resolve.bind(this), this.reject.bind(this));
  }

  then(fullfillFunction: Function, rejectFunction?: Function) {
    this.fullfillFunction = fullfillFunction;
    if (rejectFunction) {
      this.rejectFunction = rejectFunction;
    }
  }

  catch(rejectFunction: Function) {
    this.rejectFunctionCatch = rejectFunction;
  }

  resolve(resolveValue: any) {
    if (this.state === 'PENDING') {
      if (this.fullfillFunction) {
        this.state = 'RESOLVED';
        this.fullfillFunction(resolveValue);
      }
    }
  }

  reject(rejectedValue: any) {
    if (this.state === 'PENDING') {
      this.state = 'REJECTED';
      if (this.rejectFunction) {
        this.rejectFunction(rejectedValue);
      }
      if (this.rejectFunctionCatch) {
        this.rejectFunctionCatch(rejectedValue);
      }
    }
  }
}