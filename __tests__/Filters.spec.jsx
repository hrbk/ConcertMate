import React from 'react';
import renderer from 'react-test-renderer';
import Filters from '../client/src/components/Filters.jsx';
import DatePicker from 'react-datepicker';
import { shallow, mount } from 'enzyme';
import moment from 'moment';

xdescribe('<Filters />', () => {
  it('should renders correctly', () => {
    const component = renderer.create(<Filters />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});