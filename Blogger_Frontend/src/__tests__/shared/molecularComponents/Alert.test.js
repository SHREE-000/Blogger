import { screen, render } from '@testing-library/react'
import { Alert } from '../../../components/shared/components/molecularComponents/Alert';

describe("Alert", () => {
    test("Renders Correctly", ()=> {
        render(<Alert />);
        const errorElem = screen.getByTestId("alert");
        expect(errorElem).toBeInTheDocument();
    })
    test('renders alert message correctly', () => {
        const errorMessage = 'This is an error message';
        render(<Alert msg={errorMessage} />);
        const errorElement = screen.getByText(errorMessage);
        expect(errorElement).toBeInTheDocument();
      });
})