import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import { Form, Button, Table } from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
//
function App() {
  const [data, setData] = useState({});
  const [testData, setTestData] = useState(
    { sepal_length: '5.4', sepal_width: '3.9', petal_length: '1.7', petal_width: '0.4', epochs: '200', learningRate: '0.3' });
  const [showLoading, setShowLoading] = useState(false);
  const apiUrl = "http://localhost:3000/run";
  //
  const onChange = (e) => {
    e.persist();
    setTestData({ ...testData, [e.target.name]: e.target.value });
  }
  //
  const testNeuralNetwork = (e) => {
    setShowLoading(true);
    e.preventDefault();
    // converting all input values to floats before passing
    const data = {
      sepal_length: parseFloat(testData.sepal_length),
      sepal_width: parseFloat(testData.sepal_width),
      petal_length: parseFloat(testData.petal_length),
      petal_width: parseFloat(testData.petal_width),
      epochs: parseFloat(testData.epochs),
      learningRate: parseFloat(testData.learningRate)
    }
    console.log(data);
    axios.put(apiUrl, data)
      .then((result) => {
        setShowLoading(false);
        console.log(result);
        setData(result.data);
      }).catch((error) => {
        setShowLoading(false);
        console.log(error);
      });
  }

  return (
    <div>
      <div className='input-panel'>
        <Form>
          <Form.Group>
            <Form.Label>Sepal Length</Form.Label>
            <Form.Control type="string" name="sepal_length" id="sepal_length" placeholder="5.4" value={testData.sepal_length} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Sepal Width</Form.Label>
            <Form.Control type="string" name="sepal_width" id="sepal_width" placeholder="3.9" value={testData.sepal_width} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Petal Length</Form.Label>
            <Form.Control type="string" name="petal_length" id="petal_length" placeholder="1.7" value={testData.petal_length} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Petal Width</Form.Label>
            <Form.Control type="string" name="petal_width" id="petal_width" placeholder="0.4" value={testData.petal_width} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Training Epochs</Form.Label>
            <Form.Control type="string" name="epochs" id="epochs" placeholder="100" value={testData.epochs} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Learning Rate</Form.Label>
            <Form.Control type="number" name="learningRate" id="learningRate" placeholder="0.6" value={testData.learningRate} onChange={onChange} />
          </Form.Group>
        </Form>
        <Button variant="primary" onClick={testNeuralNetwork}>
          Run
        </Button>
      </div>
      {showLoading === false && data.result
        ? <div className='output'>

          <h1>Prediction Results</h1>
          <h2> the values for species will be:</h2>
          <li>setosa: 1,0,0</li>
          <li>virginica: 0,1,0</li>
          <li>versicolor: 0,0,1 </li>

          <Table striped bordered>
            <thead>
              <tr>
                <th>Test Results</th>
              </tr>
            </thead>

            <tbody>
              {data.result.map((value, index) => (
                <tr>
                  <td>
                    <p key={index}>{value}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>


        </div>
        :
        <div>
          {showLoading && <Spinner animation="border" role="status">
            <span className="sr-only">Waiting for results...</span>
          </Spinner>}
        </div>
      }
    </div>

  );
}
//
export default App;
