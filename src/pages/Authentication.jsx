import React from 'react'
import { Container } from 'react-bootstrap'

function Authentication({ children }) {
    return (
        <Container className='authContainer'>
            {children}
        </Container>
    )
}

export default Authentication