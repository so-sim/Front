import { withRouter } from '../src/tests/withRouter';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    default: 'lightgray',
    values: [
      {
        name: 'lightgray',
        value: '#F1F2F3',
      },
      {
        name: 'white',
        value: '#000000',
      },
    ],
  },
};
export const decorators = [(Story) => withRouter(<Story />)];
