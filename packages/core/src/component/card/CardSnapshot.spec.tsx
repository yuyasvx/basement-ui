import { render } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { Card, CardVariant } from './Card';

describe('Card Snapshot', () => {
  test('Card Propsを何も指定しないとき、style属性のオーバーライドが発生しない', () => {
    const { container } = render(
      <>
        <Card>
          <div>content</div>
        </Card>
        <Card variantOption={{}}>
          <div>content</div>
        </Card>
      </>,
    );
    expect(container.childNodes).toMatchSnapshot();
  });

  test('Card Propsに何か指定すると、style属性のオーバーライドが発生する', () => {
    const { container } = render(
      <>
        <Card
          variantOption={{
            shadow: 10,
            borderColor: '#000',
          }}
        >
          <div>content</div>
        </Card>
        <Card radius={2}>
          <div>content</div>
        </Card>
        <Card backdropBlur={1}>
          <div>content</div>
        </Card>
        <Card backgroundAlpha={1}>
          <div>content</div>
        </Card>
        <Card baseColor="#000">
          <div>content</div>
        </Card>
      </>,
    );
    expect(container.childNodes).toMatchSnapshot();
  });

  test('Variantの指定が効いている', () => {
    const { container } = render(
      <>
        <Card variant={CardVariant.BORDER}>
          <div>content</div>
        </Card>
        <Card variant={CardVariant.SHADOW}>
          <div>content</div>
        </Card>
      </>,
    );
    expect(container.childNodes).toMatchSnapshot();
  });

  test('Card Propsは何も指定しないが、標準の属性（class, id, tabindexなど）を渡したとき、反映される', () => {
    const { container } = render(
      <Card className="test-class" id="card-id" tabIndex={1}>
        <div>content</div>
      </Card>,
    );
    expect(container.childNodes).toMatchSnapshot();
  });

  test('Card Props指定あり＆styleありの場合、統合される', () => {
    const { container } = render(
      <Card radius={6} variantOption={{ shadow: 5 }} style={{ width: '100px', borderRadius: '1px' }}>
        <div>content</div>
      </Card>,
    );
    expect(container.childNodes).toMatchSnapshot();
  });
});
