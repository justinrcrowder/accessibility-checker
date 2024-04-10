import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form, Button, Card } from 'react-bootstrap';

import axios from 'axios';

function App() {
  const [url, setUrl] = useState('');
  const [latestSubmission, setLatestSubmission] = useState(null);
  
  const getReport = async (url) => {
    try {
      let response = await axios.get('http://127.0.0.1:5000/report?url=' + url);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (url) {
      try {
        let report = await getReport(url);
        let description = report['summary'];
        setLatestSubmission({ url, description });
        setUrl('');
      } catch (error) {
        console.error(error);
      }
    }
  };


  return (
    <Container className="mt-5 align-content-center" style={{ maxWidth: "600px", border: "1px solid #ccc", margin: "20px", padding: "20px", borderRadius: "5px"
    }}>
      <h1>Accessibility Checker</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="urlInput">
          <Form.Label>URL</Form.Label>
          <Form.Control
            type="url"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
        </Form.Group>
        <Button style={{margin: ".5em"}} variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      {latestSubmission && (
        <Card className="mt-3">
          <Card.Body>
            <Card.Title>Most Recent URL</Card.Title>
            <Card.Link href={latestSubmission.url} target="_blank" rel="noopener noreferrer">{latestSubmission.url}</Card.Link>
            <Card.Text>{latestSubmission.description}</Card.Text>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
}

export default App;
