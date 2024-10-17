import { Navbar } from '../../../components/shared/components/molecularComponents/Navbar';
import { screen, render, fireEvent } from '@testing-library/react';
import axios from 'axios';

describe("Navbar", () => {
    test("renders correctly", () => {
        render(<Navbar/>)
    })
})