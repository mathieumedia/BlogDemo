import React, {useState, useEffect} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useBlog } from '../middleware/contextHooks'
import { toast } from 'react-toastify';
import { truncateString } from '../middleware/utils';
import {
    Grid,
    Button, Container, Tooltip,
    Box, List, ListItem, ListItemText,
} from '@mui/material'

import Masonry from '@mui/lab/Masonry'
import MainContainer from '../components/MainContainer'
import BlogCard from '../components/BlogCard'


export default function BlogList() {
    const {getBlogs, toasts, clearErrors, blogs, clearCurrentBlog} = useBlog();
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

    const onCreateNewBlog = () => {
        clearCurrentBlog();
        navigate('/newblog')
    }
    return (
        <MainContainer>
            <Container maxWidth="lg" sx={{py: 1, my: 1}}>
                <Grid container spacing={2}>
                    <Grid item xs={false} md={3}>
                        <List sx={{borderRadius: 5, mt: 3}}>
                            {myBlogs?.map(blog => (
                                <Link
                                    style={{textDecoration: 'none'}}
                                    to={`/blogs/${blog._id}`} key={blog._id}>
                                    <ListItem>
                                        <Tooltip title={blog.title} placement='right'>
                                            <ListItemText 
                                                primary={truncateString(blog.title, 30)} 
                                            />
                                        </Tooltip>
                                    </ListItem>
                                </Link>
                            ))}
                        </List>
                    </Grid>

                    {/* <Grid item xs={12} md={9}>
                        
                    </Grid> */}

                    <Grid item xs={12} md={9}>
                        <Box sx={{display: 'flex', justifyContent: 'flex-end', mb: 2}}>
                            <Button onClick={onCreateNewBlog}>Create Blog</Button>
                        </Box>
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
