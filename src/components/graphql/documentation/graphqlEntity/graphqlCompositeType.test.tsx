import { GraphqlCompoisteType } from './graphqlCompoisteType';
import { __Type, __TypeKind } from '@app_types/graphql';
import { renderWithProviders } from '@test/renderWithProviders';
import { screen } from '@testing-library/react';
import { describe, expect, it, vitest } from 'vitest';

const baseType: __Type = {
  kind: __TypeKind.SCALAR,
  name: 'String',
  ofType: null,
};

describe('Test rendering composite type', () => {
  it('Should render base type', () => {
    renderWithProviders(<GraphqlCompoisteType type={baseType} handleClick={vitest.fn()} />);
    const typeText = screen.getByText('String');
    expect(typeText).toBeInTheDocument();
  });
  it('Should render non null type', () => {
    const nonNullType: __Type = {
      kind: __TypeKind.NON_NULL,
      ofType: baseType,
    };
    renderWithProviders(<GraphqlCompoisteType type={nonNullType} handleClick={vitest.fn()} />);
    const typeText = screen.getByText('String');
    const nonNullText = screen.getByText('!');
    expect(typeText).toBeInTheDocument();
    expect(nonNullText).toBeInTheDocument();
  });
  it('Should render list type', () => {
    const listType: __Type = {
      kind: __TypeKind.LIST,
      ofType: baseType,
    };
    renderWithProviders(<GraphqlCompoisteType type={listType} handleClick={vitest.fn()} />);
    const typeText = screen.getByText('String');
    const leftSquare = screen.getByText('[');
    const rightSquare = screen.getByText(']');
    expect(typeText).toBeInTheDocument();
    expect(leftSquare).toBeInTheDocument();
    expect(rightSquare).toBeInTheDocument();
  });
});
