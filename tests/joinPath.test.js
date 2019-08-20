import { joinPath } from '../src/utils';

describe('test for the function joinPath cases', () => {
  it('checks join path', () => {
    const test1 = joinPath(['../examples', 'play/play.js']);
    console.log(test1);
    expect(test1).not.toBeUndefined();
  });

  it('checks resolve path', () => {
    const dirs = ['../examples', '../../sd/tests', '../src/files.js'];
    const test2 = joinPath(dirs, true);
    console.log(test2);
    expect(test2).not.toBeUndefined();
  });
});
