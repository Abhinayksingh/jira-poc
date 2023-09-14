import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
  Flex,
  Form,
  Center,
  Box,
  Select,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useToast } from '@chakra-ui/react';
import axios from 'axios';

export const FormComponent = () => {
  const [project, setProject] = useState('');
  const [summry, setSummary] = useState('');
  const [issueType, setIssueType] = useState('');
  const [assignee, setAssignee] = useState('');
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [accountId, setAccoundId] = useState('');
  const [userData, setUserData] = useState('');
  const [id, setId] = useState([]);
  const [selectedName, setSelectedName] = useState('');
  const [selectIssueType, setSelectissueType] = useState('');
  const [issueTypeName, setIssueTypeName] = useState([]);
  const [issue, setIssue] = useState('');
  const toast = useToast();

  const handleSelectChange = event => {
    setSelectedName(event.target.value);
    setAccoundId(event.target.value);
  };

  const handleSelectIssueType = event => {
    setSelectissueType(event.target.value);
    setIssue(event.target.value);
  };

  function addToast() {
    return toast({ description: 'Ticket Created' });
  }

  const fetchData = async () => {
    try {
      const config = {
        method: 'get',
        url: 'http://localhost:3003/user',
        headers: { 'Content-Type': 'application/json' },
      };

      const configIssueType = {
        method: 'get',
        url: 'http://localhost:3003/TRA',
        headers: { 'Content-Type': 'application/json' },
      };
      const response = await axios.request(config);

      const responseIssueType = await axios.request(configIssueType);
      

      if (response.data) {
        setId(response.data);
      }
      if (responseIssueType.data.issuetypes.length) {
        setIssueTypeName(responseIssueType.data.issuetypes);
      }

      // setId(
      //   response.data.filter(item => {
      //     return item.dsplayName === name;
      //   })
      // );
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const createPost = async () => {
    let postData ;
    if(project && summry && issue && description && accountId){
      const config = {
        headers: { 'Content-Type': 'application/json' },
      };
      postData = await axios.post(
        'http://localhost:3003/ticket',
        {
          project: project,
          summry: summry,
          issueType: selectIssueType,
          description: description,
          accountId: selectedName,
        },
        config
      );
      

    }
    if (postData?.status) {
      addToast();
    }
    
  };

 
  const submitHandler = e => {
    e.preventDefault();
    setSummary('');
    setIssueType('');
    setAssignee('');
    createPost();
  };

  //   const isError = input === ''
  return (
    <Box display="flex" justifyContent={'center'}>
      <Box mt={'20px'}>
        <Box mb={'10px'}>Create Ticket</Box>
        <Select
          placeholder="Select an Assignee"
          onChange={handleSelectChange}
          value={selectedName}
        >
          {id.map(option => (
            <option key={option.accountId} value={option.accountId}>
              {option.displayName}
            </option>
          ))}
        </Select>
        <form onSubmit={submitHandler}>
          <FormControl>
            <FormLabel>Project</FormLabel>
            <Input
              type="text"
              value={project}
              onChange={event => setProject(event.currentTarget.value)}
            />
            <FormHelperText></FormHelperText>
            <FormLabel>Summary</FormLabel>
            <Input
              type="text"
              value={summry}
              onChange={event => setSummary(event.currentTarget.value)}
            />
            <FormHelperText></FormHelperText>

            <FormLabel>Issue Type</FormLabel>
            <Select
              placeholder="Select an Issue"
              onChange={handleSelectIssueType}
              value={selectIssueType}
            >
              {issueTypeName.map(option => (
                <option key={option.id} value={option.name}>
                  {option.name}
                </option>
              ))}
            </Select>
            {/* <Input
            type="text"
            value={issueType}
            onChange={event => setIssueType(event.currentTarget.value)}
          /> */}
            <FormLabel>Description</FormLabel>
            <Input
              type="text"
              value={description}
              onChange={event => setDescription(event.currentTarget.value)}
            />
            <Button type="submit" mt={'30px'}>
              Submit
            </Button>
          </FormControl>
        </form>
      </Box>
    </Box>
  );
};