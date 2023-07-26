import { useState } from 'react';
import userService from '../../utils/userService';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import {
	Button,
	Form,
	Grid,
	Header,
	Image,
	Message,
	Segment,
  } from "semantic-ui-react";

// this hook can be used to programtically change url we are on 
// on the client (react, browser code)
import { useNavigate } from 'react-router-dom';

export default function SignUpPage({handleSignUpOrLogin}){

		const [state, setState] = useState({
			username: '',
			email: '',
			password: '',
			passwordConf: '',
			bio: ''
		})
		
		// this state will handle the file upload
		const [selectedFile, setSelectedFile] = useState('')

		const [error, setError] = useState('');
		
		// navigate is a function that just takes a path
		// the path should match a route defined in the App.js
		const navigate = useNavigate()

		function handleChange(e){

			setState({
				...state,
				[e.target.name]: e.target.value
			})
		}	

		function handleFileInput(e){
			setSelectedFile(e.target.files[0])
		}

		async function handleSubmit(e){
			e.preventDefault();

			// ANYTIME YOU'RE SENDING A FILE TO THE SERVER
			// You must create formdata!
			// This needs to be done because the http request
			// will be sent in two parts, the text, and the file
			const formData = new FormData();
			// key on req.file would be photo, 
			formData.append('photo', selectedFile);
			// req.body formdata
			formData.append('username', state.username)
			formData.append('email', state.email)
			formData.append('password', state.password)	
			formData.append('bio', state.bio)

			// this for loop does the same thing as the code above ^^^
			// for (let key in state){
			// 	formData.append(key, state[fieldName])
			// }



			try {
				// this line of code is making the fetch request to the server
				// and sending our state object
				// this is calling the signup fetch function defined in our utils/userService
				const signUp = await userService.signup(formData)
				console.log(signUp)
				// navigate the user to the home page!
				navigate('/');
				handleSignUpOrLogin(); // this function comes from the APP component

			} catch(err){
				console.log(err, ' err in handleSubmit');
				setError('Check your terminal for your error and the chrome console!')
			}

		}
	
		return (
			<Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
			 <Grid.Column style={{ maxWidth: 450 }}>
				<Header as="h2" color="pink" textAlign="center">
				 <svg xmlns="http://www.w3.org/2000/svg" width="55px" viewBox="0 0 1024 1024" class="icon" version="1.1"><path d="M1001.984 407.04c11.776 68.096 0.512 134.656-47.104 186.88-37.376 40.96-90.112 61.44-144.384 61.44 39.424 33.792 69.632 72.192 70.656 129.536 1.536 65.536-21.504 133.632-74.24 174.592-24.064 18.944-51.712 29.184-81.92 32.768-33.792 3.584-75.776 5.632-107.52-8.704-51.2-23.04-89.6-78.848-114.176-130.56-30.208 55.808-75.776 102.912-134.144 128-59.392 25.6-142.848 34.816-192.512-14.848-47.616-47.104-57.856-121.344-52.736-185.344 5.12-63.488 38.4-103.936 83.968-139.776-122.368-7.168-204.8-133.632-186.88-253.952 9.728-66.56 52.736-109.568 119.808-117.76 57.344-7.168 123.392-3.072 180.224 15.36-13.312-22.016-23.552-45.056-24.064-72.192-0.512-32.256 10.24-64 26.112-91.136 35.84-60.416 91.648-95.232 162.304-98.816 64.512-3.072 147.456-0.512 190.976 55.296 18.432 24.064 24.064 54.272 26.112 83.968 3.072 41.984 2.048 84.48-0.512 126.976 57.344-26.112 121.856-38.912 183.808-24.064 29.184 7.168 59.904 20.48 80.896 42.496 23.552 26.624 29.184 65.536 35.328 99.84z m-62.976 165.888c41.984-48.128 48.128-108.544 36.352-168.96-5.632-29.184-10.24-61.952-32.768-82.944-20.992-19.968-52.224-29.696-80.384-34.304-57.856-9.216-117.248 7.68-168.448 34.304-12.288 6.656-23.552-8.192-17.92-17.408-0.512-1.536-1.024-3.584-1.024-5.632 1.536-33.28 2.56-66.56 2.048-99.84-0.512-30.208 0.512-64-13.824-91.648-29.696-56.832-105.472-58.88-161.792-58.88-65.024 0.512-117.248 24.064-153.088 79.872-16.384 25.088-28.16 55.296-27.136 85.504 1.536 32.768 19.456 58.88 38.4 84.48 1.536 2.048 2.048 4.608 2.56 6.656 5.632 9.216-5.632 23.552-17.92 17.408-54.272-26.112-120.832-30.72-180.224-28.672-29.696 1.024-61.44 6.656-84.48 26.624-21.504 19.456-30.72 48.128-34.304 76.288-14.336 117.76 74.752 234.496 198.656 218.624 11.776-1.536 14.848 10.752 9.728 18.944-0.512 3.072-2.048 6.656-5.632 8.704-24.064 17.408-48.64 34.816-68.096 57.856-23.04 27.648-30.72 59.392-32.256 94.72-2.048 53.248 6.144 114.688 46.08 153.6 47.104 46.592 132.608 28.672 184.32-0.512 50.688-28.16 87.552-74.24 111.616-126.464 2.048-5.12 6.144-6.656 10.24-6.656 6.144-1.536 13.824 0.512 16.896 8.192 10.752 27.648 25.088 53.248 43.52 76.8 17.92 23.552 42.496 52.224 70.656 62.464 24.576 8.704 57.856 7.168 83.456 5.12 29.184-2.048 56.32-11.776 78.848-30.72 43.52-35.84 61.44-92.672 60.928-147.968-0.512-62.464-39.936-98.816-86.528-134.656-9.216-7.168-5.12-20.48 2.56-24.064 2.56-2.048 6.144-3.584 10.752-2.56 59.392 10.24 119.296-10.24 158.208-54.272z" fill="#AE3A40"/><path d="M975.36 403.968c11.776 60.416 5.632 120.832-36.352 168.96-38.912 44.544-98.816 64.512-156.672 55.296-4.096-0.512-7.68 0.512-10.752 2.56-8.192 3.072-11.776 16.896-2.56 24.064 46.592 35.328 86.016 71.68 86.528 134.656 0.512 54.784-17.92 111.616-60.928 147.968-22.528 18.944-49.664 28.16-78.848 30.72-25.6 2.048-58.88 3.584-83.456-5.12-28.16-10.24-52.736-39.424-70.656-62.464-17.92-23.552-32.256-49.152-43.52-76.8-3.072-7.68-10.752-9.728-16.896-8.192-4.096 0-8.192 1.536-10.24 6.656-24.576 52.224-60.928 98.304-111.616 126.464-51.712 29.184-137.216 47.104-184.32 0.512-39.936-39.424-48.128-100.352-46.08-153.6 1.536-35.328 8.704-67.072 32.256-94.72 19.456-23.04 44.032-40.448 68.096-57.856 3.072-2.56 5.12-5.632 5.632-8.704 4.608-8.192 1.536-20.48-9.728-18.944-125.44 14.848-214.528-101.888-200.192-219.136 3.584-27.648 12.8-56.832 34.304-76.288 23.04-20.48 54.784-25.6 84.48-26.624 59.904-2.048 125.952 2.048 180.224 28.672 12.288 6.144 23.552-8.704 17.92-17.408 0-2.048-0.512-4.096-2.56-6.656-18.944-25.6-36.864-51.712-38.4-84.48-1.024-30.208 10.752-60.416 27.136-85.504 36.352-55.808 88.064-79.36 153.088-79.872 55.808-0.512 132.096 1.536 161.792 58.88 14.336 27.648 13.312 61.44 13.824 91.648 0.512 33.28 0 66.56-2.048 99.84 0 2.048 0 4.096 1.024 5.632-5.632 9.216 5.632 24.064 17.92 17.408 51.2-27.136 110.592-43.52 168.448-34.304 28.16 4.608 59.392 14.336 80.384 34.304 22.528 20.48 27.136 53.248 32.768 82.432zM794.112 459.776c16.384-0.512 16.384-26.112 0-25.6C738.816 435.2 697.856 471.552 650.24 495.104c-16.896-50.688-62.976-86.016-116.736-91.648l1.536-146.944c0-16.384-25.6-16.384-25.6 0l-1.536 139.776c-33.28 3.584-61.952 21.504-86.016 45.056-17.408 16.896-26.112 35.84-29.696 56.832-52.736-14.336-102.912-35.84-152.576-58.368-14.848-6.656-28.16 15.36-12.8 22.016 53.248 24.064 107.008 47.104 163.328 61.952 0 5.632 0 11.264 0.512 16.896 2.048 38.912 17.92 72.704 42.496 96.768-35.328 40.448-67.584 82.944-96.256 128.512-8.704 13.824 13.312 27.136 22.016 12.8 27.648-44.032 58.88-86.016 93.696-124.928l0.512-0.512c23.04 14.848 51.712 23.04 83.456 21.504 18.432-0.512 33.28-3.584 46.08-10.24 34.816 32.256 65.024 68.096 90.624 108.032 9.216 13.824 31.232 1.024 22.016-12.8-26.112-39.936-56.832-76.8-91.648-110.08 6.144-5.632 11.776-12.288 17.92-19.968 24.064-31.744 38.4-67.072 34.304-107.52 0-1.024-0.512-1.536-0.512-2.56 46.592-19.968 86.528-58.88 138.752-59.904z" fill="#F5C0D2"/><path d="M794.112 434.176c16.384-0.512 16.384 25.088 0 25.6-52.224 1.024-92.16 39.424-137.728 60.928 0 1.024 0.512 1.536 0.512 2.56 4.608 40.448-10.24 75.264-34.304 107.52-5.632 7.68-11.776 14.336-17.92 19.968 34.816 32.768 65.024 69.632 91.648 110.08 9.216 13.824-13.312 26.624-22.016 12.8-26.112-39.936-56.32-75.776-90.624-108.032-12.8 6.144-27.648 9.216-46.08 10.24-31.744 1.024-59.904-6.656-83.456-21.504l-0.512 0.512c-34.816 38.912-66.048 80.896-93.696 124.928-8.704 13.824-30.72 1.024-22.016-12.8 28.672-45.568 60.416-88.064 96.256-128.512-25.088-24.064-40.448-57.344-42.496-96.768-0.512-5.632-0.512-11.264-0.512-16.896-56.832-15.36-110.592-38.4-163.84-62.464-14.848-6.656-2.048-28.672 12.8-22.016 50.176 22.528 99.84 44.032 152.576 58.368 3.584-20.992 12.288-39.936 29.696-56.832 24.064-23.552 52.224-40.96 86.016-45.056l1.536-139.776c0-16.384 25.6-16.384 25.6 0l-1.536 146.944c53.76 5.12 99.328 40.96 116.736 91.648 47.104-24.064 88.064-60.416 143.36-61.44zM613.376 599.04c15.872-25.088 22.016-54.784 15.872-83.968C617.984 459.776 566.784 425.984 512 429.056c-5.12 0.512-8.704-2.048-10.752-5.632-24.576 5.12-46.08 20.992-63.488 38.912-22.528 23.04-23.552 52.736-21.504 83.456 5.12 64.512 56.32 106.496 120.32 103.936 15.872-0.512 35.328-2.56 48.128-13.312 11.776-9.728 20.992-25.088 28.672-37.376z" fill="#AE3A40"/><path d="M629.76 514.56c6.144 29.184 0 58.88-15.872 83.968-7.68 12.288-17.408 27.648-28.672 37.376-12.8 10.752-32.256 12.8-48.128 13.312-64 2.56-115.2-39.424-120.32-103.936-2.56-30.72-1.536-60.416 21.504-83.456 17.408-17.92 38.912-33.792 63.488-38.912 2.048 3.584 5.632 5.632 10.752 5.632 54.272-2.56 105.472 31.232 117.248 86.016z" fill="#F5C0D2"/></svg> Sign Up
			   </Header>
			   <Form autoComplete="off" onSubmit={handleSubmit}>
				 <Segment stacked>
				   <Form.Input
					 name="username"
					 placeholder="username"
					 value={state.username}
					 onChange={handleChange}
					 required
				   />
				   <Form.Input
					 type="email"
					 name="email"
					 placeholder="email"
					 value={state.email}
					 onChange={handleChange}
					 required
				   />
				   <Form.Input
					 name="password"
					 type="password"
					 placeholder="password"
					 value={state.password}
					 onChange={handleChange}
					 required
				   />
				   <Form.Input
					 name="passwordConf"
					 type="password"
					 placeholder="Confirm Password"
					 value={state.passwordConf}
					 onChange={handleChange}
					 required
				   />
				   <Form.TextArea
					 label="bio"
					 name="bio"
					 placeholder="Tell us more about your dogs..."
					 value={state.bio}
					 onChange={handleChange}
				   />
				   <Form.Field>
					 <Form.Input
					   type="file"
					   name="photo"
					   placeholder="upload image"
					   onChange={handleFileInput}
					 />
				   </Form.Field>
				   <Button type="submit" className="btn">
					 Signup
				   </Button>
				 </Segment>
				 {error ? <ErrorMessage error={error} /> : null}
			   </Form>
			 </Grid.Column>
		   </Grid>
	   
			 );
	   
		}
