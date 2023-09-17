import { screen, render, fireEvent } from '@testing-library/react'
import { InputField } from '../../../components/shared/components/atomicComponents/InputField';

describe("Input", () => {
    const placeholder = "Enter a value"
    const onChangeFunc = jest.fn();
    test("Renders correctly", () => {
        render(<InputField onChange={onChangeFunc} placeholder={placeholder} type="text" />)
        const inputElem = screen.getByPlaceholderText(placeholder);
        expect(inputElem).toBeInTheDocument();
        expect(inputElem).toHaveAttribute('type', 'text');
    })
    test('calls onChange function when input is changed', () => {
        render(<InputField onChange={onChangeFunc} placeholder={placeholder} value="" />)
        const inputElem = screen.getByPlaceholderText(placeholder);
        fireEvent.change(inputElem, { target: { value: 'New Value' } });
        expect(onChangeFunc).toHaveBeenCalledTimes(1);
    })
})