import React, {useState, useEffect} from 'react'

import {
    Grid,
    Button, Container, Stack, Tooltip,
    Box, List, ListItem, ListItemText,
    
} from '@mui/material'

import Masonry from '@mui/lab/Masonry'

import { useNavigate, Link } from 'react-router-dom'
import BlogCard from '../components/BlogCard'

import { useBlog } from '../middleware/contextHooks'
import MainContainer from '../components/MainContainer'
import { toast } from 'react-toastify';


export default function BlogList() {
    const {getBlogs, toasts, clearErrors, blogs} = useBlog();
    const navigate = useNavigate();
    const [myBlogs, setMyBlogs] = useState([]);

    useEffect(() => {
        if(!blogs){
            getBlogs()
        }

        if(blogs){
            setMyBlogs(blogs)
        }

        if(toasts){
            toasts.forEach(ele => {
                toast(ele.message, {type: ele.type})
            });
            clearErrors()
        }

    },[toasts, clearErrors, blogs, getBlogs])
    return (
        <MainContainer>
            <Container maxWidth="lg" sx={{py: 1, my: 1}}>
                <Grid container spacing={2}>
                    <Grid item xs={false} md={3}>
                        <Stack spacing={2} sx={{display: 'flex'}} direction='row'>
                            <Box sx={{flexGrow: 1}} />
                            <Button fullWidth={false} onClick={() => navigate('/newblog')}>Create Blog</Button>
                        </Stack>

                        <List sx={{backgroundColor: 'silver', borderRadius: 5, mt: 3}}>
                            {myBlogs?.map(blog => (
                                <Link to={`/blogs/${blog._id}`} key={blog._id}>
                                    <ListItem>
                                        <Tooltip title={blog.title} placement='right'>
                                            <ListItemText primary={blog.title} />
                                        </Tooltip>
                                    </ListItem>
                                </Link>
                            ))}
                        </List>
                    </Grid>

                    <Grid item xs={12} md={9}>
                        <Masonry columns={2}>
                            {myBlogs?.map(blog => (
                                <BlogCard blog={blog} key={blog._id} />
                            ))}
                        </Masonry>
                    </Grid>
                </Grid>
            </Container>
        </MainContainer>
    )
}
