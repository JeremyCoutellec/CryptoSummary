import React from 'react';
import renderer from 'react-test-renderer';
import CitySelect from '../views/CitySelect';

test('CitySelect rendering', () => {
    const propsCity = {
        title: 'City',
        min: 2,
        max: 50,
        defaultValue: 'Toulouges',
    };
    const component = renderer.create(<CitySelect value={'Toulouges'} {...propsCity} />);
    const citySelect = component.toJSON();
    expect(citySelect).toMatchSnapshot();
});
