import { getBaseComponentProps } from './BaseComponent';

describe('Base Component', () => {
  test('共通のプロパティだけ抽出すること', () => {
    expect(
      getBaseComponentProps({ tabIndex: 2, id: 'abc', hoge: 'def', fuga: true, style: { width: '123px' } })
    ).toEqual({
      tabIndex: 2,
      id: 'abc',
      style: { width: '123px' }
    });
  });

  test('ネイティブなプロパティはマージされること', () => {
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

  test('classNameは共通プロパティ抽出の対象外である', () => {
    expect(
      getBaseComponentProps({ tabIndex: 2, id: 'abc', style: { width: '123px' }, className: 'classname-test' })
    ).toEqual({ tabIndex: 2, id: 'abc', style: { width: '123px' } });
  });
});
