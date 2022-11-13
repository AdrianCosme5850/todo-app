import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App.js";

describe('Testing the app component', () => {
    test('Should be able to submit a task', () => {
        render(<App/>);
        let itemInput = screen.getByTestId('itemInput');
        let assigneeInput = screen.getByTestId('assigneeInput');
        let taskSubmitButton = screen.getByTestId('taskSubmitButton')
        fireEvent.change(itemInput, { target: {value: 'testItem'}});
        fireEvent.change(assigneeInput, { target: {value: 'testAssignee'}});
        fireEvent.click(taskSubmitButton);
        let displayedItem = screen.getByTestId('itemDescription')
        let displayedName = screen.getByTestId('itemAssignee')
        expect(displayedItem).toHaveTextContent(/testItem/);
        expect(displayedName).toHaveTextContent(/testAssignee/);
    })
})