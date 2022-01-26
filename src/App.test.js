import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

describe('Todo-list', () => {
  function enterItemText(text) {
    fireEvent.change(todoInput(), {target: {value: text}});
  }

  function clickToAddItem() {
    fireEvent.click(addButton());
  }

  function todoInput() {
    return screen.getByTestId('todo-input');
  }

  function addItem(text) {
    enterItemText(text);
    clickToAddItem();
  }

  function itemCheckbox(item) {
    return screen.getByTestId(`item-${item}-check`);
  }

  function clickItem(item) {
    fireEvent.click(itemCheckbox(item));
  }

  function addButton() {
    return screen.getByRole('button', {name: 'add-todo'});
  }


  beforeEach(() => {
    render(<App />);
  });

  it('shows it is a todo-list app', () => {
    expect(screen.getByText('Todo-list')).toBeInTheDocument();
  });
  
  it('has an input field for entering todo item', () => {
    const input = todoInput();
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('placeholder', 'Enter description');
  });

  it('has a button for adding the todo item', () => {
    const button = addButton();
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Add');
  });

  it('has no todo items initially', () => {
    const items = screen.getByTestId('todoitems');
    expect(items).toBeEmptyDOMElement();
  });

  it('adds an item to list when text is entered and button clicked', () => {
    addItem('my todo item');
    expect(screen.getByText('my todo item')).toBeInTheDocument();
  });

  
  it('should display checkboxes near the added item', () => {
    addItem('my todo item');
    addItem('todo item 2')
    expect(itemCheckbox(1)).toBeInTheDocument();
    expect(itemCheckbox(2)).toBeInTheDocument();
  });

  it('should display no items if no items are present', () => {
    expect(screen.getByText('Nothing to do')).toBeInTheDocument();
  });

  it('should display the number of items not done', () => {
    addItem('my todo item');
    addItem('todo item 2');
    expect(screen.getByText('0/2 done')).toBeInTheDocument();
  });

  it('should change the number of done items when item is checked', () => {
    addItem('my todo item');
    addItem('todo item 2');
    clickItem(2);
    expect(screen.getByText('1/2 done')).toBeInTheDocument();
  });

  it('should reduce the number of done items when item is unchecked', () => {
    addItem('my todo item');
    addItem('todo item 2');
    clickItem(2);
    clickItem(2);
    expect(screen.getByText('0/2 done')).toBeInTheDocument();
  });

  it('should display all done if all items are checked', () => {
    addItem('todo item 1');
    addItem('todo item 2');
    clickItem(1);
    clickItem(2);
    expect(screen.getByText('All done!')).toBeInTheDocument();
  });

  it('should show button as disabled if no item text has been entered', () => {
    expect(addButton()).toBeDisabled();
  })

  it('should show button enabled when at least one character is entered', () => {
    enterItemText('f');
    expect(addButton()).not.toBeDisabled();
  })

  it('should clear the input text after adding', () => {
    addItem('my todo item');
    expect(todoInput()).toHaveValue('');
  });
});
