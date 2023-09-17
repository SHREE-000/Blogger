import { SearchBlog } from '../../../components/shared/components/molecularComponents/SearchBlog';
import { screen, render, fireEvent } from '@testing-library/react';

describe("Search blog", () => {
    const searchInput = "search";
const handleSearch = jest.fn();
const handleClickSearch = jest.fn();
    test("renders correctly", () => {

render(<SearchBlog
    searchInput= {searchInput}
    handleSearch= {handleSearch}
    handleClickSearch= {handleClickSearch}
/>)

const placeholder = screen.getByPlaceholderText(/search/i);
expect(placeholder).toBeInTheDocument();

const input = screen.getByRole('textbox');
expect(input).toBeInTheDocument('');
expect(input).toHaveValue(searchInput);

const button = screen.getByRole('button');
fireEvent.click(button);
expect(handleClickSearch).toHaveBeenCalled();
    })
})