import { Navbar } from '../../../components/shared/components/molecularComponents/Navbar';
import { screen, render, fireEvent } from '@testing-library/react';

describe("Navbar", () => {
    test("renders correctly", () => {
        render(<Navbar/>)
    })
})