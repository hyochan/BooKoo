import type {RenderAPI} from '@testing-library/react-native';
import {render, waitFor} from '@testing-library/react-native';

import Carousel from '../../../src/uis/Carousel';
import {createTestElement, createTestProps} from '../../testUtils';

let props: any;
let component: JSX.Element;
let testingLib: RenderAPI;

describe('Rendering', () => {
  beforeEach(() => {
    props = createTestProps();
    component = createTestElement(<Carousel {...props} />);
  });

  it('renders without crashing', async () => {
    testingLib = render(component);

    const baseElement = await waitFor(() => testingLib.toJSON());
    expect(baseElement).toBeTruthy();
  });
});
