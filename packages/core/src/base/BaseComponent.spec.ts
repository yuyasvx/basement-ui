import { getBaseComponentProps } from './BaseComponent';

describe('Base Component', () => {
  it('共通のプロパティだけ抽出すること', async () => {
    expect(
      getBaseComponentProps({ tabIndex: 2, id: 'abc', hoge: 'def', fuga: true, style: { width: '123px' } })
    ).toEqual({
      tabIndex: 2,
      id: 'abc',
      style: { width: '123px' }
    });
  });

  it('ネイティブなプロパティはマージされること', async () => {
    expect(
      getBaseComponentProps({
        tabIndex: 2,
        id: 'abc',
        style: { width: '123px' },
        nativeProps: { disabled: true, 'data-hogehoge': 'abc' }
      })
    ).toEqual({
      tabIndex: 2,
      id: 'abc',
      style: { width: '123px' },
      disabled: true,
      'data-hogehoge': 'abc'
    });
  });

  it('classNameは共通プロパティ抽出の対象外である', async () => {
    expect(
      getBaseComponentProps({ tabIndex: 2, id: 'abc', style: { width: '123px' }, className: 'classname-test' })
    ).toEqual({ tabIndex: 2, id: 'abc', style: { width: '123px' } });
  });
});
