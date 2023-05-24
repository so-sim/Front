import { withRouter } from '../src/tests/withRouter';
import { initialize, mswDecorator } from 'msw-storybook-addon';
import { handler } from '../src/mocks/handler';
initialize();

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  msw: {
    handlers: handler,
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

export const decorators = [mswDecorator, (Story) => withRouter(<Story />)];

new Promise((resolve) => {
  resolve(require('../src/mocks/browser')) //
    .then(({ worker }) => worker.start());
});
