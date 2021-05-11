import { GenericFunction, PromiseState } from "./types";

export class MyPromise<T> {
  state: PromiseState;
  fullfillFunction: GenericFunction<T> | undefined;
  rejectFunction: GenericFunction<T> | undefined;
  rejectFunctionCatch: GenericFunction<T> | undefined;


  constructor(providedFunction: (resolveCallback: GenericFunction<T>, rejectCallback: GenericFunction<T>) => void) {
    this.state = 'PENDING';
    providedFunction(this.resolve, this.reject);
  }

  then = (fullfillFunction: GenericFunction<T>, rejectFunction?: GenericFunction<T>) => {
    this.fullfillFunction = fullfillFunction;
    if (rejectFunction) {
      this.rejectFunction = rejectFunction;
    }
  }

  catch = (rejectFunction: GenericFunction<T>) => {
    this.rejectFunctionCatch = rejectFunction;
  }

  resolve = (resolveValue: T) => {
    if (this.state === 'PENDING') {
      if (this.fullfillFunction) {
        this.state = 'RESOLVED';
        this.fullfillFunction(resolveValue);
      }
    }
  }

  reject = (rejectedValue: T) => {
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