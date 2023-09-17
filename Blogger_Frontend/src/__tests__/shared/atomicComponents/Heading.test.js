import { screen, render } from '@testing-library/react'
import { Heading2 } from '../../../components/shared/components/atomicComponents/Heading';

describe("Error Message", () => {
    test("Renders Correctly", ()=> {
        render(<Heading2 />);
        const headingElem = screen.getByRole("heading", {
            level: 2
        });
        expect(headingElem).toBeInTheDocument();
    });
    test("Render the Heading Correctly", ()=> {
        render(<Heading2 heading="HEADING" />);
        const headingElem = screen.getByText(/heading/i);
        expect(headingElem).toBeInTheDocument();
    });
})