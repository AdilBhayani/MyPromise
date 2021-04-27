import { MyPromise } from "./MyPromise";

describe('MyPromise', () => {
  it('works for resolve', async () => {
    return new MyPromise((resolve) => resolve(1)).then((num: any) => {
      expect(num).toBe(1);
    });
  })

  it('works for reject', async () => {
    return new MyPromise((resolve, reject) => reject('Failure')).then(() => undefined, (rejectedValue: any) => {
      expect(rejectedValue).toBe('failure');
    })
  })

  it('resolves asynchronously', async () => {
    expect.assertions(1);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('Async resolve complete')
      }, 50);
    }).then((resolvedValue: any) => {
      expect(resolvedValue).toBe('Async resolve complete');
    })
  })

  it('rejects asynchronously', async () => {
    expect.assertions(1);
    return new MyPromise((resolve, reject) => {
      setTimeout(() => {
        reject('Async reject complete')
      }, 50);
    }).catch((rejectedValue: any) => {
      console.log('we checked this');
      expect(rejectedValue).toBe('Async reject complete');
    })
  })
});