import React from 'react';
import renderer from 'react-test-renderer';
import Filters, { UnwrapperFilters } from '../client/src/components/Filters.jsx';
import DatePicker from 'react-datepicker';
import { shallow, mount } from 'enzyme';
import moment from 'moment';
import PlacesAutocomplete from 'react-places-autocomplete';

describe('<Filters />', () => {
  it('should contain PlacesAutocomplete', () => {
    const component = shallow(<UnwrapperFilters />);
    expect(component.containsAllMatchingElements([
      <PlacesAutocomplete />
    ]));
  });
});
