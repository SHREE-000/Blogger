import { Readless } from '../../../components/shared/components/molecularComponents/card';
import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Link: jest.fn().mockImplementation(({ to, state, className, children }) => (
    <a href={to} className={className} data-testid="mock-link" state={state}>
      {children}
    </a>
  )),
}));

describe("Card", () => {
    test("Renders correctly", () => {
        const title = 'Sample title';
        const userId ='sampleUserId';
        const desc =  'sample desc';
        const id = 'sample id';
        const media = 'sample media';
        render(<MemoryRouter>
        <Readless 
            desc={desc}
            media={media}
            id={id}
        title={title} 
        userId={userId}/>
        </MemoryRouter>)
        const headingElem = screen.getByRole("heading", {
            level: 2
        })
        expect(headingElem).toHaveTextContent(title);
        const img = screen.getByAltText(/card/i);
        expect(img).toBeInTheDocument();
        const image = screen.getByRole("img");
        expect(image).toBeInTheDocument();
        const paragraph = screen.getByText(desc);
        expect(paragraph).toHaveTextContent(desc);
        // const link = screen.getByTestId("link");
        // expect(link).toBeInTheDocument();
    })
})