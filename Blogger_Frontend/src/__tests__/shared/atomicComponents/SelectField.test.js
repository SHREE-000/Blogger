import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import { SelectField } from '../../../components/shared/components/atomicComponents/SelectField';

describe("Select", () => {
    const options = [
        "India", 
        "England",
        "Australia",
        "NewZealand",
    ]
    const onChangeMock = jest.fn();
    test('correctly renders select options', () => {
      render(
          <SelectField options={options} onChange={onChangeMock} name="Select" />
        );
        const selectElem = screen.getByRole('combobox');
        options?.map(option => {
            expect(selectElem).toHaveTextContent(option);
        })
      });
      
    test('calls onChange function when select is changed', () => {
      render(
        <SelectField onChange={onChangeMock} options={options} />
        );
        const selectElem = screen.getByRole('combobox');
         fireEvent.change(selectElem);
        expect(onChangeMock).toHaveBeenCalledTimes(1);
      });
      
})