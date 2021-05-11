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

  it('resolves asynchronously', async (done) => {
    expect.assertions(1);
    return new MyPromise((resolve) => {
      setTimeout(() => {
        resolve('Async resolve complete')
      }, 50);
    }).then((resolvedValue: any) => {
      expect(resolvedValue).toBe('Async resolve complete');
      done();
    })
  })

  it('rejects asynchronously', async (done) => {
    expect.assertions(1);
    return new MyPromise((resolve, reject) => {
      setTimeout(() => {
        reject('Async reject complete')
      }, 50);
    }).catch((rejectedValue: any) => {
      expect(rejectedValue).toBe('Async reject complete');
      done();
    })
  })
});