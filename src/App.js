import { useState } from 'react';
import { Form, Button, Card, ListGroup, Row, Col, Container } from 'react-bootstrap';
import './App.css';

function TodoItem({onChange, item, index}) {
  return (        
    <ListGroup.Item>
      <Row>
        <Col xs={1}>
        <Form.Check onChange={onChange} 
                  data-testid={`item-${index+1}-check`}/>
        </Col>
        <Col>
          {item}
        </Col>
      </Row>
    </ListGroup.Item>
  );
}

function ItemAdder({itemAdded}) {
  const [ input, setInput ] = useState('');

  const inputChanged = (event) => {
    setInput(event.target.value);
  };

  const addButtonClicked = () => {
    itemAdded(input);
    setInput('');
  }

  return (
    <Row>
      <Col>
        <Form.Control type="text" 
                      onChange={inputChanged} 
                      value={input} 
                      placeholder="Enter description"
                      data-testid='todo-input'/>
      </Col>
      <Col xs={2}>
        <Button onClick={addButtonClicked} 
                disabled={input.length===0}
                aria-label="add-todo"
                className="float-end">
                  Add
        </Button>
      </Col>
    </Row>
  );
}

function App() {
  const [ todoItems, setTodoItems ] = useState([]);
  const [ itemsDone, setItemsDone ] = useState(0);

  const itemChecked = (event) => {
    setItemsDone(itemsDone+(event.target.checked ? 1 : -1));
  };

  const itemAdded = (input) => {
    setTodoItems([...todoItems, input]);
  };

  return (
    <Container>
      <Card border="secondary" className="shadow">
        <Card.Header as="h5">Todo-list</Card.Header>
        <Card.Body>
          <ListGroup className="mb-3" data-testid="todoitems">
            {todoItems.map((item, index) => 
              <TodoItem key={index}
                        onChange={itemChecked} 
                        item={item} 
                        index={index}/>
            )}
          </ListGroup>
          <ItemAdder itemAdded={itemAdded}/>
        </Card.Body>
        <Card.Footer className="text-center">
          {todoItems.length===0 ?
          (<>Nothing to do</>)
          :
          todoItems.length===itemsDone ? <>All done!</>
          :
          (<>{itemsDone}/{todoItems.length} done</>)
          }
        </Card.Footer>
      </Card>
    </Container>
  );
}

export default App;
