import { CreateBlogs } from '../../../components/shared/components/molecularComponents/createBlog';
import { screen, render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Link: jest.fn().mockImplementation(({ to, state, className, children }) => (
    <a href={to} className={className} data-testid="mock-link" state={state}>
      {children}
    </a>
  )),
}));

describe("CreateBlog", () => {
    const options = [
        "India", 
        "England",
        "Australia",
        "NewZealand",
    ]
    const onChange = jest.fn();
    const props = {
        heading: "heading", 
        labelTitle: "title",
        titleValue: "titleValue",
        onChange: onChange,
        textType: "text",
        titleIdNameHtml: "name",
        titlePlaceHolder: "placeholder",
        topicIdNameHtml: "topic id",
        labelTopic: "topic",
        topicPlaceHolder: "label placeholder",
        topicValue: "topic value",
        descHtml: "desc Html",
        labelDesc: "desc",
        descValue: "desc value",
        descIdName: "desc id",
        selectIdNameHtml: "select id",
        labelSelect: "select",
        options: options,
        mediaLabel: "media",
        mediaIdNameHtml: "media id",
        mediaValue: "media value",
        fileType: "media/multipart",
        handleClick: () => {},
        submitType: "submit",
        buttonName: "Submit",
        error: "Error",
    }
    test("Renders correctly", () => {
        render(<MemoryRouter>
        <CreateBlogs
        props={props} />
        </MemoryRouter>);
        const heading = screen.getByRole('heading', {
            level: 2
        });
        expect(heading).toHaveTextContent(props.heading);

        const title = screen.getByRole('textbox', {
            name: props.labelTitle
        });
        expect(title).toBeInTheDocument();

        const topic = screen.getByRole('textbox', {
            name: props.labelTopic
        });
        expect(topic).toBeInTheDocument();

        const media = screen.getByRole('textbox', {
            name: props.mediaLabel
        });
        expect(media).toBeInTheDocument();

        const select = screen.getByLabelText(props.labelSelect);
        expect(select).toBeInTheDocument();
        fireEvent.change(select, {target: {value: options[1]}})
        expect(onChange).toHaveBeenCalledTimes(1);
        // expect(onChange).toHaveBeenCalledWith(options[1]);

        // const paragraph = screen.getByRole('paragraph', {
        //     name: props.error
        // });
        // expect(paragraph).toBeInTheDocument();

         const button = screen.getByRole('button', {
            name: props.buttonName
        });
        expect(button).toBeInTheDocument();
    })
})