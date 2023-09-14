var axios = require('axios');
require('dotenv').config();

const username = process.env.ATLASSIAN_USERNAME;
const password = process.env.ATLASSIAN_API_KEY;
const domain = process.env.DOMAIN;

const auth = {
  username: username,
  password: password,
};

async function createIssue(
  issueType,
  summary,
  description,
  projectKey,
  assignee
) {
  try {

    const baseUrl = 'https://' + domain + '.atlassian.net';

    const data = {
      fields: {
        project: { key: projectKey },
        summary: summary,
        description: description,
        issuetype: { name: issueType },
      },
    };
    // 712020:2a70aa3a-58fe-4146-ac86-d29b23daf8e9
    const body = {
      accountId: assignee
    };
    const config = {
      headers: { 'Content-Type': 'application/json' },
      auth: auth,
    };
    const response = await axios.post(
      `${baseUrl}/rest/api/2/issue`,
      data,
      config
    );
    const assigneeRep = await axios.put(
      `${baseUrl}/rest/api/2/issue/${response.data.key}/assignee`,
      body,
      config
    );
    console.log(response, 'sjsjsj')
    return response.data;
  } catch (error) {
    console.log('error', error);
    console.log(error.response.data.errors);
  }
}

module.exports = createIssue;
