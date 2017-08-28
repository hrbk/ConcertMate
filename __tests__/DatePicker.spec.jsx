import React from 'react';
import renderer from 'react-test-renderer';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { shallow } from 'enzyme';

describe('<DatePicker />', () => {
  it('should render correctly', () => {
    const component = renderer.create(<DatePicker />).toJSON();
    expect(component).toMatchSnapshot();
  });

  it('should start DatePicker with todays date', () => {
    const now = moment();
    const component = shallow(<DatePicker selected={now} />);
    expect(component.state().preSelection).toEqual(now)
  });
})
