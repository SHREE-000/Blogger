import { Modal } from '../../../components/shared/components/molecularComponents/Modal';
import { screen, render, fireEvent } from '@testing-library/react';

describe("Modal", () => {
    test("Renders correctly", () => {
        const deleteHandler = jest.fn();
        const cancelHandler = jest.fn();
        render(<Modal
            confirmHandler={deleteHandler}
            cancelHandler={cancelHandler}
            />)
        const paragraph = screen.getByText(/Are you sure you want to delete this item?/i);
        expect(paragraph).toBeInTheDocument();
        const deleteButton = screen.getByRole('button', {
            name: 'Delete'
        });
        expect(deleteButton).toBeInTheDocument();
        const cancelButton = screen.getByRole('button', {
            name: 'Cancel'
        });
        expect(cancelButton).toBeInTheDocument();
        fireEvent.click(deleteButton);
        fireEvent.click(cancelButton);
        expect(deleteHandler).toHaveBeenCalledWith("delete");
        expect(cancelHandler).toHaveBeenCalledWith("cancel");
    })
})