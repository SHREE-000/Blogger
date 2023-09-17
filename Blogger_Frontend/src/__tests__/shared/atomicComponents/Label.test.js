import { screen, render } from '@testing-library/react'
import { Label } from '../../../components/shared/components/atomicComponents/Label';

describe("Error Message", () => {
    test("Renders Correctly", ()=> {
        render(<Label />);
        const labelElem = screen.getByTestId("label");
        expect(labelElem).toBeInTheDocument();
    })
    test("Render the Label Correctly", ()=> {
        const labelText = "label text"
        render(<Label label={labelText} />);
        const labelElem = screen.getByText(labelText);
        expect(labelElem).toHaveTextContent(labelText);
    })
})