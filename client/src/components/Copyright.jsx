import React from 'react'
import { Link, Typography } from '@mui/material'

export default function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="/">Mathieu Media</Link>{' '}
            {new Date().getFullYear()}{'.'}
        </Typography>
    )
}
