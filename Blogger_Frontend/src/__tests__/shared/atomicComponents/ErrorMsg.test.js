import { screen, render } from '@testing-library/react'
import { ErrorMsg } from '../../../components/shared/components/atomicComponents/ErrorMsg';

describe("Error Message", () => {
    test("Renders Correctly", ()=> {
        render(<ErrorMsg />);
        const errorElem = screen.getByTestId("error");
        expect(errorElem).toBeInTheDocument();
    })
    test('renders error message correctly', () => {
        const errorMessage = 'This is an error message';
        render(<ErrorMsg msg={errorMessage} />);
        const errorElement = screen.getByTestId('error');
        expect(errorElement).toHaveTextContent(errorMessage);
      });
})