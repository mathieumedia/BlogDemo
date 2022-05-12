import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useBlog} from '../middleware/contextHooks';
import { Transition } from 'react-transition-group';
import {LoremIpsum} from 'lorem-ipsum';
import {toast} from 'react-toastify';
import gsap from 'gsap';
import {
    Grid, Slider, TextField, Container,
    Button, Paper, Stack, Typography, 
    FormControlLabel, Checkbox
} from '@mui/material';

// #region -----------( COMPONENTS )-------------
import MainContainer from '../components/MainContainer';
// #endregion -----------( COMPONENTS )-------------


export default function NewBlog() {
    const navigate = useNavigate()

    const [newBlog, setNewBlog] = useState({title: '', content: ''});
    const {
        toasts, clearErrors, createBlog, 
        blogs, getBlogs, 
        blogCreated, currentBlog
    } = useBlog();
    const [onGenerate, setOnGenerate] = useState(false);

    useEffect(() => {
        if(!blogs) {
            getBlogs();
        }

        if(toasts){
            toasts.forEach(ele => {
                toast(ele.message, {type: ele.type})
            })
            clearErrors()
        }
        
        if(blogCreated){
            const id = currentBlog._id
            navigate(`/blogs/${id}`)
        }
    }, [
        toasts, clearErrors, blogs, getBlogs, navigate, 
        blogCreated, currentBlog
    ]);


    const handleSave = () => {
        if(newBlog.title.length > 0 && newBlog.content.length > 0) {
            createBlog(newBlog);
        } else {
            toast('Please provide a blog title and content', {type: 'error'})
        }
    }

    const [loremOptions, setLoremOptions] = useState({
        minWordPerSentence: 3,
        maxWordPerSentence: 16,
        wordPerSentence: 4,

        minSentencePerParagraph: 4,
        maxSentencePerParagraph: 20,
        sentencePerParagraph: 5,

        minParagraphPerBlog: 2,
        maxParagraphPerBlog: 10,
        paragraphPerBlog: 3,
    })

    const handleGenerate = () => {
        const lorem = new LoremIpsum({
            sentencesPerParagraph:{
                max: loremOptions.maxSentencePerParagraph,
                min: loremOptions.minSentencePerParagraph
            },
            wordsPerSentence: {
                max: loremOptions.maxWordPerSentence,
                min: loremOptions.minWordPerSentence
            }
        })

        setNewBlog({
            title: lorem.generateSentences(1),
            content: lorem.generateParagraphs(loremOptions.paragraphPerBlog)
        })
    }
    return (
        <MainContainer>
            <Container maxWidth="md" sx={{py: 2, my: 1, backgroundColor: 'silver'}} component={Paper}>
                <Grid container spacing={2}>
                    <Grid item>
                        <FormControlLabel align='left' 
                            control={
                                <Checkbox 
                                    checked={onGenerate}
                                    onChange={() => setOnGenerate(!onGenerate)}
                                />
                            } label='Auto Generate' 
                        />
                    </Grid>
                    
                    <Transition 
                        timeout={1000} in={onGenerate} mountOnEnter unmountOnExit
                        onEntering={(node) => {
                            gsap.from(node, {
                                y: -50,
                                autoAlpha: onGenerate ? 0 : 1,
                                duration: 0.5
                            })
                        }}
                        addEndListener={(node, done) => {
                            gsap.to(node, {
                                y: onGenerate ? 0 : -50,
                                autoAlpha: onGenerate ? 1 : 0,
                                onComplete: done
                            })
                        }}
                    >
                        <Grid item xs={12} container spacing={2}>
                            <Grid item xs={12} lg={4}>
                                <Typography>Words Per Sentence</Typography>
                                <Slider  
                                    marks={[
                                        {value: loremOptions.minWordPerSentence, label: loremOptions.minWordPerSentence},
                                        {value: loremOptions.maxWordPerSentence, label: loremOptions.maxWordPerSentence},
                                    ]}
                                    min={loremOptions.minWordPerSentence} 
                                    max={loremOptions.maxWordPerSentence} 
                                    value={loremOptions.wordPerSentence}
                                    onChange={(e, value) => setLoremOptions({...loremOptions, wordPerSentence: value})}
                                />
                            </Grid>
                            <Grid item xs={12} lg={4}>
                                <Typography>Sentences Per Paragraphs</Typography>
                                <Slider  
                                    marks={[
                                        {value: loremOptions.minSentencePerParagraph, label: loremOptions.minWordPerSentence},
                                        {value: loremOptions.maxSentencePerParagraph, 
                                          label: loremOptions.maxSentencePerParagraph
                                        },
                                    ]}
                                    min={loremOptions.minSentencePerParagraph} 
                                    max={loremOptions.maxSentencePerParagraph} 
                                    value={loremOptions.sentencePerParagraph}
                                    onChange={(e, value) => setLoremOptions({...loremOptions, sentencePerParagraph: value})}
                                />
                            </Grid>
                            <Grid item xs={12} lg={4}>
                                <Typography>Paragraphs Per Blog</Typography>
                                <Slider  
                                    marks={[
                                        {value: loremOptions.minParagraphPerBlog, label: loremOptions.minParagraphPerBlog},
                                        {value: loremOptions.maxParagraphPerBlog, label: loremOptions.maxParagraphPerBlog},
                                    ]}
                                    min={loremOptions.minParagraphPerBlog} 
                                    max={loremOptions.maxParagraphPerBlog} 
                                    value={loremOptions.paragraphPerBlog}
                                    onChange={(e, value) => setLoremOptions({...loremOptions, paragraphPerBlog: value})}
                                />
                            </Grid>

                            <Grid item>
                                <Button fullWidth={false} onClick={handleGenerate}>Generate Blog</Button>
                            </Grid>
                        </Grid>
                    </Transition>







                    <Grid item xs={12}>
                        <TextField
                            label="Title" value={newBlog.title}
                            onChange={(e) => setNewBlog({...newBlog, title: e.target.value})}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            multiline minRows={8} maxRows={20}
                            label="Content" value={newBlog.content}
                            onChange={(e) => setNewBlog({...newBlog, content: e.target.value})}
                        />
                    </Grid>

                    <Grid item >
                        <Stack spacing={2} direction="row">
                            <Button onClick={handleSave}>Save</Button>
                            <Button variant='outlined' onClick={e => setNewBlog({title: '', content: ''})}>Clear</Button>
                            <Button onClick={() => navigate('/blogs')}>Cancel</Button>
                        </Stack>
                    </Grid>
                </Grid>
            </Container>
        </MainContainer>
    )
}
