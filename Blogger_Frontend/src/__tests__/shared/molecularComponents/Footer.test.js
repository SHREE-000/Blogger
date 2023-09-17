import { screen, render } from '@testing-library/react'
import { Footer } from '../../../components/shared/components/molecularComponents/footer';

describe("Error Message", () => {
    test("Renders Correctly", ()=> {
        render(<Footer />);
        const footerElem = screen.getByTestId("footer");
        expect(footerElem).toBeInTheDocument();
    });
})