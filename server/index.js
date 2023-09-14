const express = require('express');
const fetch = require('node-fetch');
const app = express();
const crypto = require('crypto');
const getUsers = require('./getUser');
const createProject = require('./createProject');
const createIssue = require('./createIssue');
const axios = require('axios');
const { json } = require('express');
const username = process.env.ATLASSIAN_USERNAME;
const password = process.env.ATLASSIAN_API_KEY;
const domain = process.env.DOMAIN;
const cors = require('cors');

const bodyparser = require('body-parser');
const getProjects = require('./getProject');
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(express.urlencoded({ extended: true }));

const auth = {
  username: username,
  password: password,
};
app.use(cors());

app.get('/user', async (req, res) => {
  const users = await getUsers();
  res.send(users);
});

app.get('/projects', async (req, res) => {
  const projects = await getProjects();
  res.send(projects);
});

app.post('/project', async (req, res) => {
  const projectName = process.env.PROJECT_NAME;
  const projectKey = await createProject(projectName);
  res.send('created project');
});

app.post('/ticket', async (req, res) => {
  console.log(req.body);
  // const issueType = 'Task';
  // const summary = 'EDIT issue';
  // const description = 'Loading time'
  const issueType = req.body.issueType;
  const summary = req.body.summry;
  const description = req?.body?.description;
  const projectKey = req.body.project;
  const assignee = req.body.accountId;
  const issueKey = await createIssue(
    issueType,
    summary,
    description,
    projectKey,
    assignee
  );
  res.send('Ticket created');
});

app.get('/:key', async (req, res) => {
  const baseUrl = 'https://' + domain + '.atlassian.net';
  const config = {
      method: 'get',
      url: baseUrl + '/rest/api/2/issue/createmeta',
      headers: { 'Content-Type': 'application/json' },
      auth: auth
  };
  const response = await axios.request(config);
  console.log(typeof response, response.data)
  let final;
  response.data.projects.map((item) => {
      if (item.key === req.params.key) {
          return final = item
      }
      return item
  })
  console.log("asjdhb", final)
  res.send(final)
})

app.get('/comments', async (req, res) => {
  const baseUrl = 'https://' + domain + '.atlassian.net';
  const config = {
    method: 'get',
    url: baseUrl + '/rest/api/2/issue/TRA-1',
    headers: { 'Content-Type': 'application/json' },
    auth: auth,
  };
  const response = await axios.request(config);
  // console.log(typeof response, response.data)
  res.send(response.data);
});

app.listen(3003, () => {
  console.log('sever is running');
});
