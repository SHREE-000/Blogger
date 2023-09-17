import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import { SubmitButton } from '../../../components/shared/components/atomicComponents/SubmitButton';

describe("Button", () => {
    test('calls onClick function when button is clicked', () => {
        const onClickMock = jest.fn();
      render(
          <SubmitButton onClick={onClickMock} type="submit" name="Submit" />
        );
        const submitButton = screen.getByText('Submit');
        fireEvent.click(submitButton);
        expect(onClickMock).toHaveBeenCalledTimes(1);
      });
      
    test('renders button with the provided name and type', () => {
      render(
          <SubmitButton onClick={() => {}} type="submit" name="Submit" />
        );
        const submitButton = screen.getByText('Submit');
        expect(submitButton).toHaveAttribute('type', 'submit');
      });
      
})