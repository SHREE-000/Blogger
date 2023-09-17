import { screen, render } from '@testing-library/react'
import { Spinner } from '../../../components/shared/components/atomicComponents/Spinner';

describe("Error Message", () => {
    test("Renders Correctly", ()=> {
        render(<Spinner />);
        const spinnerElem = screen.getByTestId("spinner");
        expect(spinnerElem).toBeInTheDocument();
    })
})